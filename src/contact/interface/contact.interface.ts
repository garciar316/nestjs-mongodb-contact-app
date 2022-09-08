import { Document } from 'mongoose';

export interface IContact extends Document {
  readonly user_id: string;
  readonly name: string;
  readonly surname: string;
  readonly state: boolean;
}
