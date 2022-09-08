import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Phone {
  @Prop({ type: String })
  id: number;

  @Prop({ type: String })
  contact_id: number;

  @Prop({ type: String })
  phone: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
