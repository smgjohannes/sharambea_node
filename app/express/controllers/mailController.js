const asyncMiddleware = require('../middleware/asyncMiddleware');
const Email = require('../../utils/email');

module.exports = function MainController(app) {
  /**
   * @api {post} /api/v1/mail/send
   * @apiName send
   * @apiGroup mail
   *
   */
  async function send(req, res) {
    const { from_name, from_email, subject, message } = req.body;
    const to_email = 'sharambe@sharambeaprop.com';
    const to_name = 'chelsea';

    const response = await new Email(
      to_email,
      `${subject} <${from_email} ${from_name}>`,
      message,
      {
        name: to_name,
      }
    ).sendEmail('default');

    res.json(response);
  }

  return Object.freeze({
    send: asyncMiddleware(send),
  });
};
