const express = require('express');

const UserController = require('./controllers/userController');
const MemberController = require('./controllers/memberController');
const PaymentController = require('./controllers/paymentController');
const MailController = require('./controllers/mailController');
const ImageController = require('./controllers/imageController');
const RequestController = require('./controllers/requestController');
const PropertyController = require('./controllers/propertyController');
const InterestedBuyerController = require('./controllers/interesterdBuyerContoller');
const NotificationController = require('./controllers/notificationController'); // Import NotificationController

// validators
const userValidation = require('./validations/userValidation');
const memberValidation = require('./validations/memberValidation');
const paymentValidation = require('./validations/paymentValidation');
const mailValidation = require('./validations/mailValidation');
const propertyValidation = require('./validations/propertyValidation');
const requestValidator = require('./validations/requestValidation ');
// Middleware with dependence
const AuthMiddleware = require('./middleware/authMiddleware');
const CorsMiddleware = require('./middleware/corsMiddleware');

// Simple middleware
const adminMiddleware = require('./middleware/adminMiddleware');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');

const upload = require('../utils/multer');

function getRoutes(app) {
  const userController = UserController(app);
  const memberController = MemberController(app);
  const paymentController = PaymentController(app);
  const mailController = MailController(app);
  const imageController = ImageController(app);
  const requestController = RequestController(app);
  const propertyController = PropertyController(app);
  const interestedBuyerController = InterestedBuyerController(app);
  const notificationController = NotificationController(app); // Initialize NotificationController

  const router = express.Router();

  // enable cross-origin requests
  router.use(CorsMiddleware);

  const authMiddleware = AuthMiddleware('post:write', app);

  // EMAIL
  router.post(
    '/contact-us/send-mail',
    mailValidation.sendSchema,
    mailController.send
  );

  // AUTH
  router.post(
    '/login',
    rateLimitMiddleware,
    userValidation.loginSchema,
    userController.login
  );
  router
    .route('/users/:id')
    .get(userController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      userValidation.updateUserSchema,
      userController.update
    );

  // MEMBERS
  router
    .route('/members')
    .get(memberController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.createSchema,
      memberController.create
    );

  router
    .route('/members/:id')
    .get(memberController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.updateSchema,
      memberController.update
    )
    .delete(authMiddleware, memberController.destroy);

  // REQUESTS
  router.route('/requests').get(requestController.get).post(
    upload.manyFiles(),

    requestController.create
  );

  router
    .route('/requests/:id')
    .get(requestController.getById)
    .patch(authMiddleware, upload.manyFiles(), requestController.update)
    .delete(authMiddleware, requestController.destroy);

  // IMAGE ROUTES
  router.post(
    '/images/:entity_id',
    authMiddleware,
    upload.manyFiles(),
    imageController.upload
  );

  router.delete('/images/:id', authMiddleware, imageController.destroy);

  // PAYMENTS
  router.get('/payments/stats', authMiddleware, paymentController.stats);

  router
    .route('/payments')
    .get(paymentController.get)
    .post(
      authMiddleware,
      paymentValidation.createSchema,
      paymentController.create
    );

  router
    .route('/payments/:id')
    .get(paymentController.getById)
    .patch(
      authMiddleware,
      paymentValidation.updateSchema,
      paymentController.update
    )
    .delete(authMiddleware, paymentController.destroy);

  // USERS
  router.get('/users', authMiddleware, adminMiddleware, userController.get);
  router
    .route('/users/:id')
    .get(authMiddleware, adminMiddleware, userController.getById)
    .patch(
      authMiddleware,
      adminMiddleware,
      userValidation.updateUserSchema,
      userController.update
    );

  // CURRENT USER
  router.post(
    '/me/update-password',
    authMiddleware,
    userValidation.updatePasswordSchema,
    userController.updatePassword
  );

  router
    .route('/me')
    .get(authMiddleware, userController.getMe)
    .patch(
      authMiddleware,
      userValidation.updateUserSchema,
      userController.updateMe
    );

  // PROPERTY ROUTES
  router
    .route('/properties')
    .get(authMiddleware, propertyController.getAll)
    .post(
      authMiddleware,
      upload.manyFiles(),
      propertyValidation.createSchema,
      propertyController.create
    );
  router.route('/properties/public').get(propertyController.getAllPublic);
  router.route('/properties/public/:id').get(propertyController.getByIdPublic);
  router
    .route('/properties/:id')
    .get(authMiddleware, propertyController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      propertyValidation.updateSchema,
      propertyController.update
    )
    .delete(authMiddleware, propertyController.destroy);

  // properties ROUTES
  router.get('/properties/stats', authMiddleware, propertyController.stats);

  // InterestedBuyers ROUTES
  router
    .route('/interestedBuyer')
    .get(authMiddleware, interestedBuyerController.get)
    .post(
      upload.manyFiles(),

      interestedBuyerController.create
    );

  router
    .route('/interestedBuyer/:id')
    .get(authMiddleware, interestedBuyerController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),

      interestedBuyerController.update
    )
    .delete(authMiddleware, interestedBuyerController.destroy);

  // NOTIFICATIONS ROUTES
  router
    .route('/notifications')
    .get(authMiddleware, notificationController.get)
    .post(authMiddleware, notificationController.create);

  router
    .route('/notifications/:id')
    .patch(authMiddleware, notificationController.update)
    .delete(authMiddleware, notificationController.destroy);

  return router;
}

module.exports = getRoutes;
