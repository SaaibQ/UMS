exports.catchAsync = function (fn) {
  return async (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
