const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });
const Message = require('../app/models/messages');

router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * POST {domain}/
 */
router.get('/', /** MIDDLEWARE TO VALIDATE OR AI */ async (req, res, next) => {
  const lastMessages = await Message.findAll({ limit: 30, order: [['createdAt', 'DESC']] });
  res.json(lastMessages);
});

module.exports = () => {
  return {
    path: '/messages',
    api_version: 1,
    router
  };
};
