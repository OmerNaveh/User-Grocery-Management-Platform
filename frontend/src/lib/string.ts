export const getInitials = (name: string): string => {
  if (!name) return "ON";
  const [firstName, lastName] = name.split(" ");
  if (!firstName || !lastName) return "ON";
  return `${firstName.charAt(0)}${lastName?.charAt(0)}`;
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
