import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Phone {
  @Prop({ type: String })
  contact_id: string;

  @Prop({ type: String })
  phone: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
