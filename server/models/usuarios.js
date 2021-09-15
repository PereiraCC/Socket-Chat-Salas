
// {
//     id: 'adsajdlkajsd-dasd',
//     nombre : 'Carlos',
//     sala: 'Video juegos'
// }

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        this.personas.push({ id, nombre, sala});
        return this.personas;
    }

    getPersona( id ){
        return this.personas.filter( p => p.id === id)[0];
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        return this.personas.filter( p => p.sala === sala);
    }

    borrarPersona( id ){

        const personaBorrada = this.getPersona( id );
        this.personas = this.personas.filter( p => p.id !== id);
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}