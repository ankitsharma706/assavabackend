// const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const Coffee = require("./../models/coffeeModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-discount,price";
  req.query.fields = "name,price,discount,description";
  next();
};

exports.getAllCoffee = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Coffee.find(), req.query)
    .filter()
    .sorting()
    .limitFields()
    .paginate();
  const Coffees = await features.query;

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: Coffees.length,
    data: {
      Coffees,
    },
  });
});
exports.getCoffee = catchAsync(async (req, res, next) => {
  const coffees = await Coffee.findById(req.params.id);
  if (!coffees) {
    return next(new AppError("No coffees found with that ID ", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      coffees,
    },
  });
});
exports.createCoffee = catchAsync(async (req, res, next) => {
  const newCoffee = await Coffee.create(req.body);
  res.status(201).json({
    status: "success",
    data: { coffee: newCoffee },
  });
});
exports.updateCoffee = catchAsync(async (req, res, next) => {
  const coffees = await Coffee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!coffees) {
    return next(new AppError("No coffees found with that ID ", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      coffees,
    },
  });
});
exports.deleteCoffee = catchAsync(async (req, res, next) => {
  const coffee = await Coffee.findByIdAndDelete(req.params.id);
  if (!coffee) {
    return next(new AppError("No coffees found with that ID ", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getCoffeeStats = catchAsync(async (req, res, next) => {
  const stats = await Coffee.aggregate([
    {
      $match: {
        discountPercentage: { $gte: 10 },
      },
    },
    {
      $group: {
        _id: null,
        avgDiscount: { $avg: "$discountPercentage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPLan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Coffee.aggregate([
    {
      $unwind: "$startdates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        // numCoffeeStarts:
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
