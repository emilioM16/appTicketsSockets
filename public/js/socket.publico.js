var socket = io();
var audio = new Audio('../audio/new-ticket.mp3');

socket.on('estadoActual', function(data){
    var ultimosTickets = data.ultimos;
    var i = 1;
    ultimosTickets.forEach(ticket => {
        $('#lblTicket'+ i).text('Ticket ' + ticket.numero);
        $('#lblEscritorio' + i).text('Escritorio ' + ticket.escritorio);
        i++;
    });
    audio.play();
});