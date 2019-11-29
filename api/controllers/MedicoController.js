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

            var datoMedico = await Medico.find(req.param('id')).populate('idPersona');

            var datoControl = await Control_revision.find({idMedico:datoMedico[0].id});

            var pacientes = [];

            async.eachSeries(datoControl, function(element, callback) {

                Paciente.findOne(element.idPaciente).populate('idPersona').exec(function(err,datoPaciente){
                    pacientes.push(datoPaciente);
                    callback(null);
                });

            }, function(error) {
                
                sails.log('Pacientes',pacientes)
                res.view({
                    pacientes: pacientes,
                    element: datoMedico[0]
                });
    
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
    pacientes:async function(req,res){

        try {
            
            var pacientes = await Paciente.find().populate('idPersona');

            var datoRevision = await Revision_medica.find();

            var bajos =0;
            var normal =0;
            var sobrepeso=0;
            var obeso =0;
            pacientes.forEach(paciente => {
                var auxConsulta = datoRevision.filter(item=>item.idPaciente==paciente.id)
                if(auxConsulta.length >0){
                    var consulta = auxConsulta.pop();
                    var imc = consulta.peso/((consulta.estatura/100) *(consulta.estatura/100));

                    if(imc < 18.5){
                        bajos++;
                    }else if(imc>=18.5 && imc<24.9){
                        normal++;
                    }else if(imc >=25 && imc <=29.9){
                        sobrepeso++;
                    }else{
                        obeso++;
                    }
                }
            });
            
            var estadoNutricional ={
                bajos: bajos,
                normal:normal,
                sobrepeso:sobrepeso,
                obeso:obeso
            }
            sails.log('Estado:',estadoNutricional)

            return res.view('medico/pacientes',{
                result: pacientes,
                estado:estadoNutricional
            });

        } catch (error) {
            res.serverError(error)
        }

    }

};