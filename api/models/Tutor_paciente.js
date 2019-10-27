/**
 * Tutor_alumno.js
 *
 * @description :: The Tutor_alumno table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'tutor_paciente',


    attributes: {
        // updatedAt: false,
        // createdAt:false,
        idPaciente: {

            required:false, 

            model: 'paciente'
        },
        idTutor: {

            required:false, 

            model: 'tutor'
        }
    }
};