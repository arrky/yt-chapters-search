function hasDash(str) {
  const dashRegExp = /-/;
  return dashRegExp.test(str);
}

function hasTimestamp(str) {
  const timestampRegExp = /^\d+(:\d+)+/;
  return timestampRegExp.test(str);
}

export {
  hasDash,
  hasTimestamp
};
