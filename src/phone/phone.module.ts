import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { phoneSchema } from './schema/phone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Phone', schema: phoneSchema }]),
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
