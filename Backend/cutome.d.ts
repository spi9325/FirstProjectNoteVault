import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      email?: string;
      userid?: number;
      username?:string;
    }
  }
}