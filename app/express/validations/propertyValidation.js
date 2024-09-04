const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    property_name: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    area_measurement: Joi.number().optional(),
    outside_flat: Joi.string().optional(),
    monthly_rates: Joi.number().optional(),
    monthly_levy: Joi.number().optional(),
    bedrooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    kitchens: Joi.number().optional(),
    dinningrooms: Joi.number().optional(),
    property_description: Joi.string().optional(),
    category: Joi.string()
      .valid(
        'house',
        'apartment/flat',
        'farm',
        'vacant land/plot',
        'townhouse',
        'industrial property',
        'comercial property'
      )
      .optional(),

    image: Joi.any().optional(),
    // Additional fields from the form
    property_type: Joi.string().valid('rent', 'buy', 'sell').required(),
    property_status: Joi.string().optional(),
    ownership: Joi.string().optional(),
    latitude: Joi.string().optional(),
    longitude: Joi.string().optional(),
    roofType: Joi.string().optional(),
    floor_cover: Joi.string().optional(),
    window_type: Joi.string().optional(),
    braai: Joi.string().optional(),
    swimming_pool: Joi.string().optional(),
    garden: Joi.string().optional(),
    garage: Joi.string().optional(),
    carports: Joi.number().optional(),
    ready_to_occupy: Joi.string().optional(),
    house_number: Joi.number().optional(),
    street_name: Joi.string().optional(),
    suburb: Joi.string().optional(),
    town: Joi.string().optional(),
    additionalImages: Joi.any().optional(), // Accept multiple images
  });

  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    property_name: Joi.string().optional(),
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    area_measurement: Joi.number().optional(),
    bedrooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    kitchens: Joi.number().optional(),
    dinningrooms: Joi.number().optional(),
    outside_flat: Joi.string().optional(),
    monthly_rates: Joi.number().optional(),
    monthly_levy: Joi.number().optional(),
    property_description: Joi.string().optional(),
    category: Joi.string()
      .valid(
        'house',
        'apartment/flat',
        'farm',
        'vacant land/plot',
        'townhouse',
        'industrial property',
        'comercial property'
      )
      .optional(),
    image: Joi.any().optional(),
    // Additional fields from the form
    property_type: Joi.string().valid('rent', 'buy', 'sell').optional(),
    property_status: Joi.string().optional(),
    ownership: Joi.string().optional(),
    latitude: Joi.string().optional(),
    longitude: Joi.string().optional(),
    roofType: Joi.string().optional(),
    floor_cover: Joi.string().optional(),
    window_type: Joi.string().optional(),
    braai: Joi.string().optional(),
    swimming_pool: Joi.string().optional(),
    garden: Joi.string().optional(),
    garage: Joi.string().optional(),
    carports: Joi.number().optional(),
    ready_to_occupy: Joi.string().optional(),
    additionalImages: Joi.any().optional(),
    house_number: Joi.number().optional(),
    street_name: Joi.string().optional(),
    suburb: Joi.string().optional(),
    town: Joi.string().optional(),
  });

  validateRequest(req, next, schema);
};
