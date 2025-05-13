import { Price } from '@app/types/price';

export function areArraysEqual(arr1: Price[], arr2: Price[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every(
    (item, idx) =>
      item.name === arr2[idx].name && item.price === arr2[idx].price,
  );
}
