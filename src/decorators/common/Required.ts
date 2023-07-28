import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Required(errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<any> = (value) =>
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !/^\s*$/.test(value);
    const defaultMessage = `Property '${propertyKey}' is required.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    createPropertyDecorator(validator, validatorMessage)(target, propertyKey);
  };
}
