import { Transform } from 'class-transformer';

export function ToIntArray() {
  return Transform(({ value }) => {
    if (!Array.isArray(value)) {
      if (Number(value)) value = [parseInt(value, 10)];
      else return undefined;
    }
    return value.map((el) => parseInt(el, 10));
  });
}
