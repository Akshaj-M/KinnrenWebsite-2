import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

// Temporary authentication system for development
export function setupTempAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "temp-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.use(session(sessionSettings));

  // Temporary login endpoint
  app.post("/api/temp-login", async (req, res) => {
    try {
      // Create or get a test user
      const testUser = await storage.upsertUser({
        id: "test-user-123",
        email: "test@kinnren.com",
        firstName: "Test",
        lastName: "User",
        profileImageUrl: null,
      });

      // Set session
      (req.session as any).userId = testUser.id;
      res.json(testUser);
    } catch (error) {
      console.error("Temp login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
}

export const isTempAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req.session as any)?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};