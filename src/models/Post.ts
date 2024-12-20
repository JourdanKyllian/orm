import { Model } from '../../orm/Model';
import { Field } from "../../orm/Field";

export class Post extends Model {
  @Field({ type: 'string', length: 255 })
  title!: string;

  @Field({ type: 'text' })
  content!: string;

  @Field({ type: 'number' })
  userId!: number; // Relation avec l'utilisateur
}
