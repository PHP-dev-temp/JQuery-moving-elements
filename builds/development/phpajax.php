<?php
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_decode(stripslashes($_POST['data']));
        echo count($data);
        /*foreach($data as $d){
            echo $d;
        }*/
       // send back data
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
	/*
	
    // Ajax contact form
    // Get the form.
    var form = $('#ajax-contact');
    // Get the messages div.
    var formMessages = $('#form-messages');
    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');
          // Set the message text.
          $(formMessages).text(response);
          // Clear the form.
          $('#subject').val('');
          $('#email').val('');
          $('#message').val('');
      })
          .fail(function(data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass('success');
          $(formMessages).addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
              $(formMessages).text(data.responseText);
          } else {
              $(formMessages).text('Oops! An error occured and your message could not be sent.');
          }
      });
    });
	
	*/
?>
