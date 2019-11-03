const emptySpace = value => {
  if (value) {
    return value.replace(/\s/g, '');
  } else {
    console.info('emptySpace 出错了，value 没有值');
  }
};

module.exports = {
  emptySpace,
};
