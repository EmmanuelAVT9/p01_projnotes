//Preámbulos Ayuda a manejar errores http
// Ayuda a manejar errores http
import createError from 'http-errors';
//Ayuda a crear seridores web
import express from 'express';
// nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// ayuda al manejo de cookies
import cookieParser from 'cookie-parser';
//maneja el log de peticiones http
import logger from 'morgan';

// las rutass
//var indexRouter = require ('./routes/index');
import indexRouter from './routes/index';
//var usersRouter = require ('./routes/users');
import usersRouter from './routes/users';
//var aboutRouter = require ('./routes/about');
import aboutRouter from'./routes/about';

// Importando modulos de webpack
// Nucleo de webpack
import webpack from 'webpack';
// Permite incrustar webpack en express
import WebpackDevMiddleware from 'webpack-dev-middleware';
// Permite la actualización dinamica de la página
import WebpackHotMiddleware from "webpack-hot-middleware";
// Configuración
import webpackConfig from '../webpack.dev.config';

// Aqui se crea la instancia de express
// (req, res, next) => {... }
const app = express();

// Recuperar el modo de ejecución
const nodeEnv = process.env.NODE_ENV || 'development';

// Decidiendo si embebemos el webpack middleware
if (nodeEnv === 'development') {
  // Embebiendo webpack a mi aplicación
  console.log(`✍ Ejecutando en modo desarrollo 🤱👶`);

  // Establiendo el modo de webpack en desarrollo
  // en el configurador
  webpackConfig.mode = "development";

  // Configurando la ruta del HMR (Hot Module Replacemnet)
  // reload=true : Habilita la recarga automatica cuando un archivo Js camboa
  // timeout=1000 : Tiempo de refresco de pagina
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry,
  ];
  // Agregando el plugin a la configuración de desarrollo
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Creando el empaqetador a partir de un objeto de configuración
  const bundler = webpack(webpackConfig);

  // Habilitando el Middleware de webpack en express
  app.use(WebpackDevMiddleware(bundler, {
    publicPath: webpackConfig.output.publicPath
  }));

  // Habilitando el Middleware del Webpack HMR
  app.use(WebpackHotMiddleware(bundler));

} else {
  console.log(`✍ Ejecutando en modo producción ⚙⚙`);
}

//Configuración del motor de plantilla (template Engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Middleware de archivos estáticos
app.use(express.static(path.join(__dirname, "..",'public')));

//Registrando las rutas en la APP
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

//ctrl + k + c  ---------Sirve para comenatr en bloque
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Exportando instancia de app usando JS Moderno
export default app;
