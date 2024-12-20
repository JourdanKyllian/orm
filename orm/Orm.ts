import mysql from 'mysql2/promise';

/**
 * Configuration de la base de données
 */
interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

/**
 * Classe de gestion de la base de données
 */
export class Database {
    private connection: mysql.Connection | null = null;
    private config: DatabaseConfig | null = null;
  
    constructor() {}
  
    /**
     * Initialiser la connexion à la base de données
     * @param config 
     */
    async initialize(config: DatabaseConfig) {
      this.config = config;
  
      try {
        this.connection = await mysql.createConnection(this.config);
        console.log('Database connected successfully!');
      } catch (error) {
        throw new Error('Failed to connect to database: ' + error);
      }
    }
  
  /**
   * Synchroniser les modèles avec la base de données
   * @param models 
   */
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
  
/** 
 * Obtenir la connexion active
 * @returns 
 */
    getConnection() {
      if (!this.connection) {
        throw new Error('Database not connected');
      }
      return this.connection;
    }
    async close() {
      if (this.connection) {
          try {
              await this.connection.end();
              console.log('Database connection closed successfully.');
          } catch (error) {
              console.error('Error closing database connection:', error);
          } finally {
              this.connection = null;
          }
      }
  }
  
  }
  // Instance unique de la base de données
  export const db = new Database();
  
/**
 * Classe CRUD
 */
export class Crud {
  private connection: mysql.Connection | null = null;

  /**
   * Injecter la connexion
   * @param connection 
   */
  setConnection(connection: mysql.Connection) {
    this.connection = connection;
  }

/**
 * Exécuter une requête 
 * @param query 
 * @returns 
 */
  async executeQuery(query: string) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    return this.connection.execute(query);
  }

  /**
   * CRUD - Create (Créer)
   * @param table 
   * @param data 
   */
  async create(table: string, data: { [key: string]: any }) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data)
      .map((value) => (typeof value === 'string' ? `'${value}'` : value))
      .join(', ');

    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    await this.executeQuery(query);
  }

/**
 * CRUD - Read (Lire)
 * @param table 
 * @param conditions 
 * @returns 
 */
  async read(table: string, conditions: string = '') {
    const query = `SELECT * FROM ${table} ${conditions}`;
    const [results] = await this.executeQuery(query);
    return results;
  }

  /**
   * CRUD - Update (Mettre à jour)
   * @param table 
   * @param data 
   * @param conditions 
   */
  async update(table: string, data: { [key: string]: any }, conditions: string) {
    const setClause = Object.entries(data)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(', ');

    const query = `UPDATE ${table} SET ${setClause} WHERE ${conditions}`;
    await this.executeQuery(query);
  }

 /**
  * CRUD - Delete (Supprimer)
  * @param table 
  * @param conditions 
  */
  async delete(table: string, conditions: string) {
    const query = `DELETE FROM ${table} WHERE ${conditions}`;
    await this.executeQuery(query);
  }
}