import {
  createPropertyDecorator,
  ValidatorFunction,
} from "../../validation/Validator";

function includes(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

export function NotAllowValues(
  notAllowedValues: string[],
  errorMessage?: string
) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<string> = (value: string) =>
      !includes(notAllowedValues, value);
    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should not be one of the disallowed values: ${notAllowedValues.join(
      ", "
    )}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
