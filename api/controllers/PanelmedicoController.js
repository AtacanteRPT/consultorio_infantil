/**
 * Pet
 *
 * @description :: Server-side logic for managing Pet
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function (req, res, next) {
        Paciente.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view('paciente/index',{
                result: list,
                layout:'layouts/layout_medico'
            });
        });
    },
    adicionarevision: function(req,res){


        Revision_medica.create({})
        sails.log("Revision Medica", req.body)
        res.send('Nada')
    }
  
    
  
  };
  