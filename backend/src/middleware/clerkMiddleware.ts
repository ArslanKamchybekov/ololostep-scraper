import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const verifyClerkSession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const session = await clerk.sessions.verifySession(token);
    if (!session || !session.userId) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.userId = session.userId as string;
    next();
  } catch (error) {
    console.error('Error verifying session:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { verifyClerkSession };
