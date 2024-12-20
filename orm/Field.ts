export interface FieldOptions {
  type: string;
  length?: number;
  unique?: boolean;
  default?: any;
}

export function Field(options: FieldOptions) {
  return function (target: any, propertyName: string, context?: ClassFieldDecoratorContext) {
    const model = target.constructor;

    if (!model.fields) {
      model.fields = {};
    }

    model.addField(propertyName, options);
  };
}
