const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function getById(id, req) {
  const property = await db.Property.findOne({
    where: {
      id,
      seller_id: req.user.id, // Ensure the property belongs to the logged-in user
    },
    include: [{ model: db.Image, attributes: ['id', 'name', 'url'] }],
  });

  if (!property) {
    throw new NotFoundError(
      'Property not found or you do not have permission to view it'
    );
  }

  return property;
}

module.exports = { getById };
