window.onload = function() {
    $('#nav-btn-chat').addClass('active');
    $("#chat").scrollTop($("#chat")[0].scrollHeight);
};

$(() => {
    let socket = io();
    let chat = $('#chat');
    let input = $('#sendText');
    let username = $('#username').text();
    let message;

    let date = new Date();
    let currentDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    input.on('change', () => {
        message = input.val();
    });

    $('#sendBtn').on('click', () => {
        socket.emit('chat message', { 'user': username, 'message': message, 'date': currentDate });
        input.val('');

        $("#chat").scrollTop($("#chat")[0].scrollHeight);
        return false;
    });

    socket.on('chat message', (msg) => {
        let div = $('<div />').addClass('row').addClass('message-bubble');
        let p = $('<p />').addClass('text-muted');
        p.text(msg.user);
        let span = $('<span />').addClass('date');
        span.text(' posted on: ' + msg.date);
        let text = $('<span />');
        text.text(msg.message);
        p.append(span);
        div.append(p).append(text);
        chat.append(div);
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
    })
});