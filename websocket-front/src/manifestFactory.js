const fillManifest = () => {
  const dynamicManifest = {
    short_name: 'WebChat',
    name: 'WebChat',
    icons: [
      {
        src: 'https://i0.wp.com/www.zenvia.com/wp-content/uploads/2019/04/icon-chat.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: 'https://cdn4.iconfinder.com/data/icons/budicon-communication-3/25/web-chat-512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    display: 'standalone',
    theme_color: '#4156ec',
    background_color: '#ffffff'
  };

  const stringManifest = JSON.stringify(dynamicManifest);
  const blob = new Blob([stringManifest], { type: 'application/json' });
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector('#manifest-placeholder').setAttribute('href', manifestURL);
};

fillManifest();
