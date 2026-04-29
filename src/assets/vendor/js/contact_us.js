// FormSubmit endpoint - no backend mailer file needed on static hosting.
var FORMSUBMIT_AJAX_URL = 'https://formsubmit.co/ajax/uxuimate@gmail.com';

function submitToFormSubmit(formArray, onSuccess, onError) {
    var payload = {};
    var projectTypes = [];

    $.each(formArray, function (_, field) {
        if (field.name === 'projectType[]') {
            projectTypes.push(field.value);
            return;
        }
        payload[field.name] = field.value;
    });

    if (projectTypes.length) {
        payload.projectType = projectTypes.join(', ');
    }

    payload._subject = 'New brief submission - UX UI MATE';
    payload._template = 'table';
    payload._captcha = 'false';

    $.ajax({
        type: 'POST',
        url: FORMSUBMIT_AJAX_URL,
        data: payload,
        dataType: 'json',
        success: function () {
            onSuccess({
                type: 'success',
                text: 'Thank you! Your brief was sent successfully. We will reply within 24 hours.'
            });
        },
        error: function () {
            onError({
                type: 'error',
                text: 'We could not send your message right now. Please try again or email uxuimate@gmail.com.'
            });
        }
    });
}

//contact us form (delegated for SPA / dynamically mounted forms)
$(document).on('click', '.contact_btn', function () {
    //disable submit button on click
    // $(".contact_btn").attr("disabled", "disabled");
    // $(".contact_btn b").text('Sending');
    $(".contact_btn i").removeClass('d-none');

    //simple validation at client's end
    var post_data, output;
    var proceed = "true";
    // var allBlank;

    var str = $('#contact-form-data').serializeArray();

    var $form = $('#contact-form-data');
    $form.find('input').not('[type=checkbox]').not('[type=range]').not('[type=hidden]').not('[data-optional]').each(function() {
        if(!$(this).val()){
            proceed = "false";
        }
    });

    if ($form.is('[data-validate-message]')) {
        $form.find('textarea').each(function() {
            if(!$(this).val()){
                proceed = "false";
            }
        });
    }

    //everything looks good! proceed...
    if (proceed === "true") {

        submitToFormSubmit(
            str,
            function (response) {
                output = '' +
                    '<div class="contact-brief-success" role="status" aria-live="polite">' +
                    '<p class="contact-brief-success__eyebrow">Brief sent</p>' +
                    '<h3 class="contact-brief-success__title">Thank you - we received your brief.</h3>' +
                    '<p class="contact-brief-success__text">' + response.text + '</p>' +
                    '<p class="contact-brief-success__text">We will review it and reply from <strong>uxuimate@gmail.com</strong>.</p>' +
                    '</div>';
                //reset values in all input fields
                $('.contact-form input').not('[type=range]').not('[type=checkbox]').val('');
                $('.contact-form input[type=checkbox]').prop('checked', false);
                $('.contact-form textarea').val('');

                if ($("#result").length) {
                    $form.addClass('contact-form--sent');
                    $("#result").hide().html(output).slideDown();
                } else {
                    Swal.fire({
                        type: 'success',
                        icon: 'success',
                        title: 'Success!',
                        html: '<div class="text-success">' + response.text + '</div>'
                    });
                }
                $(".contact_btn i").addClass('d-none');
            },
            function (response) {
                output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                if ($("#result").length) {
                    $form.removeClass('contact-form--sent');
                    $("#result").hide().html(output).slideDown();
                } else {
                    Swal.fire({
                        type: 'error',
                        icon: 'error',
                        title: 'Oops...',
                        html: '<div class="text-danger">' + response.text + '</div>'
                    });
                }
                $(".contact_btn i").addClass('d-none');
            }
        );

    }
    else
    {
        if ($("#result").length) {
            // alert("yes");
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $form.removeClass('contact-form--sent');
            $("#result").hide().html(output).slideDown();
            $(".contact_btn i").addClass('d-none');
        }else{
            Swal.fire({
                icon: 'error',
                type: 'error',
                title: 'Oops...',
                html: '<div class="text-danger">Please provide the missing fields.</div>'
            })
            $(".contact_btn i").addClass('d-none');
        }

    }


});



//modal window form

$(document).on('click', '.modal_contact_btn', function () {
    //disable submit button on click
    // $(".modal_contact_btn").attr("disabled", "disabled");
    // $(".modal_contact_btn b").text('Sending');
    $(".modal_contact_btn i").removeClass('d-none');

    //simple validation at client's end
    var post_data, output;
    var proceed = "true";

    var str=$('#modal-contact-form-data').serializeArray();

    $('#modal-contact-form-data input').not('[data-optional]').each(function() {
        if(!$(this).val()){
            proceed = "false";
        }
    });

    //everything looks good! proceed...
    if (proceed === "true") {
        submitToFormSubmit(
            str,
            function (response) {
                output = '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                //reset values in all input fields
                $('.contact-form input').not('[type=range]').not('[type=checkbox]').val('');
                $('.contact-form input[type=checkbox]').prop('checked', false);
                $('.contact-form textarea').val('');

                if ($("#quote_result").length) {
                    $("#quote_result").hide().html(output).slideDown();
                } else {
                    Swal.fire({
                        type: 'success',
                        icon: 'success',
                        title: 'Success!',
                        html: '<div class="text-success">' + response.text + '</div>'
                    });
                }
                $(".modal_contact_btn i").addClass('d-none');
            },
            function (response) {
                output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                if ($("#quote_result").length) {
                    $("#quote_result").hide().html(output).slideDown();
                } else {
                    Swal.fire({
                        type: 'error',
                        icon: 'error',
                        title: 'Oops...',
                        html: '<div class="text-danger">' + response.text + '</div>'
                    });
                }
                $(".modal_contact_btn i").addClass('d-none');
            }
        );

    }
    else {
        // output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
        // $("#quote_result").hide().html(output).slideDown();
        // $(".modal_contact_btn i").addClass('d-none');
        if ($("#quote_result").length) {
            // alert("yes");
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $("#quote_result").hide().html(output).slideDown();
            $(".modal_contact_btn i").addClass('d-none');
        }else{
            Swal.fire({
                icon: 'error',
                type: 'error',
                title: 'Oops...',
                html: '<div class="text-danger">Please provide the missing fields.</div>'
            })
            $(".modal_contact_btn i").addClass('d-none');
        }
    }

});