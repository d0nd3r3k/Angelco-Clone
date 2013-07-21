$(function() {
			$(".logo").hover(function() {
				$(this).toggleClass("open")
			})
		});

		function initialize() {
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
				draggable: false,
				zoomControl: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				zoom: 14,
				center: new google.maps.LatLng(33.884596,35.502563),
				disableDefaultUI: true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
				}
			};
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			map.mapTypes.set("map_style", styledMap);
			map.setMapTypeId("map_style")
		}
		$(function() {
			initialize()
		});
