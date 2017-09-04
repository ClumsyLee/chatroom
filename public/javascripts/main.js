$(() => {
  const socket = io();

  $('#message-body').on('keypress', (e) => {
    if (e.keyCode == 13) {
      socket.emit('message-body', $('#message-body').val());
      $('#message-body').val('');
    }
  });

  socket.on('message', (message) => {
    const dateString = (new Date(message.createdAt)).toLocaleString('en-US');
    $('#messages')
      .prepend($('<div class="list-group-item">')
        .append($('<div class="d-flex justify-content-between">')
          .append($('<b>').text(message.username))
          .append($('<span class="text-muted">').text(dateString))
        )
        .append($('<span>').text(message.body))
      );
  });

  socket.on('usernames', (usernames) => {
    usernames.sort();
    const usernameNow = $('#username').text();

    console.log(usernameNow);
    $('#usernames tr').remove();
    for (let username of usernames) {
      if (username == usernameNow) {
        $('#usernames').append($('<tr>').append($('<td class="text-secondary py-1">').text(username)));
      } else {
        $('#usernames').append($('<tr>').append($('<td class="py-1">').text(username)));
      }
    }
  });
});
