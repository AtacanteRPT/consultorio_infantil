/**
 * Paciente
 *
 * @description :: Server-side logic for managing Paciente
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    
    index: function(req, res, next) {
        Paciente.find().populate('idPersona').exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list,
                layout:'layouts/layout_medico'
            });
        });
    },

    show: async function(req, res, next) {
        try {

            var value = await Paciente.find(req.param('id')).populate('idPersona');
            sails.log('Value Show',value)
            res.view({
                element: value[0],
                layout:'layouts/layout_medico'
            });
        } catch (err) {

            return next(err);

        }
    },

    edit: async function(req, res, next) {
        try {

            var value = await Paciente.find(req.param('id')).populate('idPersona');
            sails.log('Value Show',value)
            res.view({
                element: value[0],
                layout:'layouts/layout_medico'
            });
        } catch (err) {

            return next(err);

        }
    },

    actualizar: function(req, res, next) {
        sails.log('Body opara actualizar:', req.body)
        var idPaciente = req.param('idPaciente');
        // var auxLicencia = req.param('licencia')
        Persona.update(req.param('idPer'), req.body, function Update(err, value) {
            if (err) {
                return serverError(err);
            }
            return res.redirect('/paciente/mostrar/' + idPaciente);
        });
    },

    delete: function(req, res, next) {
        Paciente.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/paciente');
        });
    },

};