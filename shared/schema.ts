import { z } from "zod";

// User types
export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type UpsertUser = {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
};

// Family types
export interface Family {
  id: number;
  name: string;
  description: string | null;
  createdById: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertFamilySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  createdById: z.string(),
});

export type InsertFamily = z.infer<typeof insertFamilySchema>;

// Family membership types
export interface FamilyMembership {
  id: number;
  familyId: number;
  userId: string;
  role: string;
  relationshipType: string | null;
  joinedAt: Date | null;
}

export const insertFamilyMembershipSchema = z.object({
  familyId: z.number(),
  userId: z.string(),
  role: z.string().optional(),
  relationshipType: z.string().optional(),
});

export type InsertFamilyMembership = z.infer<typeof insertFamilyMembershipSchema>;

// Photo types
export interface Photo {
  id: number;
  familyId: number;
  uploadedById: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  albumId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertPhotoSchema = z.object({
  familyId: z.number(),
  uploadedById: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string(),
  albumId: z.number().optional(),
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

// Album types
export interface Album {
  id: number;
  familyId: number;
  createdById: string;
  name: string;
  description: string | null;
  coverPhotoId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertAlbumSchema = z.object({
  familyId: z.number(),
  createdById: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  coverPhotoId: z.number().optional(),
});

export type InsertAlbum = z.infer<typeof insertAlbumSchema>;

// Event types
export interface Event {
  id: number;
  familyId: number;
  createdById: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  location: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertEventSchema = z.object({
  familyId: z.number(),
  createdById: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  location: z.string().optional(),
});

export type InsertEvent = z.infer<typeof insertEventSchema>;

// Event RSVP types
export interface EventRsvp {
  id: number;
  eventId: number;
  userId: string;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertEventRsvpSchema = z.object({
  eventId: z.number(),
  userId: z.string(),
  status: z.string().optional(),
});

export type InsertEventRsvp = z.infer<typeof insertEventRsvpSchema>;

// Chat message types
export interface ChatMessage {
  id: number;
  familyId: number;
  senderId: string;
  content: string;
  messageType: string;
  createdAt: Date | null;
}

export const insertChatMessageSchema = z.object({
  familyId: z.number(),
  senderId: z.string(),
  content: z.string(),
  messageType: z.string(),
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

// Post types
export interface Post {
  id: number;
  familyId: number;
  authorId: string;
  content: string;
  photoIds: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertPostSchema = z.object({
  familyId: z.number(),
  authorId: z.string(),
  content: z.string(),
  photoIds: z.array(z.string()).optional(),
});

export type InsertPost = z.infer<typeof insertPostSchema>;

// Post reaction types
export interface PostReaction {
  id: number;
  postId: number;
  userId: string;
  reactionType: string;
  createdAt: Date | null;
}

export const insertPostReactionSchema = z.object({
  postId: z.number(),
  userId: z.string(),
  reactionType: z.string().optional(),
});

export type InsertPostReaction = z.infer<typeof insertPostReactionSchema>;

// Comment types
export interface Comment {
  id: number;
  postId: number;
  authorId: string;
  content: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const insertCommentSchema = z.object({
  postId: z.number(),
  authorId: z.string(),
  content: z.string(),
});

export type InsertComment = z.infer<typeof insertCommentSchema>;

// Notification types
export interface Notification {
  id: number;
  userId: string;
  type: string;
  title: string;
  content: string | null;
  isRead: boolean;
  familyId: number;
  relatedId: number | null;
  createdAt: Date | null;
}

export const insertNotificationSchema = z.object({
  userId: z.string(),
  type: z.string(),
  title: z.string(),
  content: z.string().optional(),
  isRead: z.boolean().optional(),
  familyId: z.number(),
  relatedId: z.number().optional(),
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;