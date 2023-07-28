import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Range(
  minValue: number,
  maxValue: number,
  errorMessage?: string
) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<number> = (value) =>
      value >= minValue && value <= maxValue;

    const validatorMessage: string =
      errorMessage ||
      `Invalid value for property '${propertyKey}'. Value should be between ${minValue} and ${maxValue}.`;

    createPropertyDecorator(validator, validatorMessage)(target, propertyKey);
  };
}
