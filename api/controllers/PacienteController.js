/**
 * Paciente
 *
 * @description :: Server-side logic for managing Paciente
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 var tabla =[

    {
        anualidades:5,
        meses:6,
        bajoPeso:12.7,
        sobrePeso:16.9,
        obesidad:19.0
    }
 ]

 var nutricion = require('nutrition');
module.exports = {
    
    index: async function(req, res, next) {

        try {

            var datoMedico = await Medico.find({idPersona:req.user.idPersona.id});

            var datoControl = await Control_revision.find({idMedico:datoMedico[0].id});

            var pacientes = [];

            async.eachSeries(datoControl, function(element, callback) {

                Paciente.findOne(element.idPaciente).populate('idPersona').exec(function(err,datoPaciente){
                    pacientes.push(datoPaciente);
                    callback(null);
                });

            }, function(error) {
                
                if (error) return Error('Error');
                return res.view({
                    result: pacientes,
                    layout:'layouts/layout_medico'
                });
    
            });
        } catch (err) {

            return next(err);

        }


        // Paciente.find().populate('idPersona').exec(function(err, list) {
        //     if (err) return Error('Error');
        //     return res.view({
        //         result: list,
        //         layout:'layouts/layout_medico'
        //     });
        // });
    },

    show: async function(req, res, next) {
        try {

            var datoPaciente = await Paciente.find(req.param('id')).populate('idPersona');

            
            sails.log('datoPaciente Show',datoPaciente)
            res.view({
                element: datoPaciente[0],
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

    consulta:async function(req, res, next) {
        try {
            var auxRevMedica = req.body;
            await Revision_medica.create(req.body);

            return res.redirect('/paciente/historial/'+auxRevMedica.idPaciente);

        } catch (err) {

            return next(err);

        }
    },
    historial:async function(req, res, next) {
        try {

            var historial = await Revision_medica.find({idPaciente:req.param('id')});
            var datoPaciente = await Paciente.findOne(req.param('id')).populate('idPersona');

            var auxHistorial =[];

            historial.forEach(item => {
                console.log('ITEM:',item)
                var imc = item.peso/((item.estatura/100) *(item.estatura/100));
                item.imc= imc.toFixed(2);
                var estado =  estado={nombre:'OBESIDAD',color:'danger',estilo:'#F10000'}
            if(imc < 18.5){
                estado={nombre:'BAJO',color:'warning',estilo:'#F0FF01'}
            }else if(imc>=18.5 && imc<24.9){
                estado={nombre:'NORMAL',color:'success',estilo:'#1DF100'}
            }else if(imc >=25 && imc <=29.9){
                estado={nombre:'SOBREPESO',color:'warning',estilo:'#F0FF01'}
            }
                item.estado= estado;
                auxHistorial.push(item);
            });

            

            // sails.log('Dato Paciente', datoPaciente);
            // sails.log('Historial',historial)
            
            res.view({
                paciente: datoPaciente,
                historial:auxHistorial,
                layout:'layouts/layout_medico'
            });
        } catch (err) {

            return next(err);

            11
        }
    },

};