import {
  users,
  families,
  familyMemberships,
  photos,
  albums,
  events,
  eventRsvps,
  chatMessages,
  posts,
  postReactions,
  comments,
  notifications,
  type User,
  type UpsertUser,
  type Family,
  type InsertFamily,
  type FamilyMembership,
  type InsertFamilyMembership,
  type Photo,
  type InsertPhoto,
  type Album,
  type InsertAlbum,
  type Event,
  type InsertEvent,
  type EventRsvp,
  type InsertEventRsvp,
  type ChatMessage,
  type InsertChatMessage,
  type Post,
  type InsertPost,
  type PostReaction,
  type InsertPostReaction,
  type Comment,
  type InsertComment,
  type Notification,
  type InsertNotification,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Family operations
  createFamily(family: InsertFamily): Promise<Family>;
  getFamiliesByUserId(userId: string): Promise<Family[]>;
  getFamily(id: number): Promise<Family | undefined>;
  
  // Family membership operations
  addFamilyMember(membership: InsertFamilyMembership): Promise<FamilyMembership>;
  getFamilyMembers(familyId: number): Promise<(FamilyMembership & { user: User })[]>;
  getUserFamilyMembership(userId: string, familyId: number): Promise<FamilyMembership | undefined>;
  
  // Photo operations
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getFamilyPhotos(familyId: number): Promise<(Photo & { uploadedBy: User })[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  
  // Album operations
  createAlbum(album: InsertAlbum): Promise<Album>;
  getFamilyAlbums(familyId: number): Promise<Album[]>;
  getAlbum(id: number): Promise<Album | undefined>;
  
  // Event operations
  createEvent(event: InsertEvent): Promise<Event>;
  getFamilyEvents(familyId: number): Promise<(Event & { createdBy: User })[]>;
  getEvent(id: number): Promise<Event | undefined>;
  upsertEventRsvp(rsvp: InsertEventRsvp): Promise<EventRsvp>;
  getEventRsvps(eventId: number): Promise<(EventRsvp & { user: User })[]>;
  
  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getFamilyMessages(familyId: number): Promise<(ChatMessage & { sender: User })[]>;
  
  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getFamilyPosts(familyId: number): Promise<(Post & { author: User; reactions: PostReaction[]; comments: (Comment & { author: User })[] })[]>;
  getPost(id: number): Promise<Post | undefined>;
  togglePostReaction(reaction: InsertPostReaction): Promise<PostReaction | null>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Family operations
  async createFamily(family: InsertFamily): Promise<Family> {
    const [newFamily] = await db.insert(families).values(family).returning();
    return newFamily;
  }

  async getFamiliesByUserId(userId: string): Promise<Family[]> {
    const userFamilies = await db
      .select({ family: families })
      .from(familyMemberships)
      .innerJoin(families, eq(familyMemberships.familyId, families.id))
      .where(eq(familyMemberships.userId, userId));
    
    return userFamilies.map(uf => uf.family);
  }

  async getFamily(id: number): Promise<Family | undefined> {
    const [family] = await db.select().from(families).where(eq(families.id, id));
    return family;
  }

  // Family membership operations
  async addFamilyMember(membership: InsertFamilyMembership): Promise<FamilyMembership> {
    const [newMembership] = await db.insert(familyMemberships).values(membership).returning();
    return newMembership;
  }

  async getFamilyMembers(familyId: number): Promise<(FamilyMembership & { user: User })[]> {
    const members = await db
      .select()
      .from(familyMemberships)
      .innerJoin(users, eq(familyMemberships.userId, users.id))
      .where(eq(familyMemberships.familyId, familyId));
    
    return members.map(m => ({ ...m.family_memberships, user: m.users }));
  }

  async getUserFamilyMembership(userId: string, familyId: number): Promise<FamilyMembership | undefined> {
    const [membership] = await db
      .select()
      .from(familyMemberships)
      .where(and(eq(familyMemberships.userId, userId), eq(familyMemberships.familyId, familyId)));
    return membership;
  }

  // Photo operations
  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const [newPhoto] = await db.insert(photos).values(photo).returning();
    return newPhoto;
  }

  async getFamilyPhotos(familyId: number): Promise<(Photo & { uploadedBy: User })[]> {
    const familyPhotos = await db
      .select()
      .from(photos)
      .innerJoin(users, eq(photos.uploadedById, users.id))
      .where(eq(photos.familyId, familyId))
      .orderBy(desc(photos.createdAt));
    
    return familyPhotos.map(fp => ({ ...fp.photos, uploadedBy: fp.users }));
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    const [photo] = await db.select().from(photos).where(eq(photos.id, id));
    return photo;
  }

  // Album operations
  async createAlbum(album: InsertAlbum): Promise<Album> {
    const [newAlbum] = await db.insert(albums).values(album).returning();
    return newAlbum;
  }

  async getFamilyAlbums(familyId: number): Promise<Album[]> {
    return await db.select().from(albums).where(eq(albums.familyId, familyId)).orderBy(desc(albums.createdAt));
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    const [album] = await db.select().from(albums).where(eq(albums.id, id));
    return album;
  }

  // Event operations
  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async getFamilyEvents(familyId: number): Promise<(Event & { createdBy: User })[]> {
    const familyEvents = await db
      .select()
      .from(events)
      .innerJoin(users, eq(events.createdById, users.id))
      .where(eq(events.familyId, familyId))
      .orderBy(events.startDate);
    
    return familyEvents.map(fe => ({ ...fe.events, createdBy: fe.users }));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async upsertEventRsvp(rsvp: InsertEventRsvp): Promise<EventRsvp> {
    const [existingRsvp] = await db
      .select()
      .from(eventRsvps)
      .where(and(eq(eventRsvps.eventId, rsvp.eventId), eq(eventRsvps.userId, rsvp.userId)));

    if (existingRsvp) {
      const [updatedRsvp] = await db
        .update(eventRsvps)
        .set({ status: rsvp.status, updatedAt: new Date() })
        .where(eq(eventRsvps.id, existingRsvp.id))
        .returning();
      return updatedRsvp;
    } else {
      const [newRsvp] = await db.insert(eventRsvps).values(rsvp).returning();
      return newRsvp;
    }
  }

  async getEventRsvps(eventId: number): Promise<(EventRsvp & { user: User })[]> {
    const rsvps = await db
      .select()
      .from(eventRsvps)
      .innerJoin(users, eq(eventRsvps.userId, users.id))
      .where(eq(eventRsvps.eventId, eventId));
    
    return rsvps.map(r => ({ ...r.event_rsvps, user: r.users }));
  }

  // Chat operations
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values(message).returning();
    return newMessage;
  }

  async getFamilyMessages(familyId: number): Promise<(ChatMessage & { sender: User })[]> {
    const messages = await db
      .select()
      .from(chatMessages)
      .innerJoin(users, eq(chatMessages.senderId, users.id))
      .where(eq(chatMessages.familyId, familyId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(50);
    
    return messages.map(m => ({ ...m.chat_messages, sender: m.users }));
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getFamilyPosts(familyId: number): Promise<(Post & { author: User; reactions: PostReaction[]; comments: (Comment & { author: User })[] })[]> {
    const familyPosts = await db
      .select()
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.familyId, familyId))
      .orderBy(desc(posts.createdAt));

    const postsWithDetails = await Promise.all(
      familyPosts.map(async (fp) => {
        const reactions = await db.select().from(postReactions).where(eq(postReactions.postId, fp.posts.id));
        
        const commentsWithAuthors = await db
          .select()
          .from(comments)
          .innerJoin(users, eq(comments.authorId, users.id))
          .where(eq(comments.postId, fp.posts.id))
          .orderBy(comments.createdAt);

        return {
          ...fp.posts,
          author: fp.users,
          reactions,
          comments: commentsWithAuthors.map(c => ({ ...c.comments, author: c.users })),
        };
      })
    );

    return postsWithDetails;
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async togglePostReaction(reaction: InsertPostReaction): Promise<PostReaction | null> {
    const [existingReaction] = await db
      .select()
      .from(postReactions)
      .where(and(eq(postReactions.postId, reaction.postId), eq(postReactions.userId, reaction.userId)));

    if (existingReaction) {
      await db.delete(postReactions).where(eq(postReactions.id, existingReaction.id));
      return null;
    } else {
      const [newReaction] = await db.insert(postReactions).values(reaction).returning();
      return newReaction;
    }
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(20);
  }

  async markNotificationAsRead(id: number): Promise<void> {
    await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
  }
}

export const storage = new DatabaseStorage();
