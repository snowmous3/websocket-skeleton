const { messages } = require('../models');

module.exports = class MessageController {
  async create(body) {
    try {
      const { name, email, input, first } = body;
      const t = await messages.create({ name, email, input, first });
      console.log('te', t)
      return 'success';
    } catch (error) {
      console.log('error', error)
      return error;
    }
  }
};
