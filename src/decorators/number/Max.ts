import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Max(maxValue: number, errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<number> = (value: number) =>
      value <= maxValue;
    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should be less than or equal to ${maxValue}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
