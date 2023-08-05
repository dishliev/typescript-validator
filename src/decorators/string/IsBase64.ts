import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function IsBase64(errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const base64Regex =
      /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/;
    const validator: ValidatorFunction<string> = (value) =>
      base64Regex.test(value);
    const defaultMessage = `Invalid base64 format for property '${propertyKey}'.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    createPropertyDecorator(validator, validatorMessage)(target, propertyKey);
  };
}
