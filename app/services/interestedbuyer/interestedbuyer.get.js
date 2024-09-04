const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'name',
    'email',
    'phone',
    'message',
    'seller_id',
    'viewing_date_time',
    'interested',
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
        model: db.Property,
        attributes: ['id', 'name', 'price'],
        where: {
          seller_id: req.user.id, // Ensure the logged-in user is the owner of the property
        },
        include: [
          {
            model: db.Image,
            attributes: ['id', 'name', 'url'],
          },
        ],
      },
    ],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where[Op.or] = [
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('phone')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
    ];
  }

  const interestedBuyers = await db.InterestedBuyers.findAll(queryParams);

  const interestedBuyersPlain = interestedBuyers.map((interestedBuyer) => {
    return interestedBuyer.get({ plain: true });
  });

  return interestedBuyersPlain;
}

module.exports = {
  get,
};
