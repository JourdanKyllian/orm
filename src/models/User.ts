import { Model } from '../../orm/Model';
import { Field } from "../../orm/Field";

export class User extends Model {
  @Field({ type: 'string', length: 255 })
  name!: string;

  @Field({ type: 'string', unique: false, length: 255 })
  email!: string;

  @Field({ type: 'boolean', default: 0 })
  isAdmin!: boolean;
}
