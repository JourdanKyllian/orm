import mysql from 'mysql2/promise';

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
export class Database {
    private connection: mysql.Connection | null = null;
    private config: DatabaseConfig | null = null;
  
    constructor() {}
  
    // Initialiser avec la configuration
    async initialize(config: DatabaseConfig) {
      this.config = config;
  
      try {
        this.connection = await mysql.createConnection(this.config);
        console.log('Database connected successfully!');
      } catch (error) {
        throw new Error('Failed to connect to database: ' + error);
      }
    }
  
    // Synchroniser les modèles
    async syncModels(models: any[]) {
      if (!this.connection) {
        throw new Error('Database not connected');
      }
  
      for (const model of models) {
        const query = model.generateCreateTableQuery();
        console.log(`Executing query: ${query}`);
        await this.connection.execute(query);
      }
    }
  
    // Obtenir la connexion actuelle
    getConnection() {
      if (!this.connection) {
        throw new Error('Database not connected');
      }
      return this.connection;
    }
  
    // Exécuter une requête
    async executeQuery(query: string) {
      if (!this.connection) {
        throw new Error('Database not connected');
      }
      return this.connection.execute(query);
    }
  }
  // Instance unique de la base de données
  export const db = new Database();
  

export class Crud {
  private connection: mysql.Connection | null = null;

  // Setter pour la connexion
  setConnection(connection: mysql.Connection) {
    this.connection = connection;
  }

  async executeQuery(query: string) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    return this.connection.execute(query);
  }

  // CRUD - Create (Insertion)
  async create(table: string, data: { [key: string]: any }) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data)
      .map((value) => (typeof value === 'string' ? `'${value}'` : value))
      .join(', ');

    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    await this.executeQuery(query);
  }

  // CRUD - Read (Sélectionner)
  async read(table: string, conditions: string = '') {
    const query = `SELECT * FROM ${table} ${conditions}`;
    const [results] = await this.executeQuery(query);
    return results;
  }

  // CRUD - Update (Mettre à jour)
  async update(table: string, data: { [key: string]: any }, conditions: string) {
    const setClause = Object.entries(data)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(', ');

    const query = `UPDATE ${table} SET ${setClause} WHERE ${conditions}`;
    await this.executeQuery(query);
  }

  // CRUD - Delete (Supprimer)
  async delete(table: string, conditions: string) {
    const query = `DELETE FROM ${table} WHERE ${conditions}`;
    await this.executeQuery(query);
  }
}