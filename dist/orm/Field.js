"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = Field;
function Field(options) {
    return function (target, propertyName, context) {
        const model = target.constructor;
        if (!model.fields) {
            model.fields = {};
        }
        model.addField(propertyName, options);
    };
}
