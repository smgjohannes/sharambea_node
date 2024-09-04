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

/**
 * @description getAllPublic list of users
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of users.
 * @example
 * const users = await raceresult.user.getAllPublic({
 *  take: 20,
 *  skip: 0
 * });
 */
async function getAllPublic(options) {
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
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_name')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_type')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('town')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
      ],
    };
  }

  const properties = await db.Property.findAll(queryParams);

  const propertiesPlain = properties.map((property) => {
    // we converted the property to plain object
    const propertyPlain = property.get({ plain: true });
    return propertyPlain;
  });

  return propertiesPlain;
}

module.exports = {
  getAllPublic,
};
