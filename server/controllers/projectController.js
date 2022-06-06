import log from '../config/winston';

// Lista los proyectos
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Listando proyectos 🚧');
  // TODO: Agregar codigo de listado de proyectos
};

// Agrega ideas de proyectos
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agregar proyectos
};

// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
const addPost = (req, res) => {
  const { errorData } = req;
  // Crear view models para estea action method
  let project = {};
  let errorModel = {};
  if (errorData) {
    log.info('Se retorna objeto de error de validacion');
    // Rescatando el objeto validado
    project = errorData.value;
    // Usamos reduces para generar un objeto
    // de errores a partir de  inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una variable temporal para evitar
      // el error "no-param-reassign" el cual me
      // exorta a evitar reasignar los valores de
      // los argumentos una funcion
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
    // La validacion fallo
    // res.status(200).json(errorData);
  } else {
    log.info('Se retorna objeto Projecto valido');
    // Desestructurando la informacion
    // del formulario
    const { validData } = req;
    // Regresar un objeto con los datos
    // obtenidos del formulario
    // res.status(200).json(project);
    project = validData;
  }
  // Respondemos con los viewModels generados
  res.render('projects/addProjectView', { project, errorModel });
  // res.status(200).json({ project, errorModel });
};
// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
