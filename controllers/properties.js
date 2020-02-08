const Property = require('../models/Property');

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(400).json({
        success: false
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
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

exports.updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!property) {
      res.status(400).json({
        success: false
      });
    }
    res.status(200).json({
      success: true,
      data: property
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(400).json({
        success: false
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};
