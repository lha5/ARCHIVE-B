import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  isFolded: boolean;

  @Prop()
  isSecret: boolean;

  @Prop()
  isAdmin: boolean;

  @Prop()
  isMember: boolean;

  @Prop()
  @IsString()
  content: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
