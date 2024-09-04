const asyncMiddleware = require('../middleware/asyncMiddleware');

module.exports = function interestedBuyerController(app) {
  /**
   * @api {get} /api/v1/interestedbuyers
   * @apiName get
   * @apiGroup InterestedBuyer
   */
  async function get(req, res) {
    const response = await app.interestedbuyers.get(req.query, req);
    res.json(response);
  }

  /**
   * @api {post} /api/v1/interestedbuyers
   * @apiName create
   * @apiGroup interestedBuyer
   */
  async function create(req, res) {
    const createdInterestedBuyer = await app.interestedbuyers.create(
      req.body,
      req,
      req.files
    );
    res.status(201).json(createdInterestedBuyer);
  }

  /**
   * @api {get} /api/v1/interestedbuyers/:id
   * @apiName getById
   * @apiGroup InterestedBuyer
   */
  async function getById(req, res) {
    const response = await app.interestedbuyers.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/interestedbuyers/:id
   * @apiName update
   * @apiGroup InterestedBuyer
   */
  async function update(req, res) {
    const updatedInterestedBuyer = await interestedbuyers.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedInterestedBuyer);
  }

  /**
   * @api {delete} /api/v1/interestedbuyers/:id
   * @apiName destroy
   * @apiGroup InterestedBuyer
   */
  async function destroy(req, res) {
    const { id } = req.params;
    const deletedInterestedBuyer = await app.interestedbuyers.destroy(id);
    res.status(200).json({ interestedBuyer: deletedInterestedBuyer });
  }

  return Object.freeze({
    getAll: asyncMiddleware(get),
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    destroy: asyncMiddleware(destroy),
  });
};
