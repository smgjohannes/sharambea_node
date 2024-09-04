const db = require('../../models');

async function create(data, req, files) {
  let createdInterestedBuyers = await db.InterestedBuyers.create(data);

  if (files) {
    await this.image.upload(
      req,
      'InterestedBuyers',
      createdInterestedBuyers.id,
      files
    );
  }

  return createdInterestedBuyers;
}

module.exports = { create };
