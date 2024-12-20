import { Model } from '../../orm/Model';
import { Field } from "../../orm/Field";

export class Salut extends Model {
    @Field({ type: 'string', length: 255 })
    title!: string;
  
    @Field({ type: 'text' })
    text!: string;
  }