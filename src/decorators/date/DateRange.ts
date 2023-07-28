import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export function DateRange(
  startDate: Date,
  endDate: Date,
  errorMessage?: string
) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<Date> = (value) =>
      value >= startDate && value <= endDate;

    const defaultMessage = `Invalid date for property '${propertyKey}'. Date should be between ${startDate} and ${endDate}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
