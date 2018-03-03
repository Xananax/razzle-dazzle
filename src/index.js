import express_app from './server';
import http from 'http';

const server = http.createServer(express_app);

let currentApp = express_app;

server.listen( process.env.PORT || 3000, ( error ) => {
  if (error){
    console.log(error)
    return
  }
  
  console.log('🚀 started')
});

if (module.hot) {
  
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
