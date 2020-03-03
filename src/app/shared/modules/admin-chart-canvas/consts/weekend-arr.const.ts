import { weekendArrayConvertFunction } from 'src/app/shared/functions/weekend-array-convert.function';

export const weekendArrConst = arrGenerator();

function arrGenerator() {
  const days: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  return weekendArrayConvertFunction(days);
}
