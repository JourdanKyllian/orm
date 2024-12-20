/**
 * Field options
 */
export interface FieldOptions {
  type: string;
  length?: number;
  unique?: boolean;
  default?: any;
}

/**
 * methode de décoration de champ
 * @param options 
 * @returns 
 */
export function Field(options: FieldOptions) {
  return function (target: any, propertyName: string, context?: ClassFieldDecoratorContext) {
    const model = target.constructor;

    if (!model.fields) {
      model.fields = {};
    }

    model.addField(propertyName, options);
  };
}
