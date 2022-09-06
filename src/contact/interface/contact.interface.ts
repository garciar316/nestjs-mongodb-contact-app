import { Document } from 'mongoose';

export interface IContact extends Document {
  readonly id: number;
  readonly user_id: number;
  readonly name: string;
  readonly surname: string;
  readonly state: boolean;
}
