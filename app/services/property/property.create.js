const db = require('../../models');

async function create(payload, req, files) {
  //payload contains seller_id
  let createdProperty = await db.Property.create({
    ...payload,
    seller_id: req.user.id, // the seller is the logged-in user
  });

  // Handle image upload
  await this.image.upload(req, 'Property', createdProperty.id, files);

  return createdProperty;
}

module.exports = { create };
