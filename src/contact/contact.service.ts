import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IContact } from './interface/contact.interface';

@Injectable()
export class ContactService {
  constructor(@InjectModel('Contact') private contactModel: Model<IContact>) {}

  async createContact(createContactDto: CreateContactDto): Promise<IContact> {
    const newContact = new this.contactModel(createContactDto);
    return newContact.save();
  }

  async updateContact(
    contactId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<IContact> {
    const existingContact = this.contactModel.findByIdAndUpdate(
      contactId,
      updateContactDto,
      { new: true },
    );

    if (!existingContact) {
      throw new NotFoundException(
        `No se encontro el contacto con id ${contactId}`,
      );
    }

    return existingContact;
  }

  getContacts(): Promise<IContact[]> {
    const contacts = this.contactModel.find().exec();
    if (!contacts) {
      throw new NotFoundException(`No se encontraron contactos`);
    }
    return contacts;
  }

  async getContactById(contactId: string): Promise<IContact> {
    const existingContact = this.contactModel.findById(contactId).exec();
    if (!existingContact) {
      throw new NotFoundException(
        `No se encontro el contacto con id ${contactId}`,
      );
    }
    return existingContact;
  }

  async getContactsByUserId(userId: string): Promise<IContact[]> {
    const contacts = (await this.contactModel.find()).filter(
      (c) => c.user_id === parseInt(userId),
    );
    if (!contacts) {
      throw new NotFoundException(
        `No se encontraron contactos para usuario con id ${userId}`,
      );
    }
    return contacts;
  }

  async deleteContact(contactId: string): Promise<IContact> {
    const deletedContact = this.contactModel.findByIdAndDelete(contactId);
    if (!deletedContact) {
      throw new NotFoundException(
        `No se encontro el contacto con id ${contactId}`,
      );
    }
    return deletedContact;
  }
}
