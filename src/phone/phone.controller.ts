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
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Post()
  async createPhone(@Res() res, @Body() createPhoneDto: CreatePhoneDto) {
    try {
      const newPhone = await this.phoneService.createPhone(createPhoneDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Se ha creado el teléfono',
        newPhone,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: no se creo el teléfono',
        error: err.message,
      });
    }
  }

  @Put(':id')
  async updatePhone(
    @Res() res,
    @Param('id') phoneId: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    try {
      const existingPhone = await this.phoneService.updatePhone(
        phoneId,
        updatePhoneDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Teléfono actualizado exitosamente',
        existingPhone,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ha ocurrido un error, no se ha actualizado el teléfono',
        error: err.message,
      });
    }
  }

  @Get()
  async getPhones(@Res() res) {
    try {
      const phoneData = await this.phoneService.getPhones();
      return res.status(HttpStatus.OK).json({
        message: 'Teléfonos encontrados',
        phoneData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async getPhoneById(@Res() res, @Param('id') phoneId: string) {
    try {
      const teléfono = await this.phoneService.getPhoneById(phoneId);
      return res.status(HttpStatus.OK).json({
        message: 'Teléfono encontrado',
        teléfono,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Get()
  async getPhonesByContactId(@Res() res, @Query('contactId') contactId) {
    try {
      const phones = await this.phoneService.getPhonesByContactId(contactId);
      return res.status(HttpStatus.OK).json({
        message: 'Telefonos encontrados',
        phones,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deletePhone(@Res() res, @Param('id') phoneId: string) {
    try {
      const deletedPhone = await this.phoneService.deletePhone(phoneId);
      return res.status(HttpStatus.OK).jso({
        message: 'Teléfono eliminado corectamente',
        deletedPhone,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
