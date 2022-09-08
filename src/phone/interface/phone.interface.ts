import { Document } from 'mongoose';

export class IPhone extends Document {
  readonly id: number;
  readonly contact_id: number;
  readonly phone: number;
}
