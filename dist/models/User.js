"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Model_1 = require("../orm/Model");
const Field_1 = require("../orm/Field");
class User extends Model_1.Model {
}
exports.User = User;
__decorate([
    (0, Field_1.Field)({ type: 'string', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, Field_1.Field)({ type: 'string', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, Field_1.Field)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
console.log(User.generateCreateTableQuery());
