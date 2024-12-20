import { FieldOptions } from './Field';

/**
 * Model class
 */
export class Model {
  static fields: { [key: string]: FieldOptions } = {};
  // pour reset le field et eviter que les fields se cumulent( en gros que tout les table ai les meme colonne )
  static resetFields() {
    this.fields = {};
  }

  /**
   * Ajouter un champ à la table du modèle
   * @param fieldName 
   * @param options 
   */
  static addField(fieldName: string, options: FieldOptions) {
    // Réinitialise `fields` à vide avant d'ajouter de nouveaux champs
    if (!Object.prototype.hasOwnProperty.call(this, 'fields')) {
      this.resetFields();
    }
    this.fields[fieldName] = options;
  }
  
/**
 * Générer une requête de création de table
 * @returns 
 */
  static generateCreateTableQuery() {
    const tableName = this.name.toLowerCase();
    const columns = Object.entries(this.fields)
      .map(([fieldName, options]) => {
        // Appeler mapTypeToSQL sans ajouter de longueur ici
        let column = `${fieldName} ${mapTypeToSQL(options.type, options.length)}`;
        
        // Ajouter la longueur uniquement si elle existe et est nécessaire
        if (options.length && options.type.toLowerCase() === 'string') {
          column = `${fieldName} VARCHAR(${options.length})`;
        }
        
        if (options.unique) {
          column += ' UNIQUE';
        }
        if (options.default !== undefined) {
          column += ` DEFAULT '${options.default}'`;
        }
        return column;
      })
      .join(', ');

    return `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
  }
}

/**
 * Mapper les types de champs aux types SQL
 * @param type 
 * @param length 
 * @returns 
 */
function mapTypeToSQL(type: string, length?: number): string {
  switch (type.toLowerCase()) {
    case 'string':
      return 'VARCHAR'; // 'VARCHAR' sans longueur
    case 'number':
      return 'INT'; // 'INT' pour les nombres
    case 'boolean':
      return 'BOOLEAN'; // 'BOOLEAN' pour les booléens
    case 'text':
      return 'TEXT'; // 'TEXT' pour les textes
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

