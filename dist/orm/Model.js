"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    static { this.fields = {}; }
    static addField(name, options) {
        this.fields[name] = options;
    }
    static generateCreateTableQuery() {
        const tableName = this.name.toLowerCase();
        const columns = Object.entries(this.fields)
            .map(([fieldName, options]) => {
            let column = `${fieldName} ${options.type.toUpperCase()}`;
            if (options.length) {
                column += `(${options.length})`;
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
exports.Model = Model;
