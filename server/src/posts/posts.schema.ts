import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
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

  readonly readOnlyData: {
    isFolded: boolean;
    isSecret: boolean;
    isAdmin: boolean;
    isMember: boolean;
    content: string;
    imgUrl: string;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('readOnlyData').get(function (this: Post) {
  return {
    isFolded: this.isFolded,
    isSecret: this.isSecret,
    isAdmin: this.isAdmin,
    isMember: this.isMember,
    content: this.content,
    imgUrl: this.imgUrl,
  };
});
