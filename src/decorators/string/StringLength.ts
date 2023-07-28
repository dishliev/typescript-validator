import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function StringLength(
  minLength: number,
  maxLength: number,
  errorMessage?: string
) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<string> = (value) =>
      value.length >= minLength && value.length <= maxLength;
    const defaultMessage = `Invalid length for property '${propertyKey}'. Length should be between ${minLength} and ${maxLength}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
