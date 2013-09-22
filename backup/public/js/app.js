var app = {
	init: function(){
		this.initMap();
		this.subscribe();
	},
	initMap: function(){

	var styles = [{
		"elementType": "labels",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"stylers": [{
			"color": "#323237"
		}]
	}, {
		"featureType": "water",
		"stylers": [{
			"color": "#2e2e32"
		}]
	}, {
		"featureType": "road.arterial",
		"stylers": [{
			"color": "#2b2b2f"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "geometry.fill",
		"stylers": [{
			"visibility": "on"
		}, {
			"color": "#35353a"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#2f2f33"
		}, {
			"weight": 1
		}]
	}, {
		"featureType": "poi.park",
		"stylers": [{
			"color": "#2e2e33"
		}]
	}];
	var styledMap = new google.maps.StyledMapType(styles, {
		name: "Styled Map"
	});
	var mapOptions = {
		mapTypeControl:false,
		streetViewControl: false,
		panControl:false,
		rotateControl:false,
		draggable: false,
		zoomControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		zoom: 14,
		disableDefaultUI: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
		}
	};
	$('#map').height($(window).height() - 97);
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map.mapTypes.set("map_style", styledMap);
	map.setMapTypeId("map_style");
	// Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }	
	},
	validateEmail: function(emailAddress) {
	    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	    return pattern.test(emailAddress);
		},
	isValid: function(el){
		var inputVal = $(el).val();
			if(inputVal.length <= 2 ){
				$(el).parent().parent('.control-group').addClass('error');	
			}
			else{
				$(el).parent().parent('.control-group').removeClass('error');		
			}
	},	
	subscribe: function(){
		var app = this;

		//Validate Email
		$('#inputEmail').on('change', function(){
			var email = $(this).val();	
			if(!app.validateEmail(email)){
				$(this).parent().parent('.control-group').addClass('error');
			}
			else if(app.validateEmail(email)){
				$(this).parent().parent('.control-group').removeClass('error');	
			}
		});
		
		//Validate required fields
		$('.subscription-form input[type=text]').on('change', function(){
			app.isValid(this);
		});

		//Submit From to the server
		$('.subscription-form').on('submit', function(e){
			e.preventDefault();
			$('input[type=text], input[type=email]').each(function(){
				app.isValid(this);
			});
			var form = $(this),
				action = form.attr('action');

			if(!$('.control-group').hasClass('error')){
				$.ajax(action,{
					dataType:'json',
					type:'POST',
					data: form.serialize(),
					timeout: 15000,
					beforeSend: function(){
						form.find('.control-group').addClass('disabled');
						form.find('.control-group input').attr('disabled','disabled');
						form.find('#submitForm').addClass('disabled');
						form.find('.checkbox-group').fadeTo('fast',0);
						form.find('.loading').fadeToggle();

					},
					success: function(response){
						console.log(response);
						

					},
					error: function(request, errorType, errorMessage){
						//Handle Error
					},
					complete: function(){
						$('.big-title').find('h4').text("Thank you for joining, we'll let you know.");
						$('.big-title').find('button').hide();
						$('#subscribe').modal('hide');
					}
				});
			}
		});

	}
}

$(function() {
	app.init();
});
