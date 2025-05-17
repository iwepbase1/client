
let handleServerErrorFunction: (() => void) | null = null;

export const setHandleServerError = (fn: () => void) => {
  handleServerErrorFunction = fn;
};

export const handleServerErrors = () => {
  if (handleServerErrorFunction) {
    handleServerErrorFunction();
  }
};