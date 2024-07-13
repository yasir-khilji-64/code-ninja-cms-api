import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './user-role.enum';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  userName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: Date,
    required: true,
  })
  dob: Date;

  @Prop({
    type: String,
    required: false,
    default: 'https://www.gravatar.com/avatar/?s=400&d=identicon',
  })
  picture: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  website: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  gender: boolean;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  socialMediaHandler: string;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  status: boolean;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  phone: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;

  @Prop({
    type: Date,
    default: null,
  })
  deleted_at: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });

UserSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { is_deleted: { $ne: true } } });
});
