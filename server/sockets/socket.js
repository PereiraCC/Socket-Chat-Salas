const { io } = require('../server');
const { Usuarios } = require('../models/usuarios');
const { crearMensaje } = require('../helpers/helpers');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // console.log('Usuario conectado');

    client.on('entrarChat', (user, callback) => {

        if( !user.nombre || !user.sala) {
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            });
        }

        // console.log('Datos del user:', user);

        client.join(user.sala);

        const users = usuarios.agregarPersona( client.id, user.nombre, user.sala );

        client.broadcast.to(user.sala).emit('listaPersona', usuarios.getPersonasPorSala(user.sala));
        client.broadcast.to(user.sala).emit('crearMensaje', crearMensaje('Admin', `${user.nombre} se unió`));

        callback( usuarios.getPersonasPorSala(user.sala) );
    });

    client.on('crearMensaje', (data, callback) => {

        const persona = usuarios.getPersona(client.id);

        const mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        

        callback(mensaje);
    });

    client.on('mensajePrivado', (data) => {
        const persona = usuarios.getPersona( client.id );
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

    client.on('disconnect', () => {

        const personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

});