import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertFamilySchema,
  insertFamilyMembershipSchema,
  insertPhotoSchema,
  insertAlbumSchema,
  insertEventSchema,
  insertEventRsvpSchema,
  insertChatMessageSchema,
  insertPostSchema,
  insertPostReactionSchema,
  insertCommentSchema,
  insertNotificationSchema,
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Family routes
  app.post('/api/families', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyData = insertFamilySchema.parse({ ...req.body, createdById: userId });
      
      const family = await storage.createFamily(familyData);
      
      // Add creator as family admin
      await storage.addFamilyMember({
        familyId: family.id,
        userId,
        role: "admin",
        relationshipType: "creator",
      });
      
      res.json(family);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating family:", error);
        res.status(500).json({ message: "Failed to create family" });
      }
    }
  });

  app.get('/api/families', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const families = await storage.getFamiliesByUserId(userId);
      res.json(families);
    } catch (error) {
      console.error("Error fetching families:", error);
      res.status(500).json({ message: "Failed to fetch families" });
    }
  });

  app.get('/api/families/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const family = await storage.getFamily(familyId);
      if (!family) {
        return res.status(404).json({ message: "Family not found" });
      }
      
      res.json(family);
    } catch (error) {
      console.error("Error fetching family:", error);
      res.status(500).json({ message: "Failed to fetch family" });
    }
  });

  app.get('/api/families/:id/members', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const members = await storage.getFamilyMembers(familyId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching family members:", error);
      res.status(500).json({ message: "Failed to fetch family members" });
    }
  });

  app.post('/api/families/:id/members', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is admin of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership || membership.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const membershipData = insertFamilyMembershipSchema.parse({ ...req.body, familyId });
      const newMembership = await storage.addFamilyMember(membershipData);
      
      res.json(newMembership);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error adding family member:", error);
        res.status(500).json({ message: "Failed to add family member" });
      }
    }
  });

  // Photo routes
  app.post('/api/families/:id/photos', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const photoData = insertPhotoSchema.parse({ ...req.body, familyId, uploadedById: userId });
      const photo = await storage.createPhoto(photoData);
      
      res.json(photo);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating photo:", error);
        res.status(500).json({ message: "Failed to create photo" });
      }
    }
  });

  app.get('/api/families/:id/photos', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const photos = await storage.getFamilyPhotos(familyId);
      res.json(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  // Album routes
  app.post('/api/families/:id/albums', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const albumData = insertAlbumSchema.parse({ ...req.body, familyId, createdById: userId });
      const album = await storage.createAlbum(albumData);
      
      res.json(album);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating album:", error);
        res.status(500).json({ message: "Failed to create album" });
      }
    }
  });

  app.get('/api/families/:id/albums', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const albums = await storage.getFamilyAlbums(familyId);
      res.json(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
      res.status(500).json({ message: "Failed to fetch albums" });
    }
  });

  // Event routes
  app.post('/api/families/:id/events', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const eventData = insertEventSchema.parse({ ...req.body, familyId, createdById: userId });
      const event = await storage.createEvent(eventData);
      
      res.json(event);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });

  app.get('/api/families/:id/events', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const events = await storage.getFamilyEvents(familyId);
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.post('/api/events/:id/rsvp', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const eventId = parseInt(req.params.id);
      
      const rsvpData = insertEventRsvpSchema.parse({ ...req.body, eventId, userId });
      const rsvp = await storage.upsertEventRsvp(rsvpData);
      
      res.json(rsvp);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error updating RSVP:", error);
        res.status(500).json({ message: "Failed to update RSVP" });
      }
    }
  });

  app.get('/api/events/:id/rsvps', isAuthenticated, async (req: any, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const rsvps = await storage.getEventRsvps(eventId);
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ message: "Failed to fetch RSVPs" });
    }
  });

  // Chat routes
  app.post('/api/families/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const messageData = insertChatMessageSchema.parse({ ...req.body, familyId, senderId: userId });
      const message = await storage.createChatMessage(messageData);
      
      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  app.get('/api/families/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const messages = await storage.getFamilyMessages(familyId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Post routes
  app.post('/api/families/:id/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const postData = insertPostSchema.parse({ ...req.body, familyId, authorId: userId });
      const post = await storage.createPost(postData);
      
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  });

  app.get('/api/families/:id/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const familyId = parseInt(req.params.id);
      
      // Check if user is member of this family
      const membership = await storage.getUserFamilyMembership(userId, familyId);
      if (!membership) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const posts = await storage.getFamilyPosts(familyId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post('/api/posts/:id/react', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postId = parseInt(req.params.id);
      
      const reactionData = insertPostReactionSchema.parse({ ...req.body, postId, userId });
      const reaction = await storage.togglePostReaction(reactionData);
      
      res.json(reaction);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error toggling reaction:", error);
        res.status(500).json({ message: "Failed to toggle reaction" });
      }
    }
  });

  app.post('/api/posts/:id/comments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postId = parseInt(req.params.id);
      
      const commentData = insertCommentSchema.parse({ ...req.body, postId, authorId: userId });
      const comment = await storage.createComment(commentData);
      
      res.json(comment);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Failed to create comment" });
      }
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.put('/api/notifications/:id/read', isAuthenticated, async (req: any, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
