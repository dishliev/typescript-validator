import { createPropertyDecorator } from "../../validation/Validator";

export function StringStartsWith(prefix, errorMessage) {
  return function (target, propertyKey) {
    const validator = function (value) {
      return value.indexOf(prefix) === 0;
    };

    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should start with '${prefix}'.`;
    const validatorMessage = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
