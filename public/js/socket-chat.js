var socket = io();

let paras = new URLSearchParams( window.location.search );

if( !paras.has('nombre') || !paras.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

const usuario = {
    nombre : paras.get('nombre'),
    sala: paras.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(usuarios) {
    console.log(usuarios);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {

    console.log('Mensaje Privado:', mensaje);

});