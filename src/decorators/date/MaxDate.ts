import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function MaxDate(maxValue: Date, errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<Date> = (value) => value <= maxValue;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be less than or equal to ${maxValue}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
