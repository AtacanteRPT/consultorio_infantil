/**
 * Persona
 *
 * @description :: Server-side logic for managing Persona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    crear: function(req, res, next) {
        
        sails.log("BODY", req.body)

        var nuevaPersona = {
                identificacion: req.param('cedula'),
                nombre: req.param('nombre'),
                paterno: req.param('paterno'),
                materno: req.param('materno'),
                telefono: req.param('telefono'),
                fechaNacimiento: req.param('fechaNacimiento'),
                cedula: req.param('cedula'),
                expedido: req.param('expedido'),
                sexo: req.param('sexo'),
                rol: req.param('rol'),
            }
        var rol = req.param('rol')
            // sails.log("NUEVA PERSONA", nuevaPersona)
        var idMedico = req.param('idMedico');
        var idAux = req.user.idPersona.id;
        Persona.create(nuevaPersona).fetch().exec(function(err, datoPersona) {
            if (err) {
                return res.serverError(err)
            };

            sails.log("CONTROLLER PERSONA  PERSONA : ", datoPersona);
            console.log('ID meedico : ' + idAux)
            switch (rol) {
                case 'paciente':
                    Paciente.create({
                        idPersona: datoPersona.id
                    }).fetch().exec(function(err, datoPaciente) {

                        sails.log('Dato Paciente',datoPaciente)
                        if (err) {
                            return res.serverError(err);
                        }
                        Medico.findOne({idPersona:idAux}).exec(function(error,datoMedico){
                            sails.log('Dato Medico',datoMedico)
                            Control_revision.create({
                                idPaciente: datoPaciente.id,
                                idMedico: datoMedico.id,
                                idConsultorio:1
                            }).exec((error,datoControl)=>{
                                res.redirect('/paciente/index');
                            })
                        });
                        
                        // usuario = {

                        //     username: datoPersona.id + datoPersona.nombre,
                        //     password: datoPersona.id + datoPersona.nombre,
                        //     codigo_qr: datoPersona.nombre + " " + datoPersona.paterno + " " + datoPersona.materno,
                        //     rol: rol,
                        //     idPersona: datoPersona.id
                        // }

                        // Usuario.create(usuario).exec(function(err, creado) {
                        //     if (err) {
                        //         return res.serverError(err);
                        //     }
                        //     res.redirect('/medico/index');
                        // })

                    })
                    break;
                case 'medico':
                    Medico.create({
                        idPersona: datoPersona.id
                    }).exec(function(err, creado) {
                        if (err) {
                            return res.serverError(err);
                        }
                        usuario = {

                            username: datoPersona.cedula,
                            password: datoPersona.cedula,
                            rol: rol,
                            idPersona: datoPersona.id
                        }

                        Usuario.create(usuario).exec(function(err, creado) {
                            if (err) {
                                return res.serverError(err);
                            }
                            res.redirect('/medico/index');
                        })
                    })
                    break;
                case 'tutor':
                    Tutor.create({
                        idPersona: datoPersona.id
                    }).exec(function(err, creado) {
                        if (err) {
                            return res.serverError(err);
                        }

                        usuario = {

                            username: datoPersona.id + datoPersona.nombre,
                            password: datoPersona.id + datoPersona.nombre,
                            codigo_qr: datoPersona.nombre + " " + datoPersona.paterno + " " + datoPersona.materno,
                            rol: rol,
                            idPersona: datoPersona.id
                        }

                        Usuario.create(usuario).exec(function(err, creado) {
                            if (err) {
                                return res.serverError(err);
                            }
                            res.redirect('/medico/index');
                        })
                    })
                    break;
                default:
                    res.send({
                        mensaje: "no fue asignado ningun rol"
                    })
                    break;
            }

        });

    },

    show: function(req, res, next) {
        Persona.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Persona.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Persona.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('persona/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Persona.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/persona');
        });
    },

};