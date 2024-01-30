import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ObjectId');
    }
    const user = await this.userModel.findOne({_id : id}).exec();
     if (!user) {
      throw new NotFoundException('User not found');
    } ;
    return user ;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ObjectId');
  }

  const userExist = await this.userModel.findOne({ _id: id }).exec();

  if (!userExist) {
      throw new NotFoundException('User not found');
  }
    return this.userModel.updateOne({_id: id} , {$set: { ...updateUserDto }})
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
