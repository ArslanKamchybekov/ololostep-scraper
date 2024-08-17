import { Request, Response, NextFunction } from 'express';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const clerk = ClerkExpressWithAuth();

export const clerkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await clerk(req, res, next);
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const getUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.userId = req.session.userId;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
