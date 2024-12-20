"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
class Database {
    constructor(config) {
        this.connection = null;
        this.config = config;
    }
    async connect() {
        if (!this.connection) {
            this.connection = await promise_1.default.createConnection(this.config);
        }
    }
    async executeQuery(query) {
        if (!this.connection) {
            throw new Error('Database not connected');
        }
        return this.connection.execute(query);
    }
    async syncModels(models) {
        if (!this.connection) {
            throw new Error('Database not connected');
        }
        for (const model of models) {
            const query = model.generateCreateTableQuery();
            console.log(`Executing query: ${query}`);
            await this.executeQuery(query);
        }
    }
    getConnection() {
        if (!this.connection) {
            throw new Error('Database not connected');
        }
        return this.connection;
    }
}
exports.Database = Database;
