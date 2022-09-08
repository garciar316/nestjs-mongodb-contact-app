import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { IPhone } from './interface/phone.interface';

@Injectable()
export class PhoneService {
  constructor(@InjectModel('Phone') private phoneModel: Model<IPhone>) {}

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<IPhone> {
    const newPhone = new this.phoneModel(createPhoneDto);
    return newPhone.save();
  }

  async updatePhone(
    phoneId: string,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<IPhone> {
    const existingPhone = this.phoneModel.findByIdAndUpdate(
      phoneId,
      updatePhoneDto,
      { new: true },
    );

    if (!existingPhone) {
      throw new NotFoundException(
        `No se encontro un telefono con id ${phoneId}`,
      );
    }

    return existingPhone;
  }

  getPhones(): Promise<IPhone[]> {
    const phones = this.phoneModel.find().exec();
    if (!phones) {
      throw new NotFoundException(`No se encontraron telefonos`);
    }
    return phones;
  }

  async getPhoneById(phoneId: string): Promise<IPhone> {
    const existingPhone = this.phoneModel.findById(phoneId).exec();
    if (!existingPhone) {
      throw new NotFoundException(
        `No se encontro el telefono con id ${phoneId}`,
      );
    }
    return existingPhone;
  }

  async getPhonesByContactId(phoneId: string): Promise<IPhone[]> {
    const phones = (await this.phoneModel.find()).filter(
      (p) => p.contact_id === parseInt(phoneId),
    );
    if (!phones) {
      throw new NotFoundException(
        `No se encontraron telefonos para usuario con id ${phoneId}`,
      );
    }
    return phones;
  }

  async deletePhone(phoneId: string): Promise<IPhone> {
    const deletedPhone = this.phoneModel.findByIdAndDelete(phoneId);
    if (!deletedPhone) {
      throw new NotFoundException(
        `No se encontro el teléfono con id ${phoneId}`,
      );
    }
    return deletedPhone;
  }
}
