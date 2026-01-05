export const debounce = (func: (...args: any[]) => void, delay: number = 500) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: any[]) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };