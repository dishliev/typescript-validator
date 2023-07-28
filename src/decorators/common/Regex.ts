import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Regex(pattern: string | RegExp, errorMessage?: string) {
  const regexPattern =
    pattern instanceof RegExp ? pattern : new RegExp(pattern);

  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<string> = (value) =>
      regexPattern.test(value);

    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should match the pattern '${regexPattern}'.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
