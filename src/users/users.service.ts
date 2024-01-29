import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }


  async create(createUserDto: CreateUserDto): Promise<string> {
    const user = new this.userModel(createUserDto);
    user.save();
    return 'User added successfully'
  }

  async findAll() {
    return this.userModel.find() ;
  }

  async findOne(id: string) : Promise <User| null > {
    const user = await this.userModel.findOne({_id : id}).exec();
     if (!user) {
      throw new NotFoundException('User not found');
    } ;
    return user ;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
