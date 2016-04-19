$(function() {
    // Initialize variables
    var socket = io();
    var $window = $(window);

    var $loginPage = $('.login.page'); // The login page
    var $usernameInput = $('.usernameInput'); // Input for username

    // Sets the client's username
    function setUsername () {
        username = cleanInput($usernameInput.val().trim());

        // If the username is valid
        if (username) {
            $loginPage.fadeOut();

            // Tell the server your username
            socket.emit('add user', username);

            // todo login process
        }
    }

    // Prevents input from having injected markup
    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }

    // Keyboard events

    $window.keydown(function (event) {
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            setUsername();
        }
    });
});