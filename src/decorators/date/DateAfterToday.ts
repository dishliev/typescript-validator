import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function DateAfterToday(errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const today = new Date();
    const validator: ValidatorFunction<Date> = (value) => value > today;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be after today.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
