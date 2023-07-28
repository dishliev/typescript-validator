import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function DateAfterOrEqual(date: Date, errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<Date> = (value) => value >= date;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be after or equal to ${date}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
