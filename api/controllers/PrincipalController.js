/**
 * Pet
 *
 * @description :: Server-side logic for managing Pet
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  index: function (req, res, next) {
    // Empresa.find({idUsuario:req.user.id}).exec(function (err, listEmpresas) {
    //   if (err) return Error('Error');

    //   return res.view("pages/principal",{empresas : listEmpresas})
    // });
  // return res.view('pages/principal',{empresas:[]})

  if(req.user.rol=='medico'){
    return res.view('pages/homepage',{layout:'layouts/layout_medico'})

  }
  if(req.user.rol=='admin'){
    return res.view('pages/principal')

  }
    // return res.view('pages/principal')
    // return res.redirect('/medico/index')
  },

  

};
