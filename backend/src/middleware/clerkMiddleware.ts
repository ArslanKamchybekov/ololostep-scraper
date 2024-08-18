import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyClerkSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  const sessionId = req.headers['x-session-id'];  // Assuming sessionId is sent as a custom header

  if (!authorizationHeader || !sessionId) {
    return res.status(401).json({ message: 'Missing session or token' });
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token from the Bearer scheme

  try {
    // Verify the session using Clerk's session verification function
    const session = await clerk.sessions.verifySession(sessionId as string, token);

    if (!session || !session.userId) {
      return res.status(401).json({ message: 'Invalid session' });
    }

    // Attach the userId to the request object for further use
    req.userId = session.userId;
    next();
  } catch (error) {
    console.error('Session verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
