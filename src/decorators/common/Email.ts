import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Email(errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validator: ValidatorFunction<string> = (value) =>
      emailRegex.test(value);
    const defaultMessage = `Invalid email format for property '${propertyKey}'.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    createPropertyDecorator(validator, validatorMessage)(target, propertyKey);
  };
}
