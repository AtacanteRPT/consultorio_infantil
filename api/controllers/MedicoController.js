/**
 * Medico
 *
 * @description :: Server-side logic for managing Medico
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


    index: function(req, res, next) {
        Medico.find().populate('idPersona').exec(function(err, list) {
            if (err) return Error('Error');

            sails.log(list)
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Medico.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Medico.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Medico.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('medico/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Medico.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/medico');
        });
    },

};