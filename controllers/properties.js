const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Property = require('../models/Property');

exports.getProperties = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt\gte\lt\lte\in)\b/g, match => `$${match}`);

  query = Property.find(JSON.parse(queryStr));

  const properties = await query;
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

// Get properties within wadius /properties/radius/:zipcode/:distance
exports.getPropertiesInRadius = asyncHandler(async (req, res, next) => {
  const {
    zipcode,
    distance
  } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 miles or 6,378 km
  const radius = distance / 3963;

  const properties = await Property.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [lng, lat], radius
        ]
      }
    }
  });
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});
