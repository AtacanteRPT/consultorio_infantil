/**
 * Paciente
 *
 * @description :: Server-side logic for managing Paciente
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Paciente.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list,
                layout:'layouts/layout_medico'
            });
        });
    },

    show: function(req, res, next) {
        Paciente.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value,
                layout:'layouts/layout_medico'
            });
        });
    },

    edit: function(req, res, next) {
        Paciente.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value,
                layout:'layouts/layout_medico'
            });
        });
    },

    update: function(req, res, next) {
        Paciente.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('paciente/show/' + req.param('id'));
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