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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Se ha creado el usuario',
        newUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: no se creo el usuario',
        error: err.message,
      });
    }
  }

  @Put(':id')
  async updateUser(
    @Res() res,
    @Param('id') userId: string,
    @Body() updateUsertDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUsertDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Usuario actualizado exitosamente',
        existingUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Ha ocurrido un error, no se ha actualizado el usuario',
        error: err.message,
      });
    }
  }

  @Get()
  async getUsers(@Res() res) {
    try {
      const userData = await this.userService.getUsers();
      return res.status(HttpStatus.OK).json({
        message: 'Usuarios encontrados',
        userData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async getUserById(@Res() res, @Param('id') userId: string) {
    try {
      const teléfono = await this.userService.getUserById(userId);
      return res.status(HttpStatus.OK).json({
        message: 'Usuario encontrado',
        teléfono,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteUser(@Res() res, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return res.status(HttpStatus.OK).json({
        message: 'Usuario eliminado corectamente',
        deletedUser,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
