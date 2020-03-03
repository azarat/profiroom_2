import { monthArrayConvert } from 'src/app/shared/functions/month-array-convert.function';

export const monthArrConst = arrGenerator();

function arrGenerator() {
  const months: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return monthArrayConvert(months);
}
