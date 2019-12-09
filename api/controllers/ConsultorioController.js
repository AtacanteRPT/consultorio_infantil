/**
 * Consultorio
 *
 * @description :: Server-side logic for managing Consultorio
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Consultorio.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Consultorio.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Consultorio.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Consultorio.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('consultorio/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Consultorio.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/consultorio');
        });
    },

};

// insert into `persona` (`alergia`, `cedula`, `celular`, `createdAt`, `direccion`, `expedido`, `fechaNacimiento`, `id`, `identificacion`, `img`, `materno`, `nombre`, `paterno`, `rol`, `sexo`, `telefono`, `updatedAt`) values 
// (NULL,NULL, NULL, 1574886102767, NULL, NULL, NULL, 1, '7489343', NULL, NULL, 'Ricarso', '', 'admin', NULL, NULL, 1574886102767), 
// (NULL, '123456', NULL, 1574886191591, NULL, NULL, '1960-04-05T04:00:00.000Z', 2, '123456', NULL, 'admin', 'admin', 'admin', 'medico', NULL, NULL, 1574970334306),
// (NULL, '7047052', NULL, 1574886298320, NULL, NULL, '2016-03-04T04:00:00.000Z', 3, '7047052', NULL, 'Toro', 'Oso', 'Pato', 'paciente', 'M', NULL, 1574886298320), 
// (NULL, '6546546', NULL, 1574887181477, NULL, NULL, '2018-03-04T04:00:00.000Z', 4, '6546546', NULL, 'Tarro', 'Torito', 'Torrrez', 'paciente', 'M', NULL, 1574887181477),
// (NULL, '435345', NULL, 1574887221463, NULL, NULL,'2017-02-03T04:00:00.000Z', 5, '435345', NULL, 'Cangrejo', 'Juana', 'Pato', 'paciente', 'F', NULL, 1574887221463),
// (NULL, '435345', NULL, 1574887222243, NULL, NULL, '2017-02-03T04:00:00.000Z', 6, '435345', NULL, 'Cangrejo', 'Juana', 'Pato', 'paciente', 'F', NULL, 1574887222243),
// (NULL, '123456789', NULL, 1574899099896, NULL, NULL, '1980-03-04T04:00:00.000Z', 7, '123456789', NULL, 'Cuadrados ', 'Esponja Bob', 'Pantalones', 'medico',NULL, NULL, 1574899099896),
// (NULL, '564563', NULL, 1574899158657, NULL, NULL,'2017-02-03T04:00:00.000Z', 8, '564563', NULL, 'Zorro', 'Brito', 'Condor', 'paciente', 'M', NULL, 1574899158657),
// (NULL, '3430468', NULL, 1575311889226, NULL, NULL, '2017-10-06T04:00:00.000Z', 9, '3430468', NULL, 'Quispe', 'Andrea', 'Lopez', 'paciente', 'F', NULL, 1575311889226),
// (NULL, '56456546', NULL, 1575751869628, NULL, NULL, '2019-04-25T04:00:00.000Z', 10, '56456546', NULL, 'Hormiga', 'Tigre', 'Sapo', 'paciente', 'M', NULL,1575751869628),
// (NULL, '5978521', NULL, 1575906524072, NULL, NULL, '2017-10-26T04:00:00.000Z', 11, '5978521', NULL, 'Alanoca', 'Rodolfo', 'Lopez', 'paciente', 'M', NULL, 1575906602420),
// (NULL, '4905924', NULL, 1575907218861, NULL, NULL, '1997-10-09T04:00:00.000Z', 12, '4905924', NULL, 'Irahola','Dayana', 'Bustos', 'medico', NULL, NULL, 1575907218861),
// (NULL, '49055875', NULL, 1575909715268, NULL, NULL, '2015-10-09T04:00:00.000Z', 13, '49055875', NULL, 'Irahola', 'Sandra', 'Bustos', 'paciente', 'F', NULL, 1575909715268);