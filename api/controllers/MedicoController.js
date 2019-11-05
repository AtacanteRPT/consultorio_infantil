/**
 * Medico
 *
 * @description :: Server-side logic for managing Medico
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


    index: function (req, res, next) {
        Medico.find().populate('idPersona').exec(function (err, list) {
            if (err) return Error('Error');

            sails.log('LISTA', list)
            return res.view({
                result: list
            });
        });
    },

    show: async function (req, res, next) {
        try {

            var value = await Medico.find(req.param('id')).populate('idPersona');
            sails.log('Value Show',value)
            res.view({
                element: value[0]
            });
        } catch (err) {

            return next(err);

        }

    },

    edit: async function (req, res) {
        try {

            var value = await Medico.find(req.param('id')).populate('idPersona');
            sails.log('Value EDIT',value)
            res.view({
                element: value[0]
            });
        } catch (err) {

            return res.serverError(err);

        }
    },

    actualizar: function (req, res) {
        sails.log('Body opara actualizar:', req.body)
        var idMedico = req.param('idMedico');
        var auxLicencia = req.param('licencia')
        Persona.update(req.param('idPer'), req.body, function Update(err, value) {
            if (err) {
                return serverError(err);
            }
            Medico.update(idMedico).set({licencia: auxLicencia}).exec(function (err, datoMedico) {
                if (err) {
                    return serverError(err);
                }
                return res.redirect('/medico/mostrar/' + idMedico);
            });
        });
    },

    delete: function (req, res, next) {
        Medico.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/medico/index');
        });
    },

};