const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'property_name',
    'name',
    'seller_id',
    'buyer_id',
    'house_number',
    'street_name',
    'suburb',
    'town',
    'region',
    'property_type',
    'bedrooms',
    'price',
    'property_description',
    'kitchens',
    'toilets',
    'dinning_rooms',
    'bathrooms',
    'sitting_rooms',
    'area_measurement',
    'outside_flat',
    'monthly_rates',
    'monthly_levy',
    'category',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

async function get(options, req) {
  // Ensure that req.user is defined
  if (!req.user || !req.user.id) {
    throw new Error('User is not authenticated or user ID is missing');
  }

  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url'],
      },
    ],
    where: {
      seller_id: req.user.id, // Only get properties belonging to the logged-in user
    },
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where[Op.or] = [
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_name')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_type')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('town')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
    ];
  }

  const properties = await db.Property.findAll(queryParams);

  const propertiesPlain = properties.map((property) => {
    return property.get({ plain: true });
  });

  return propertiesPlain;
}

module.exports = {
  get,
};
