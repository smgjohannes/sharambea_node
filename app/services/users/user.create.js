const db = require('../../models');

async function create(payload, req, files) {
  // Ensure that only admins or specific roles can create users
  if (!req.user || req.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  let createdUser = await db.User.create(payload);
  await this.image.upload(req, 'User', createdUser.id, files);
  return createdUser;
}

module.exports = { create };
