import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function DateBeforeToday(errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const today = new Date();
    const validator: ValidatorFunction<Date> = (value) => value < today;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be before today.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
