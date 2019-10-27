/**
 * paciente.js
 *
 * @description :: The paciente table
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'paciente',
    primaryKey: 'id',
    attributes: {
        idPersona: {
            required:false, 
            model: 'persona'
        }
    }
};