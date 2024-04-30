export const fixNumber = (num: number, fix: number) => {
  const fixedNum = num.toFixed(fix);
  return Number(fixedNum) === num ? num : Number(fixedNum);
};
