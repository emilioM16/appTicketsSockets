const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.obtenerUltimoTicket(),
        ultimos: ticketControl.obtenerUltimosTickets()
    });


    client.on('siguienteTicket', (data, callback)=>{
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    client.on('atenderTicket',(data, callback)=>{
        if(!data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }
        let ticketSiguiente = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('estadoActual', {
            actual: ticketControl.obtenerUltimoTicket(),
            ultimos: ticketControl.obtenerUltimosTickets()
        });
        callback(ticketSiguiente);
    });

});