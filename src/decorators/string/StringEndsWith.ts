import { createPropertyDecorator } from "../../validation/Validator";

export function StringEndsWith(suffix, errorMessage) {
  return function (target, propertyKey) {
    const validator = function (value) {
      return value.lastIndexOf(suffix) === value.length - suffix.length;
    };

    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should end with '${suffix}'.`;
    const validatorMessage = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
