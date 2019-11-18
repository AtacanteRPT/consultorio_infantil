/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // 'GET /': {
  //   view: 'login/login'
  // },
  'GET /': 'AuthController.loguearse',
  'GET /salir': 'AuthController.salir',


  // 'GET /login': {
  //   view: 'login/login'
  // },
  'POST /login': 'AuthController.login',
  '/logout': 'AuthController.salir',

  // 'GET /principal/index': 'PrincipalController.index',

  'GET /registro': {
    view: 'login/registro'
  },

  'GET /medico/crear': {
    view: 'medico/create'
  },
  'GET /medico/mostrar/:id': 'MedicoController.show',
  'GET /medico/editar/:id': 'MedicoController.edit',
  'GET /medico/eliminar/:id': 'MedicoController.delete',


  'GET /paciente/crear': {
    view: 'paciente/create',locals: {
      layout: 'layouts/layout_medico'
    }
  },
  'GET /paciente/mostrar/:id': 'PacienteController.show',
  'GET /paciente/editar/:id': 'PacienteController.edit',
  'GET /paciente/eliminar/:id': 'PacienteController.delete',

  'GET /paciente/historial/:id': 'PacienteController.historial',




  
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
