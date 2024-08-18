import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyClerkSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];  // Extract token from the Authorization header
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const sessionId = token.split(" ")[1];  // Extract session ID from the token

    const session = await clerk.sessions.verifySession(sessionId, token)// Verify token using Clerk's client

    if (!session || !session.userId) {
      return res.status(401).json({ error: "Invalid session" });
    }

    req.userId = session.userId as string;  // Attach userId to the request object for further use
    next();
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export { verifyClerkSession };
