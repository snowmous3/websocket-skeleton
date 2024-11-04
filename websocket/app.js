
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const server = require('http').Server(app);
const socket = require('./socket');

function loadRoutes(dir, application) {
  fs.readdirSync(dir).map((fname) => {
    const resolvedPath = path.resolve(dir, fname);
    const isDirectory = fs.statSync(resolvedPath).isDirectory();
    if (isDirectory) {
      loadRoutes(application, resolvedPath);
    } else if (/\.js$/.test(fname)) {
      const routeModule = require(`${dir}/${fname}`);
      const route = routeModule(application);
      if (route !== undefined) {
        application.use(route.path, route.router);
      }
      return route;
    }
    return false;
  });

  application.use(bodyParser.urlencoded({ extended: true }));
  application.use(bodyParser.json());
}

app.use(cors());

socket(server);
server.listen(process.env.PORT);
console.log(`I'm up on port ${process.env.PORT}`);

loadRoutes('./routes', app);
