"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
async function syncDatabase() {
    await (0, database_1.connectDatabase)();
    // Synchronisation des modèles
    await database_1.db.syncModels([User_1.User, Post_1.Post]);
    console.log('Database synchronized successfully.');
    process.exit(0);
}
syncDatabase().catch((err) => {
    console.error('Failed to synchronize the database:', err);
    process.exit(1);
});
