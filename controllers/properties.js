const Property = require('../models/Property');

exports.getProperties = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: 'Show all properties'
  });
};

exports.getProperty = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show property ${req.params.id}`
  });
};

exports.createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({
      success: true,
      data: property
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.updateProperty = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show property ${req.params.id}`
  });
};

exports.deleteProperty = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show property ${req.params.id}`
  });
};
