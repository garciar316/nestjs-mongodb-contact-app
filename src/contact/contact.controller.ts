import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createContact(@Res() res, @Body() createContactDto: CreateContactDto) {
    try {
      const newContact = await this.contactService.createContact(
        createContactDto,
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'Se ha creado el contacto',
        newContact,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: no se creo el contacto',
        error: err.message,
      });
    }
  }

  @Put(':id')
  async updateContact(
    @Res() res,
    @Param('id') ContactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    try {
      const existingContact = await this.contactService.updateContact(
        ContactId,
        updateContactDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Contacto actualizado exitosamente',
        existingContact,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ha ocurrido un error, no se ha actualizado el contacto',
        error: err.message,
      });
    }
  }

  @Get()
  async getContacts(@Res() res) {
    try {
      const contactData = await this.contactService.getContacts();
      return res.status(HttpStatus.OK).json({
        message: 'Contactos encontrados',
        contactData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async getContactById(@Res() res, @Param('id') contactId: string) {
    try {
      const contact = await this.contactService.getContactById(contactId);
      return res.status(HttpStatus.OK).json({
        message: 'Contacto encontrado',
        contact,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Get()
  async getContactsByUserId(@Res() res, @Query('userId') userId) {
    try {
      const contacts = await this.contactService.getContactsByUserId(userId);
      return res.status(HttpStatus.OK).json({
        message: 'Contactos encontrados',
        contacts,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteContact(@Res() res, @Param('id') contactId: string) {
    try {
      const deleteContact = await this.contactService.deleteContact(contactId);
      return res.status(HttpStatus.OK).jso({
        message: 'Contacto eliminado corectamente',
        deleteContact,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
