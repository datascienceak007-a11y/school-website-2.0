import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const requireOwner = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Owner privileges required.',
    });
  }

  next();
};

export const requireAdminOrOwner = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (req.admin.role !== 'super_admin' && req.admin.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }

  next();
};
