#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '@s/app';
//Modernizando el script
//var debug = require('debug')('p01-projnotes:server');
import Debug from 'debug';
//var http = require('http');
import http from "http";

//Creando una instancia de debugger
const debug = Debug ("p01-projnotes:server")
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
//app es una instancia de ExpressJs [ NODE ]
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app); // (req, res, next, err) 
//=> {}      "app es u gran callback"

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);  //Se pone al server a escuchar
// Se registran evento
//si hubiera un error entonces ejecuta un erro
//si se ejecuta el evento listenign entonces escucha
//onError es un Event
server.on('error', onError);//en caso de error
server.on('listening', onListening); //

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr} `
    : `port ${addr.port}` ;
  debug(`Listening on ${bind}`);
  console.log(`✍ Servidor escuchando 🤖.. en ${app.get("port")}`);
}
