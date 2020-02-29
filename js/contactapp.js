$(function () {
    "use strict";
    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#FirstName').val('');
                $('#LastName').val('');
                $('#CompanyName').val('');
                $('#email').val('');
                $('#Phone').val('');
                $('#Comments').val('');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        
        //Submit details to Sendy list if subscribe checked.
        if (document.getElementById('subscribe-newsletter').checked) {
            $.ajax({
                type: 'POST',
                url: 'https://mail.uppermedia.ph/subscribe',
                data: formData
            });
        }


    });

});
