import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function Min(minValue: number, errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<number> = (value) => value >= minValue;
    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should be greater than or equal to ${minValue}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
