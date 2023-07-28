import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function MinDate(minValue: Date, errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<Date> = (value) => value >= minValue;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be greater than or equal to ${minValue}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
