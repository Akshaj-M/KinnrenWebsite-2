import {
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

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private families: Map<number, Family> = new Map();
  private familyMemberships: Map<number, FamilyMembership> = new Map();
  private photos: Map<number, Photo> = new Map();
  private albums: Map<number, Album> = new Map();
  private events: Map<number, Event> = new Map();
  private eventRsvps: Map<number, EventRsvp> = new Map();
  private chatMessages: Map<number, ChatMessage> = new Map();
  private posts: Map<number, Post> = new Map();
  private postReactions: Map<number, PostReaction> = new Map();
  private comments: Map<number, Comment> = new Map();
  private notifications: Map<number, Notification> = new Map();
  
  private nextId = 1;

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: this.users.get(userData.id)?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(userData.id, user);
    return user;
  }

  // Family operations
  async createFamily(family: InsertFamily): Promise<Family> {
    const newFamily: Family = {
      id: this.nextId++,
      name: family.name,
      description: family.description || null,
      createdById: family.createdById,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.families.set(newFamily.id, newFamily);
    return newFamily;
  }

  async getFamiliesByUserId(userId: string): Promise<Family[]> {
    const memberships = Array.from(this.familyMemberships.values())
      .filter(m => m.userId === userId);
    
    return memberships
      .map(m => this.families.get(m.familyId))
      .filter(f => f !== undefined) as Family[];
  }

  async getFamily(id: number): Promise<Family | undefined> {
    return this.families.get(id);
  }

  // Family membership operations
  async addFamilyMember(membership: InsertFamilyMembership): Promise<FamilyMembership> {
    const newMembership: FamilyMembership = {
      id: this.nextId++,
      familyId: membership.familyId,
      userId: membership.userId,
      role: membership.role || "member",
      relationshipType: membership.relationshipType || null,
      joinedAt: new Date(),
    };
    this.familyMemberships.set(newMembership.id, newMembership);
    return newMembership;
  }

  async getFamilyMembers(familyId: number): Promise<(FamilyMembership & { user: User })[]> {
    const memberships = Array.from(this.familyMemberships.values())
      .filter(m => m.familyId === familyId);
    
    return memberships
      .map(m => {
        const user = this.users.get(m.userId);
        return user ? { ...m, user } : null;
      })
      .filter(m => m !== null) as (FamilyMembership & { user: User })[];
  }

  async getUserFamilyMembership(userId: string, familyId: number): Promise<FamilyMembership | undefined> {
    return Array.from(this.familyMemberships.values())
      .find(m => m.userId === userId && m.familyId === familyId);
  }

  // Photo operations
  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const newPhoto: Photo = {
      id: this.nextId++,
      familyId: photo.familyId,
      uploadedById: photo.uploadedById,
      title: photo.title || null,
      description: photo.description || null,
      imageUrl: photo.imageUrl,
      albumId: photo.albumId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.photos.set(newPhoto.id, newPhoto);
    return newPhoto;
  }

  async getFamilyPhotos(familyId: number): Promise<(Photo & { uploadedBy: User })[]> {
    const photos = Array.from(this.photos.values())
      .filter(p => p.familyId === familyId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    
    return photos
      .map(p => {
        const user = this.users.get(p.uploadedById);
        return user ? { ...p, uploadedBy: user } : null;
      })
      .filter(p => p !== null) as (Photo & { uploadedBy: User })[];
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  // Album operations
  async createAlbum(album: InsertAlbum): Promise<Album> {
    const newAlbum: Album = {
      id: this.nextId++,
      familyId: album.familyId,
      createdById: album.createdById,
      name: album.name,
      description: album.description || null,
      coverPhotoId: album.coverPhotoId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  async getFamilyAlbums(familyId: number): Promise<Album[]> {
    return Array.from(this.albums.values())
      .filter(a => a.familyId === familyId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  // Event operations
  async createEvent(event: InsertEvent): Promise<Event> {
    const newEvent: Event = {
      id: this.nextId++,
      familyId: event.familyId,
      createdById: event.createdById,
      title: event.title,
      description: event.description || null,
      startDate: event.startDate,
      endDate: event.endDate || null,
      location: event.location || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.events.set(newEvent.id, newEvent);
    return newEvent;
  }

  async getFamilyEvents(familyId: number): Promise<(Event & { createdBy: User })[]> {
    const events = Array.from(this.events.values())
      .filter(e => e.familyId === familyId)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    return events
      .map(e => {
        const user = this.users.get(e.createdById);
        return user ? { ...e, createdBy: user } : null;
      })
      .filter(e => e !== null) as (Event & { createdBy: User })[];
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async upsertEventRsvp(rsvp: InsertEventRsvp): Promise<EventRsvp> {
    const existing = Array.from(this.eventRsvps.values())
      .find(r => r.eventId === rsvp.eventId && r.userId === rsvp.userId);

    if (existing) {
      const updated: EventRsvp = {
        ...existing,
        status: rsvp.status || "pending",
        createdAt: existing.createdAt,
        updatedAt: new Date(),
      };
      this.eventRsvps.set(existing.id, updated);
      return updated;
    } else {
      const newRsvp: EventRsvp = {
        id: this.nextId++,
        eventId: rsvp.eventId,
        userId: rsvp.userId,
        status: rsvp.status || "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.eventRsvps.set(newRsvp.id, newRsvp);
      return newRsvp;
    }
  }

  async getEventRsvps(eventId: number): Promise<(EventRsvp & { user: User })[]> {
    const rsvps = Array.from(this.eventRsvps.values())
      .filter(r => r.eventId === eventId);
    
    return rsvps
      .map(r => {
        const user = this.users.get(r.userId);
        return user ? { ...r, user } : null;
      })
      .filter(r => r !== null) as (EventRsvp & { user: User })[];
  }

  // Chat operations
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const newMessage: ChatMessage = {
      id: this.nextId++,
      familyId: message.familyId,
      senderId: message.senderId,
      content: message.content,
      messageType: message.messageType || "text",
      createdAt: new Date(),
    };
    this.chatMessages.set(newMessage.id, newMessage);
    return newMessage;
  }

  async getFamilyMessages(familyId: number): Promise<(ChatMessage & { sender: User })[]> {
    const messages = Array.from(this.chatMessages.values())
      .filter(m => m.familyId === familyId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    
    return messages
      .map(m => {
        const user = this.users.get(m.senderId);
        return user ? { ...m, sender: user } : null;
      })
      .filter(m => m !== null) as (ChatMessage & { sender: User })[];
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const newPost: Post = {
      id: this.nextId++,
      familyId: post.familyId,
      authorId: post.authorId,
      content: post.content,
      photoIds: post.photoIds || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.set(newPost.id, newPost);
    return newPost;
  }

  async getFamilyPosts(familyId: number): Promise<(Post & { author: User; reactions: PostReaction[]; comments: (Comment & { author: User })[] })[]> {
    const posts = Array.from(this.posts.values())
      .filter(p => p.familyId === familyId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    
    return posts
      .map(p => {
        const user = this.users.get(p.authorId);
        if (!user) return null;

        const reactions = Array.from(this.postReactions.values())
          .filter(r => r.postId === p.id);

        const comments = Array.from(this.comments.values())
          .filter(c => c.postId === p.id)
          .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime())
          .map(c => {
            const author = this.users.get(c.authorId);
            return author ? { ...c, author } : null;
          })
          .filter(c => c !== null) as (Comment & { author: User })[];

        return { ...p, author: user, reactions, comments };
      })
      .filter(p => p !== null) as (Post & { author: User; reactions: PostReaction[]; comments: (Comment & { author: User })[] })[];
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async togglePostReaction(reaction: InsertPostReaction): Promise<PostReaction | null> {
    const existing = Array.from(this.postReactions.values())
      .find(r => r.postId === reaction.postId && r.userId === reaction.userId);

    if (existing) {
      this.postReactions.delete(existing.id);
      return null;
    } else {
      const newReaction: PostReaction = {
        id: this.nextId++,
        postId: reaction.postId,
        userId: reaction.userId,
        reactionType: reaction.reactionType || "like",
        createdAt: new Date(),
      };
      this.postReactions.set(newReaction.id, newReaction);
      return newReaction;
    }
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      id: this.nextId++,
      postId: comment.postId,
      authorId: comment.authorId,
      content: comment.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comments.set(newComment.id, newComment);
    return newComment;
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const newNotification: Notification = {
      id: this.nextId++,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      content: notification.content || null,
      isRead: notification.isRead || false,
      familyId: notification.familyId,
      relatedId: notification.relatedId || null,
      createdAt: new Date(),
    };
    this.notifications.set(newNotification.id, newNotification);
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async markNotificationAsRead(id: number): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
    }
  }
}

export const storage = new MemStorage();