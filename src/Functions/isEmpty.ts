// this function determines if an array or object is empty
const isEmpty = (obj: any) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};

export default isEmpty;
