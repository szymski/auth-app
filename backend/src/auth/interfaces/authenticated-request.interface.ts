import { ObjectId } from 'mongodb';

export interface AuthenticatedRequest {
  user: {
    userId: ObjectId;
  };
}
