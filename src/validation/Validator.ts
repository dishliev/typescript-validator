import "reflect-metadata";

type ValidatorFunction<T> = (value: T) => boolean;

interface Validator<T> {
  validator: ValidatorFunction<T>;
  message: string;
  propertyKey: string;
  errors: string[];
}

function validateAll(target: any) {
  const validators: Validator<any>[] =
    Reflect.getOwnMetadata("validators", target.constructor) || [];

  validators.forEach((validator) => {
    const value = target[validator.propertyKey];
    if (!validator.validator(value)) {
      const errorMessage = validator.message;
      validator.errors.push(errorMessage);
    }
  });
}

function createPropertyDecorator<T>(
  validator: ValidatorFunction<T>,
  message: string
) {
  return function (target: any, propertyKey: string) {
    const validators: Validator<any>[] =
      Reflect.getOwnMetadata("validators", target.constructor) || [];

    validators.push({
      validator,
      message,
      propertyKey,
      errors: [],
    });

    Reflect.defineMetadata("validators", validators, target.constructor);
    Reflect.defineProperty(target, propertyKey + "Errors", {
      value: [],
    });
    Reflect.defineProperty(target, propertyKey + "ValidationMessage", {
      value: message,
    });
  };
}

function validate<T extends { [key: string]: any }>(
  person: T
): { hasError: boolean; errors: string[] } {
  validateAll(person);

  const validators: Validator<any>[] =
    Reflect.getOwnMetadata("validators", person.constructor) || [];

  const errors: string[] = [];
  validators.forEach((validator) => {
    errors.push(...validator.errors);
  });

  return { hasError: errors.length > 0, errors };
}

export {
  ValidatorFunction,
  Validator,
  validateAll,
  createPropertyDecorator,
  validate,
};
