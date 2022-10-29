import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Auth extends Document {
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
  isAdmin: boolean;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.virtual('readOnlyData').get(function (this: Auth) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
