const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function getByIdPublic(id) {
  const property = await db.Property.findByPk(id, {
    include: [
      // { model: db.User, as: 'seller' },
      // { model: db.User, as: 'buyer' },
      { model: db.Image, attributes: ['id', 'name', 'url'] },
    ],
  });

  if (!property) {
    throw new NotFoundError(`Property not found`);
  }

  return property;
}

module.exports = { getByIdPublic };
