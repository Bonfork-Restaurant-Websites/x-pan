
$(document).ready(function () {
	$(".modal.permalink").each(function () {
		if (window.location.href.indexOf($(this).attr("id")) != -1) {
			$(this).modal('show');
		}
	});
});

$(function () {

	// to change the img on scroll in the header 
	$(window).on('scroll', function (event) {

		let docHeight = $('header').outerHeight(),
			scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height();

		if (scrollTop == 0) {
			$('#image')[0].src = 'images/shrimp-only-plate.png';
		}
		else if (scrollTop + windowHeight <= docHeight / 5 * 3) {
			$('#image')[0].src = 'images/carciofi-big.png';
		}
		else if (scrollTop + windowHeight <= docHeight / 5 * 4) {
			$('#image')[0].src = 'images/egg-flower-bg-trasparent.png';
		}
		else if (scrollTop + windowHeight <= docHeight - 10) {
			$('#image')[0].src = 'images/salmon-big.png';
		}
		else {
			$('#image')[0].src = 'images/egg-potato-only-plate.png';
		}

	});


	//rotating the logo 
	$(window).scroll(function () {
		var theta = $(window).scrollTop() / 100;
		$('.stamp').css({ transform: 'rotate(' + theta + 'rad)' });

	});

	// for the modal dialog 
	$('.modal').scroll(function () {
		var modalDialogScroll = $(this).scrollTop() / 100;
		$(this).find('.stamp').css({ transform: 'rotate(' + modalDialogScroll + 'rad)' });
	});

	// Fetch the form element
	var dtToday = new Date();

	var month = dtToday.getMonth() + 1;
	var day = dtToday.getDate();
	var year = dtToday.getFullYear();
	if (month < 10)
		month = '0' + month.toString();
	if (day < 10)
		day = '0' + day.toString();

	var maxDate = year + '-' + month + '-' + day;
	$('#date').attr('min', maxDate);


	let telInput = $("#phone");

	// initialize
	telInput.intlTelInput({
		initialCountry: 'auto',
		preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
		autoPlaceholder: 'aggressive',
		utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
		geoIpLookup: function (callback) {
			fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe',
				{
					cache: 'reload'
				}).then(response => {
					if (response.ok) {
						return response.json()
					}
					throw new Error('Failed: ' + response.status)
				}).then(ipjson => {
					callback(ipjson.country_code)
				}).catch(e => {
					callback('us')
				})
		}
	});

	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('safari') != -1) {
			document.getElementById('date').type = 'date';
			document.getElementById('time').type = 'time';
		} else {
			if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
				document.getElementById('time').type = 'time';
			}
			else {
				console.log('safari');
			}
		}
	}
});


// Newsletter Steps Form
var theForm = document.getElementById("email-form");

new stepsForm(theForm, {
  onSubmit: function (form) {
    // hide form
    classie.addClass(theForm.querySelector(".simform-inner"), "hide");

    /*
      form.submit()
      or
      AJAX request (maybe show loading indicator while we don't have an answer..)
      */
    // Override the submit event

    // let's just simulate something...
    var messageEl = theForm.querySelector(".final-message");

    // SEND EMAIL
    $.ajax({
      type: "POST",
      url:"./includes/mail-2.php",
      data: $(form).serialize(),
      success: function() {
        messageEl.innerHTML = "Thank you! We'll be in touch.";
		classie.addClass(messageEl, "show");
		console.log("success")
      },
      error: function(){
        messageEl.innerHTML = "Something went wrong.";
        classie.addClass(messageEl, "show");
      }
    });
  },
});

// Cursor 
const cursor = $(".cursor"),
	body = $("body"),
	wwidth = $(window).width(),
	wheight = $(window).height(),

	cursorMove = function () {
		var e, n;
		return (
			body.addClass("cursor-on"),
			cursor.css({
				transform: "matrix(1, 0, 0, 1, " + wwidth / 2 + ", " + wheight / 2 + ")"
			}),
			(e = wheight / 2),
			(n = 0.65 * wwidth / 2),
			n > e ? e : n,
			$(window).on("mousemove", function (e) {
				var n, t;
				if (
					((window.x = e.clientX),
						(window.y = e.clientY),
						cursor.css({
							transform: "matrix(1, 0, 0, 1, " + x + ", " + y + ")"
						}))
				);
			})
		);
	};
cursorBind = function () {
	var e, n, t;
	if (
		((n = cursor.find("span")).removeClass("link external new"),
			(e = $(".focus")),
			(t = $(".slack")),
			$(window).on({
				mouseenter: function () {
					return n.removeClass("off");
				},
				mouseleave: function () {
					return n.addClass("off");
				}
			}),
			$("a, button").on({
				mouseenter: function () {
					var e;
					return (
						(e = $(this).hasClass("external") ? "link external" : "link"),
						n.addClass(e)
					);
				},
				mouseleave: function () {
					return n.removeClass("link external");
				}
			})
		)
	)
		return;
};

cursorMove();
cursorBind();

if ($('#reserve-form').length) {
	$('#reserve-form').each(function(){
		$(this).validate({
			errorClass: 'error wobble-error',
			submitHandler: function(form){
				$.ajax({
					type: "POST",
					url:"./includes/mail.php",
					data: $(form).serialize(),
					success: function() {
						document.querySelector('.alert-success').style.display = 'block';
						console.log("Success");
					},
  
					error: function(){
						document.querySelector('.alert-error').style.display = 'block';
						console.log("Fail");
					}
				});
			}
		});
	});
  } 
  