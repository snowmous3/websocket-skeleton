const MessageController = require('../app/controller/messages');
const io = require('../socket');

async function handler(client) {
  client.on('toServer', async (data) => {
    console.log('data', data)
    const { name = 'null', email = 'null' } = data;
    let { input } = data;
    let enter = false;

    if (data.firstConnect) {
      enter = true;
      input = `Usuário ${name} entrou`;
    }

    client.emit('toClient', { content: { input, user: name, enter }, type: 'message' });
    client.broadcast.emit('toClient', { content: { input, user: name, enter }, type: 'message' });
  });
}

module.exports = () => {
  io().on('connection', handler);
};
