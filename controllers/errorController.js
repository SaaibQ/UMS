module.exports = async function (err, req, res, next) {
  console.log("Global Middleware");
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  res.status(err.statusCode).json({ message: err.message, err });
};
