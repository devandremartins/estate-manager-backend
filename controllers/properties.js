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

exports.createProperty = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: 'Create property'
  });
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
