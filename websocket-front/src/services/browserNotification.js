export const sendNotification = (text = '') => {
  var img = 'https://i0.wp.com/www.zenvia.com/wp-content/uploads/2019/04/icon-chat.png';
  const companyName = 'Teste';
 
  if (!('Notification' in window)) {
    alert('This browser does not support system notifications');
  } else if (Notification.permission === 'granted') {
    new Notification(`Nova mensagem de ${companyName}`, { body: text, icon: img });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        new Notification(`Nova mensagem de ${companyName}`, { body: text, icon: img });
      }
    });
  }
};

export default {
  sendNotification,
};
