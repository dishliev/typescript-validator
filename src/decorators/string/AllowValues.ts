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

export function AllowValues(allowedValues: string[], errorMessage?: string) {
  return function (target: any, propertyKey: string) {
    const validator: ValidatorFunction<string> = (value: string) =>
      includes(allowedValues, value);
    const defaultMessage = `Invalid value for property '${propertyKey}'. Value should be one of the allowed values: ${allowedValues.join(
      ", "
    )}.`;
    const validatorMessage: string = errorMessage || defaultMessage;

    return createPropertyDecorator(validator, validatorMessage)(
      target,
      propertyKey
    );
  };
}
