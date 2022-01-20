import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { bcryptSaltRounds } from '../auth/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const createdUsers = new this.usersModel(createUserDto);
    const hashpassword = await this.encrypt(createUserDto.password);
    return await this.createdUsers.save({
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashpassword
    })
  }

  findAll() {
    return this.usersModel.find({ select: ["firstname", "lastname", "email", "role"] });
  }

  async encrypt(password: string): Promise<any>  {
    return await bcrypt.hash(password, bcryptSaltRounds);
  }

  async hashCompare(reqPass, dbPass) {
    return await bcrypt.compare(reqPass, dbPass);
  }
  
  async findUser(query:any): Promise<Users[]> {
    return this.usersModel.findOne(query);
  }

  findOne(id: number) {
    return this.usersModel.findOne(id);
  }

  async findEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async update(id:number, updateUserDto: UpdateUserDto) {
    let user : any = {}
    if (!!updateUserDto.password) {
      const hashpassword = await this.encrypt(updateUserDto.password);
      user.password = hashpassword
    }
      return await this.usersModel.update(id,{
        ...updateUserDto, ...user
      })
  }

  /*
    Le spread operator desctructure l'objet, recupère toutes les clés ou les sous-objets

    ex : firstname, password.. dans l'objet updateud le spred créer un objet avec les memes clés.

    Le nouvel objet a firstname et password, autre objet user qui contient password, il est également destructuré.

    Les clés étant commune le dernier spred ecrase la data des autres spreds.
  */

  remove(id: number) {
      return this.usersModel.delete(id);
  }

}
