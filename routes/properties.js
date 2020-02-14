const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesInRadius
} = require('../controllers/properties');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router.route('/radius/:zipcode/:distance').get(getPropertiesInRadius);

router
  .route('/')
  .get(getProperties)
  .post(protect, createProperty);
router
  .route('/:id')
  .get(getProperty)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

module.exports = router;
