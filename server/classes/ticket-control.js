const fs = require('fs');
const { Ticket }  = require('./ticket');

class TicketControl {

    constructor() {
        this.ultimo = 0; //ultimo ticket
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        
        let data = require('../data/data.json');

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        }else{
            this.reiniciarConteo();
        }
    }


    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./data/data.json', jsonDataString);
    }


    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        this.grabarArchivo();
    }


    siguienteTicket(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    obtenerUltimoTicket(){
        return `Ticket ${ this.ultimo }`;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return this.tickets.length;
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //remueve el primer elemento del array
        let ticketSiguiente = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatro.unshift(ticketSiguiente); //agrega al inicio del arreglo
        if(this.ultimosCuatro.length > 4){
            this.ultimosCuatro.pop();
        }
        console.log('Ultimos cuatro');
        console.log(this.ultimosCuatro);
        this.grabarArchivo();

        return ticketSiguiente.numero; 
    }


    obtenerUltimosTickets(){
        return this.ultimosCuatro;
    }
}

module.exports = {
    TicketControl
};
