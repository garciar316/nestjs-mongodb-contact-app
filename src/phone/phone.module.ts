import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { PhoneSchema } from './schema/phone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Phone', schema: PhoneSchema }]),
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
