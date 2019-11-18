/**
 * Revision_medica.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idPaciente: {
      model: 'paciente'
    },
    lugar: {
      type: 'string',
      required: false,
      allowNull: true
    },
    peso: {
      type: 'number',
      required: false,
      allowNull: true
    },
    estatura: {
      type: 'number',
      required: false,
      allowNull: true

    },
    cabeza: {
      type: 'number',
      required: false,
      allowNull: true

    },
    anualidades: {
      type: 'number',
      required: false,
      allowNull: true

    },
    meses: {
      type: 'number',
      required: false,
      allowNull: true

    },
    semanas: {
      type: 'number',
      required: false,
      allowNull: true

    },

    fecha: {
      type: 'string',
      columnType: 'date',
      required: false,
      allowNull: true
    },
  },

};

