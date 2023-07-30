import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

export enum DateComparison {
  DateOnly,
  DateTime,
  TimeOnly,
}

export interface DateValidatorOptions {
  comparison: DateComparison;
  minDate?: Date;
  maxDate?: Date;
}

export function DateValidator(
  options: DateValidatorOptions,
  errorMessage?: string
) {
  return function (target: any, propertyKey: string) {
    const { comparison, minDate, maxDate } = options;
    const validator: ValidatorFunction<Date> = (value) => {
      if (comparison === DateComparison.DateOnly) {
        const valueDate = new Date(
          value.getFullYear(),
          value.getMonth(),
          value.getDate()
        );

        if (minDate && valueDate < minDate) {
          return false;
        }
        if (maxDate && valueDate > maxDate) {
          return false;
        }

        return true;
      } else if (comparison === DateComparison.DateTime) {
        if (minDate && value < minDate) {
          return false;
        }
        if (maxDate && value > maxDate) {
          return false;
        }

        return true;
      } else if (comparison === DateComparison.TimeOnly) {
        const valueTime =
          value.getHours() * 3600000 +
          value.getMinutes() * 60000 +
          value.getSeconds() * 1000 +
          value.getMilliseconds();

        if (minDate) {
          const minTime =
            minDate.getHours() * 3600000 +
            minDate.getMinutes() * 60000 +
            minDate.getSeconds() * 1000 +
            minDate.getMilliseconds();
          if (valueTime < minTime) {
            return false;
          }
        }
        if (maxDate) {
          const maxTime =
            maxDate.getHours() * 3600000 +
            maxDate.getMinutes() * 60000 +
            maxDate.getSeconds() * 1000 +
            maxDate.getMilliseconds();
          if (valueTime > maxTime) {
            return false;
          }
        }

        return true;
      }

      return false;
    };

    const defaultMessage = `Invalid date for property '${propertyKey}'.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
