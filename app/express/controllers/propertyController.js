const asyncMiddleware = require('../middleware/asyncMiddleware');

module.exports = function propertyController(app) {
  /**
   * @api {get} /api/v1/properties
   * @apiName getAll
   * @apiGroup Property
   *
   */
  async function get(req, res) {
    const response = await app.properties.get(req.query, req);
    res.json(response);
  }
  async function getAllPublic(req, res) {
    const response = await app.properties.getAllPublic(req.query, req);
    res.json(response);
  }

  /**
   * @api {post} /api/v1/properties
   * @apiName create
   * @apiGroup Property
   *
   */
  async function create(req, res) {
    const createdProperty = await app.properties.create(
      req.body,
      req,
      req.files
    );
    res.status(201).json(createdProperty);
  }

  /**
   * @api {put} /api/v1/properties/:id
   * @apiName update
   * @apiGroup Property
   *
   */
  async function update(req, res) {
    const updatedProperty = await app.properties.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedProperty);
  }

  /**
   * @api {get} /api/v1/properties/:id
   * @apiName getById
   * @apiGroup Property
   *
   */
  async function getById(req, res) {
    const response = await app.properties.getById(req.params.id, req);
    res.json(response);
  }
  async function getByIdPublic(req, res) {
    const response = await app.properties.getByIdPublic(req.params.id, req);
    res.json(response);
  }
  /**
   * @api {stats} /api/v1/properties/stats
   * @apiName stats
   * @apiGroup Result
   *
   */
  async function stats(req, res) {
    const response = await app.properties.stats(req);
    res.status(200).json(response);
  }

  /**
   * @api {delete} /api/v1/properties/:id
   * @apiName destroy
   * @apiGroup Property
   *
   */
  async function destroy(req, res) {
    const deletedProperty = await app.properties.destroy(req.params.id, req);
    res.status(200).json({ property: deletedProperty });
  }

  return Object.freeze({
    getAll: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    stats: asyncMiddleware(stats),
    getAllPublic: asyncMiddleware(getAllPublic),
    getByIdPublic: asyncMiddleware(getByIdPublic),
    destroy: asyncMiddleware(destroy),
  });
};
