import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: Number })
  user_id: number;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  surname: string;

  @Prop({ type: Boolean })
  state: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
