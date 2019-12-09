/**
 * Paciente
 *
 * @description :: Server-side logic for managing Paciente
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var recetas =[
    'Leche Materna exclusiva',
    'Leche Materna exclusiva',
    'Leche Materna exclusiva',
    'Leche Materna exclusiva',
    'Leche Materna exclusiva',
    'Leche Materna exclusiva',
    'Leche materna exclusiva$Capsula de vitamina A$Chispitas nutricionales$Papillas de tomate$Papilla de banana$Papilla de manzana',
    'Chispitas nutricionales$Papilla$Papilla de Sopa de verduras$Papilla de pera',
    'Chispitas nutricionales$Papilla de camote$Papilla de zapallo$Sopa de pollo',
    'Chispitas Nutricionales$Sopa de carne',
    'Chispitas Nutricinales$Naranja',
    'Chispitas Nutricionales$Quinua$Yogurt',
    //12
    'Capsula de vitamina A$Sopa de verduras$Sopa de arroz$Gelatina',

    //18
    'Sopa de fideo$Todas las frutas$Todas las verduras',
    //24
    'Capsula de vitamina A$Pescado$Todas las frutas$Todas las verduras$Sopa de verduras$Sopa Arroz$Gelatina',
    //30
    'Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt',
    //36
    'Capsula de vitamina A$Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt',
    //42
    'Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt',
    //48
    'Capsula de vitamina A$Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt',
    //54
    'Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt',
    //60
    'Capsula de vitamina A$Pescado$Todas las frutas$Todas las verduras$Gelatina$Leche$Yogurt$Quinua'
    
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
            var auxFecha = new Date(datoPaciente.idPersona.fechaNacimiento)
            var meses = auxFecha.getMonth()+1;
            var years = 2019 - auxFecha.getFullYear();
            if(years == 0){
                datoPaciente.receta = recetas[meses]
            }else{
                var mesesTotal= (parseInt(((years* 12)+meses)/6))-1

                console.log('MESES',mesesTotal)
                datoPaciente.receta = recetas[mesesTotal+11]
            }
            var auxHistorial =[];

            historial.forEach(item => {
                // console.log('ITEM:',item)
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

            sails.log('paciente',datoPaciente)

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
    crearCita :async function(req, res, next) {
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
                    medico: datoMedico[0],
                    pacientes: pacientes,
                    layout:'layouts/layout_medico'
                });
    
            });
        } catch (err) {

            return next(err);

        }
    },
    adicionarCita: function(req,res){

        sails.log('AdicionarCITA',req.body)

        Cita.create(req.body).exec(function(err,datoCita){
            if(err) res.serverError(err);
            return res.redirect('/paciente/citas');
        });
    },

    citas: async function(req,res){

        
        try {

            var datoMedico = await Medico.find({idPersona:req.user.idPersona.id});

            var datoCitas = await Cita.find({idMedico:datoMedico[0].id});

            var pacientes = [];

            async.eachSeries(datoCitas, function(element, callback) {

                Paciente.findOne(element.idPaciente).populate('idPersona').exec(function(err,datoPaciente){
                    datoPaciente.cita = element
                    pacientes.push(datoPaciente);
                    callback(null);
                });

            }, function(error) {
                
                if (error) return Error('Error');
                return res.view({
                    citas: pacientes,
                    layout:'layouts/layout_medico'
                });
    
            });
        } catch (err) {

            return next(err);

        }
    }

};