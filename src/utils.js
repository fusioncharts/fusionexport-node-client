function stringifyWithFunctions(object) {
  return JSON.stringify(object, (key, val) => {
    if (typeof val === 'function') {
      return val.toString().replace(/\n/g, ' ');
    }
    return val;
  });
}


module.exports = {
  stringifyWithFunctions,
};
