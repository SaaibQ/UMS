const { catchAsync } = require("./../util/catchAsync.js");
const User = require("./../models/userModel.js");
const AppError = require("../util/appError.js");

exports.getUser = catchAsync(async function (req, res, next) {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) return next(new AppError(`No such user found`, 404));

  res.status(200).json({ status: "Success", data: user });
});

exports.addUser = catchAsync(async function (req, res, next) {
  const user = {
    name: req.body.user_name,
    email: req.body.user_email,
    gender: req.body.gender,
    status: req.body.status,
  };
  if (!user.name || !user.email || !user.gender || !user.status) {
    throw new AppError("Please do fill all the fields", 400);
  }

  const addedUser = await User.create(user);
  res.status(201).json({ status: "Success", data: addedUser });
});

exports.getUsers = catchAsync(async function (req, res, next) {
  const users = await User.find({});
  res
    .status(200)
    .json({ status: "Success", length: users.length, data: { users } });
});

exports.updateUser = catchAsync(async function (req, res, next) {
  const user_id = req.params.id;
  const updatedFields = {
    name: req.body.user_name.toLowerCase(),
    email: req.body.user_email.toLowerCase(),
    gender: req.body.gender.toLowerCase(),
    status: req.body.status.toLowerCase(),
  };
  const updatedUser = await User.findByIdAndUpdate(user_id, updatedFields, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new AppError(`No such user found`, 404));

  res.status(201).json({ status: "Success", updatedUser });
});

exports.deleteUser = catchAsync(async function (req, res, next) {
  const user_id = req.params.id;
  console.log(user_id);

  const deletedUser = await User.findByIdAndDelete(user_id);
  res.status(204).json({ status: "Success" });
});
