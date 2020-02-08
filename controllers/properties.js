const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Property = require('../models/Property');

exports.getProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

exports.getProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: property
  });
});

exports.createProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.create(req.body);
  res.status(201).json({
    success: true,
    data: property
  });
});

exports.updateProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!property) {
    return ext(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: property
  });
});

exports.deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
