const ran = {};
export const runOnce = (fn, options = {}) => {
  const name = options?.name || fn.name;
  if (!ran[name]) {
    ran[name] = 1;
    fn();
  }
};