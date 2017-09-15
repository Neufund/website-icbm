export function requiredFieldValidator(value: boolean): string | undefined {
  return value === true ? undefined : "Field is required!";
}
