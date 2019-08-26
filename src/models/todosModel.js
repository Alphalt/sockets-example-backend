'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todosSchema = new Schema({
    name: {
        type: String,
        required: 'Por favor ingrese un nombre para la tarea'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pendiente', 'enProgreso', 'completed']
        }],
        default: ['pendiente']
    }
});

module.exports = mongoose.model('Todos', todosSchema);