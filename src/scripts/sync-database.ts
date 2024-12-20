import { db } from '../../orm/Orm';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Salut } from '../models/Salut';
import { Crud } from '../../orm/Orm';

async function syncDatabase() {

  // Configuration de la connexion à la base de données
  const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test_db',
  };

  // Initialiser la connexion
  await db.initialize(dbConfig);

  // Synchroniser les modèles
  await db.syncModels([User, Post, Salut]);
  console.log('Database synchronized successfully.');

  // Créer une instance de Crud et injecter la connexion
  const crud = new Crud();
  crud.setConnection(db.getConnection()); // Injecte la connexion active

  // CRUD - Create
  await crud.create('post', { title: 'Mon premier post', content: 'Contenu du post', userId: 2 });
  console.log('Data inserted successfully.');

  // CRUD - Read
  const posts = await crud.read('post');
  console.log('Read data:', posts);

  // CRUD - Update
  await crud.update('post', { title: 'Post mis à jur' }, 'Userid = 1');
  console.log('Data updated successfully.');

  // CRUD - Delete
  await crud.delete('post', 'Userid = 0');
  console.log('Data deleted successfully.');

  process.exit(0);
}

syncDatabase();
