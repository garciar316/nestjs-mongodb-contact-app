import { Document } from 'mongoose';

export class IPhone extends Document {
  readonly contact_id: string;
  readonly phone: number;
}
