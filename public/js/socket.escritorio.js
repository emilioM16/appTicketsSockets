var socket = io();

var seachParams = new URLSearchParams(window.location.search);

if(!seachParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = seachParams.get('escritorio');

$('#escritorio').text(escritorio);

$('#btnSiguienteTicket').on('click',function(){
    socket.emit('atenderTicket',{escritorio: escritorio}, function(siguienteTicket){
        if(siguienteTicket === 0){
            $('#ticketText').text('No hay más tickets que atender');
        }
        $('#ticket').text(siguienteTicket);
    });
});

