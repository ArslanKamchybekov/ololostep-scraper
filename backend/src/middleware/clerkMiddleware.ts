import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/clerk-sdk-node';

// Initialize the Clerk client
const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyClerkSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Unauthorized: No authorization header" });
    }

    const sessionToken = authorizationHeader.replace("Bearer ", "");
    console.log("Session token:", sessionToken);

    // Extract sessionId from cookies or other means
    console.log("Session ID:", req.cookies.session_id);

    // Verify the session using Clerk's client
    const session = await clerk.sessions.verifySession(req.cookies.session_id, sessionToken);

    if (!session || !session.userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid session" });
    }

    req.userId = session.userId as string;  // Attach userId to the request object for further use
    next();
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(401).json({ error: "Unauthorized: Error verifying session" });
  }
};

export { verifyClerkSession };
