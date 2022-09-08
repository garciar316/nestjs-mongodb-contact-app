import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop({ type: String })
  user_id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  surname: string;

  @Prop({ type: Boolean })
  state: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
