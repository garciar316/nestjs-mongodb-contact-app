import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(
        `No se encontro un telefono con id ${userId}`,
      );
    }

    return existingUser;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find().exec();
    if (!users) {
      throw new NotFoundException(`No se encontraron telefonos`);
    }
    return users;
  }

  async getUserById(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(
        `No se encontro el telefono con id ${userId}`,
      );
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(
        `No se encontro el teléfono con id ${userId}`,
      );
    }
    return deletedUser;
  }
}
