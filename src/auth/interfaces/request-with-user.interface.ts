import { Request } from 'express';
import { UserDocument } from 'src/users/schemas/user.schema';

export interface RequestWithUser extends Request {
  user: UserDocument;
}
