import { createPropertyDecorator } from "../../validation/Validator";

export function StringContains(substring, errorMessage) {
  return function (target, propertyKey) {
    const validator = function (value) {
      return value.indexOf(substring) !== -1;
    };

    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should contain '${substring}'.`;
    const validatorMessage = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
