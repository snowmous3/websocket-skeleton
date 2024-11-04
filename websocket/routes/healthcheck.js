const { Router } = require('express');
const { urlencoded, json } = require('body-parser');
const router = new Router({ mergeParams: true });

router.use(urlencoded({ extended: true }));
router.use(json());

/**
 * GET {domain}/healthcheck
 */
router.get('/', (req, res) => {
  res.json('Im here');
});

module.exports = () => {
  return {
    path: '/healthcheck',
    api_version: 1,
    router
  };
};
