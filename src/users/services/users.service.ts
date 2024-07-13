import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, PipelineStage } from 'mongoose';
import { FindUserDto } from '../dtos/find-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(details: FindUserDto): Promise<UserDocument[]> {
    const matchOpts = {};

    if (details['email'] !== undefined) {
      matchOpts['email'] = details['email'];
    }
    matchOpts['status'] = true;

    const query: PipelineStage[] = [
      {
        $match: matchOpts,
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          firstName: '$firstName',
          lastName: '$lastName',
          username: '$username',
          email: '$email',
          dob: '$dob',
          picture: '$picture',
          password: '$password',
          website: '$website',
          gender: '$gender',
          socialMediaHandler: '$socialMediaHandler',
          role: '$role',
          phone: '$phone',
        },
      },
    ];

    return this.userModel.aggregate<UserDocument>(query);
  }

  async create(details: CreateUserDto) {
    const user = await this.userModel.create([details]);
    return user[0];
  }
}
