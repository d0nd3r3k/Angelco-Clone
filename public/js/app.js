var app = {
	init: function(){

		this.validation()
		this.editProfile()
		this.saveProfile()
		this.cancelChanges()
		this.addStartup()
		this.cancelStartup()
		this.hideTooltip()
		this.addDescription()
		this.addStartupItem()
		this.cancelStartupItem()
		this.saveMediaForm()
		this.savePressItem()
		this.delPressItem()
		this.addPressItem()
		this.cancelPressItem()
		this.uploadStartupImage()
		this.showStartups()
		this.showAllUsers()
		this.clickStartup()

		//$('li.sBlock').wookmark()
	},
	validateEmail: function(emailAddress) {
	    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)
	    return pattern.test(emailAddress)
		},
	isValid: function(el){
		var inputVal = $(el).val()
			if(inputVal.length <= 2 ){
				$(el).parent().parent('.control-group').addClass('error')	
			}
			else{
				$(el).parent().parent('.control-group').removeClass('error')		
			}
	},
	editProfile: function(){
		$("#editPorfile").on('click', function(e){
			e.preventDefault()
			$('.profile-content').fadeToggle("fast", function(){
				$('.edit-profile-wrapper').fadeToggle()	
			})
			
		})
	},
	saveProfile: function(){
		createLink = function(url,icon) {
			var socialLinks = $(".social-links"),
				linkDom = socialLinks.find("."+icon)

			if(url !== ""){

				 if(linkDom.length === 0)
				 	socialLinks.append("<li><a href='"+url+"' target='_BLANK'><i class='"+icon+"'></i></a></li>")
				 else
				 	linkDom.parent().attr("href",url)
			 }
			 else{
			 	var linkDom = socialLinks.find("."+icon)
			 	linkDom.parent().parent().remove()
			 }
		}
		$(".edit-form").validate()
		$(".edit-form").on('submit', function(e){
			var	form = $(this),
				isvalidate=$(form).valid()

	        if(isvalidate){
		        e.preventDefault();
				var action = form.attr('action'),
					data = form.serialize(),
					user = form.serializeArray(),
					name = user[1]['value'],
					username = user[2]['value'],
					location = user[3]['value'],
					miniresume = user[4]['value'],
					website = user[5]['value'],
					blog = user[6]['value'],
					googleplus = user[7]['value'],
					linkedin = user[8]['value'],
					twitter = user[9]['value'],
					facebook = user[10]['value'],
					github = user[11]['value'],
					dribbble = user[12]['value'],
					behance = user[13]['value']
				
				
					$.ajax(action,{
						type:'POST',
						contentType: 'application/x-www-form-urlencoded',
						dataType:'html',
						data: data,
						timeout: 15000,
						beforeSend: function(){
							$('.profile-txt').fadeTo(500,0.6)
							var socialLinks = $(".social-links")
							$(".profile-txt h4").html(name)
							$(".profile-txt .mini-resume").html(miniresume)
							$(".profile-location").html('<span> - '+location+'</span>')
							 createLink(website,'fui-home')
							 createLink(blog,'fui-document')
							 createLink(googleplus,'fui-googleplus')
							 createLink(linkedin,'fui-linkedin')
							 createLink(facebook,'fui-facebook')
							 createLink(twitter,'fui-twitter')
							 createLink(github,'fui-github')
							 createLink(dribbble,'fui-dribbble')
							 createLink(behance,'fui-behance')
							 $('.edit-profile-wrapper').fadeToggle("fast", function(){
								$('.profile-content').fadeToggle()
							})
						},
						success: function(response){
							$('.profile-txt').fadeTo(500,1)
						},
						error: function(request, errorType, errorMessage){
							//Handle Error

						},
						complete: function(){
							

						}
					})
				}
		})
	},
	cancelChanges: function(){
		$("#cancel").on('click', function(e){
			e.preventDefault()
			$('.edit-profile-wrapper').fadeToggle("fast", function(){
				$('.profile-content').fadeToggle()
			})
		})
	},
	addStartup: function(){
		$(".add-startup").on('click', function(e){
			e.preventDefault()
			$('.add-startup').fadeToggle("fast", function(){
				$(".startups-wrapper").fadeToggle("fast", function(){
					$('.startup-form').fadeToggle("fast", function(){
						$('html, body').animate({
					    	scrollTop: $('.profile-block').scrollTop() + 164
						})
					})
				})
			})
			
		})
	},
	cancelStartup: function(){
		$(".cancel-startup").on('click', function(e){
			e.preventDefault()
			$('.startup-form').fadeToggle("fast", function(){
				$(".add-startup").fadeToggle("fast", function(){
					$('.startups-wrapper').fadeToggle("fast", function(){
						$('html, body').animate({
					    	scrollTop: $('.profile-block').scrollTop() - 164
						})
					})
				})
			})
		})
	},
	hideTooltip: function(){

		var startupLink = $('.startup-block .logo a')
		startupLink.popover({placement:'bottom',  trigger: 'hover focus', html: true})
	},
	editStartup: function(){
		function createLink(url,icon) {
			var socialLinks = $(".social-links"),
				linkDom = socialLinks.find("."+icon)

			if(url !== ""){

				 if(linkDom.length === 0)
				 	socialLinks.append("<li><a href='"+url+"' target='_BLANK'><i class='"+icon+"'></i></a></li>")
				 else
				 	linkDom.parent().attr("href",url)
			 }
			 else{
			 	var linkDom = socialLinks.find("."+icon)
			 	linkDom.parent().parent().remove()
			 }
		}

		$('.edit-startup-form').on('submit', function(e){
			e.preventDefault()	
			
			var form = $(this),
				action = form.attr('action'),
				data = form.serialize(),
				startup = form.serializeArray(),
				name = startup[1]['value'],
				tagline = startup[2]['value'],
				location = startup[3]['value'],
				description = startup[4]['value'],
				website = startup[5]['value'],
				blog = startup[6]['value'],
				googleplus = startup[7]['value'],
				twitter = startup[8]['value'],
				facebook = startup[9]['value']
				
			$.ajax(action,{
				type:'POST',
				contentType: 'application/x-www-form-urlencoded',
				dataType:'html',
				data: data,
				timeout: 15000,
				beforeSend: function(){

					var socialLinks = $(".social-links")
					$(".profile-block .description").html('<p>'+description+'</p>')
					$(".profile-txt h4").html(name)
					$(".profile-txt .mini-resume").html(tagline)
					$(".profile-location").html('<span> - '+location+'</span>')
					 createLink(website,'fui-home')
					 createLink(blog,'fui-document')
					 createLink(googleplus,'fui-googleplus')
					 createLink(facebook,'fui-facebook')
					 createLink(twitter,'fui-twitter')
				},
				success: function(response){
				},
				error: function(request, errorType, errorMessage){
					//Handle Error

				},
				complete: function(){
					
				}
			})
			$('.edit-profile-wrapper').fadeToggle("fast", function(){
				$('.profile-content').fadeToggle()
			})	

		})
	},
	addDescription: function(){
		$(".add-description").on('click', function(e){
			e.preventDefault()
			$('#editPorfile').trigger('click')
			$('html, body').animate({
					    	scrollTop: $('.profile-btns').scrollTop() 
			})

		})
	},
	addStartupItem: function(){
		
		$(".add-item").on('click', function(e){
			e.preventDefault()
			var thisButton = $(this)
			thisButton.parent().find('.startup-default-description').fadeToggle("fast", function(){
				thisButton.fadeToggle("fast", function(){
					thisButton.parent().find('form').fadeToggle("slow")
				})
			})
		})
	},
	cancelStartupItem: function(){

		$(".cancel-item").on('click', function(e){
			e.preventDefault()
			var thisButton = $(this).closest('form')
			thisButton.fadeToggle("fast", function(){
				thisButton.parent().find('.startup-default-description').fadeToggle("fast", function(){
					thisButton.parent().find('.add-item').fadeToggle("fast")
				})
			})	
		})
	},
	saveMediaForm: function(){
		$(".media-form").on('submit', function(e){

			e.preventDefault()

			var form = $(this),
				action = form.attr('action'),
				data = form.serialize(),
				startup = form.serializeArray(),
				video = startup[1]['value'],
				presentation = startup[2]['value']
				
			$.ajax(action,{
				type:'POST',
				contentType: 'application/x-www-form-urlencoded',
				dataType:'html',
				data: data,
				timeout: 15000,
				beforeSend: function(){
				},
				success: function(response){
					
				},
				error: function(request, errorType, errorMessage){
					//Handle Error

				},
				complete: function(response){
					//TODO: Handle Youtube & Slideshare embed.
					var data = JSON.parse(response.responseText),
						mediaWrapper = $(".media-wrapper")

					mediaWrapper.html('')	
					if(video !== ""){
						mediaWrapper.append('<p>Video</p><iframe id="ytplayer" type="text/html" width="540" height="310" src="http://www.youtube.com/embed/'+video+'?autohide=1&rel=0&showinfo=0&showsearch=0&wmode=transparent" frameborder="0"/>')
					}
					if(!data.error){
						mediaWrapper.append('<p>Presentation</p><iframe src="'+data.presentation+'" width="540" height="310" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>')
					}
					else if(data.error){
						mediaWrapper.append("<p>Invalid Presentation URL</p>")	
					}
				}
			})
			$(this).find('.cancel-item').trigger('click')	

		})
	},
	addPressItem: function(){
		
		$(".add-press-item").on('click', function(e){
			e.preventDefault()
			var thisButton = $(this)
			thisButton.parent().find('.startup-default-description').fadeToggle("fast", function(){
				thisButton.fadeToggle("fast", function(){
					thisButton.parent().find('.press-form').fadeToggle("slow")
					$('.press-form .controls input').val("")
				})
			})
		
		})
	},
	cancelPressItem: function(){

		$(".cancel-press-item").on('click', function(e){
			e.preventDefault()
			var thisButton = $(this).closest('form')
			thisButton.fadeToggle("fast", function(){
				thisButton.parent().find('.startup-default-description').fadeToggle("fast", function(){
					thisButton.parent().find('.add-press-item').fadeToggle("fast")
					$('.press-form .controls input').val("")
				})
			})
					
		})
	},
	savePressItem: function(){

		$(".press-form").validate({
			rules: {
				      title: {
				        minlength: 2,
				        required: true
				      },
				      link: {
				      	minlength: 2,
				      	required: true,
				      	url: true
				      }
				     }
		})
		$(".press-form").on('submit', function(e){
			var	form = $(this),
				isvalidate=$(form).valid()

	        if(isvalidate){
				e.preventDefault()
				var form = $(this),
					action = form.attr('action'),
					data = $(form).serialize(),
					pressItem = form.serializeArray(),
					title = pressItem[1]['value'],
					link = pressItem[2]['value'],
					input = $(form).find('.controls input'),
					csrf = $(form).find("input[name='_csrf']").val()	

				if(title !== "" && link !== ""){
					$(".press-wrapper em").hide()
					$.ajax(action,{
						type:'POST',
						contentType: 'application/x-www-form-urlencoded',
						dataType:'html',
						data: data,
						timeout: 15000,
						beforeSend: function(){

						},
						success: function(response){
							
							
						},
						error: function(request, errorType, errorMessage){
							//Handle Error

						},
						complete: function(response){
							var rData = JSON.parse(response.responseText)
							var pressElement = "<li><span>" +
									"<form action='/startups/press/del/"+rData.action+"'>" +
										"<input name='_csrf' type='hidden' value='"+csrf+"'/>"+
										"<a href='#delete' data-id="+rData.id+" class='delPressItem fui-cross-inverted'></a>"+
									"</form>"+
									"<a href='"+link+"' target='_BLANK'>"+title+"</a>"+
								"</span></li>"

							$("ul.pressItems").append(pressElement)
								
						}
				})
				$(this).find('.cancel-press-item').trigger('click')		
				}
			}
		})
	},
	delPressItem: function(){

		$('ul.pressItems').on('click','.delPressItem ', function(e){

			e.preventDefault()
			var	form = $(this).closest('form'),
				action = $(form).attr('action'),
				csrf = $(form).find("input[name='_csrf']").val(),
				data = "_csrf="+csrf+"&id="+$(this).data('id'),
				thisBtn = $(this)

			$.ajax(action,{
					type:'POST',
					contentType: 'application/x-www-form-urlencoded',
					dataType:'html',
					data: data,
					timeout: 15000,
					beforeSend: function(){
						$(thisBtn).closest('ul.pressItems li').fadeOut("slow").remove()
					},
					success: function(response){
						

						
					},
					error: function(request, errorType, errorMessage){
						//Handle Error

					},
					complete: function(response){
						
					}
				})	
		})
	},
	validation: function(){
		jQuery.validator.setDefaults({
    		errorPlacement: function(error, element) {
      			// if the input has a prepend or append element, put the validation msg after the parent div
      			if(element.parent().hasClass('input-prepend') || element.parent().hasClass('input-append')) {
        		error.insertAfter(element.parent());		
      			// else just place the validation message immediatly after the input
      			} else {
        			error.insertAfter(element);
      			}
    		},
    		errorElement: "small", // contain the error msg in a small tag
    		wrapper: "div", // wrap the error message and small tag in a div
    		highlight: function(element) {
      			$(element).closest('.control-group').addClass('error'); // add the Bootstrap error class to the control group
    		},
    		success: function(element) {
      		$(element).closest('.control-group').removeClass('error'); // remove the Boostrap error class from the control group
    		}
  		});
	},
	uploadStartupImage: function(){

		$('#triggerFile').on('click', function(e){
			e.preventDefault()
			$("#inputFile").trigger('click')
		})

		var uploadImage = $(".uploadImage")
		$(".triggerUpload").on('click', function(){
			uploadImage.fadeToggle("fast")	
		})
		$('input[type=file]').change(function() { 
    		// select the form and submit
    		$('form#upload').submit()
    		uploadImage.fadeToggle("fast", function(){
	    		$(".cropImage").fadeToggle("fast")
				$('.loading').fadeToggle()
				$('.thumbnail').fadeTo(500,0.6)
			})
		})
		$('form#upload').ajaxForm({
			beforeSend: function(){
			},
			complete: function(response) {

				var data = JSON.parse(response.responseText)
				var cropImage = $(".cropImage")
				if(data.responseText != 232){
					var imageUrl = data.responseText[0].url,
					imagePath = data.responseText[0].path,
					imageOriginalName = data.responseText[0].original.name ,
					imageW = data.responseText[0].w,
					imageH = data.responseText[0].h
					
						
						cropImage.find('img').attr('src', imageUrl)	
						cropImage.find('input[name="image"]').val(imagePath)
						cropImage.find('input[name="original"]').val(imageOriginalName)
						var offsetX, offsetY, cropW, cropH;
						$('.loading').fadeToggle(100)
						$('.thumbnail').fadeTo(200,1)
						function updateCoords(c) {
							$('input#coordx1').val(c.x)
							$('input#coordy1').val(c.y)
							$('input#coordx2').val(c.x2)
							$('input#coordy2').val(c.y2)
							$('input#w').val(c.w)
							$('input#h').val(c.h)
						}
						
						$(function(){
							$('.pre-processed').Jcrop({
								aspectRatio: 1, // Only Squares
								onChange: updateCoords,
								onSelect: updateCoords,
								bgColor: 'transparent',
								trueSize: [imageW , imageH]
							})
						})

						$('form#crop').ajaxForm({
							complete: function(response) {
								
								var data = JSON.parse(response.responseText),
								croppedImage = data.responseText.versions[1].url
								$('.profile-content').find('.profile-img').replaceWith('<img src="'+croppedImage+'" class="profile-img"/>')
								cropImage.fadeToggle("fast")
							}
						})
					
				}	
			}
		})
	},
	showStartups: function(){
		if($(".allStarups").length !== 0){
			var skip = 1
			$(window).scroll(function() {
	 		   if($(window).scrollTop() == $(document).height() - $(window).height()) {
	 		   		skip++
	           		$.ajax({
						dataType:'json',
						type:'GET',
						url: '/startups/?skip='+skip,
						timeout: 15000,
						beforeSend: function(){
						},
						success: function(response){
							var items = response.responseText
							console.log(items)
							$.each(items, function(i,item){
								var startupImage = "<i class='fui-plus-inverted'></i>"
								if(item.logo !== "" && item.logo.versions !== undefined && item.logo.versions !== null)
            						startupImage = "<img src='"+item.logo.versions[1].url+"' />"
            					
            					var links = "<ul class='social-links'>"
								if(item.website !== "")
									links += '<li><a href="'+item.website+'" target="_BLANK"><i class="fui-home"></i></a></li>'
								if(item.links.googleplus !== "")
									links += '<li><a href="'+item.links.googleplus+'" target="_BLANK"><i class="fui-googleplus"></i></a></li>'
								if(item.links.facebook !== "")	
									links += '<li><a href="'+item.links.facebook+'" target="_BLANK"><i class="fui-facebook"></i></a></li>'
								if(item.links.twitter !== "")
									links += '<li><a href="'+item.links.twitter+'" target="_BLANK"><i class="fui-twitter"></i></a></li>'

								var sBlock = '<div class="span3 sBlock"> '+
              								'<div class="sLogo">'+
	              								'<a href="/startups/'+item._id+'" target="_BLANK">'+
	              								startupImage+
	              								'</a>'+
              								'</div>'+
              								'<div class="sText">'+
              								'<h6 class="title">'+item.name+'</h6>'+	
              								'<p class="startup tagline">'+item.tagline+'</p>'+
              								'</div>' + 
              								'<div class="sLinks">'+             								
              								'<hr>'+links+
              								'</div>'+
            								'</div>'
            					
								
								$(".allStarups").find('.span12 .row').append(sBlock)
							})
						},
						error: function(request, errorType, errorMessage){
							//Handle Error
						},
						complete: function(response){
						}
					})
	    		}
			})
		}	
	},
	clickStartup: function(){
		$(".sBlock").on('click', function(){
			var url = $(this).find(".sLogo a").attr('href')
			window.location.replace(url)
		})
	},
	showAllUsers: function(){
		if($(".allUsers").length !== 0){
			var skip = 1,
				pathname = window.location.pathname
			$(window).scroll(function() {
	 		   if($(window).scrollTop() == $(document).height() - $(window).height()) {
	 		   		skip++
	           		$.ajax({
						dataType:'json',
						type:'GET',
						url: pathname+"/"+skip+"/",
						timeout: 15000,
						beforeSend: function(){
						},
						success: function(response){
							var items = response.responseText
							
							$.each(items, function(i,item){
								profileImage = "<i class='fui-user'></i>"
								if(item.provider === 'google')
									profileImage = item.google.picture
								else if(item.provider === 'facebook')
									profileImage = 'https://graph.facebook.com/'+item.facebook.username+'/picture?type=large'
								else if(item.provider === 'linkedin')
									profileImage = item.linkedin.pictureUrl	
            					var links = "<ul class='social-links'>"
								if(item.links.website !== "")
									links += '<li><a href="'+item.links.website+'" target="_BLANK"><i class="fui-home"></i></a></li>'
								if(item.links.googleplus !== "")
									links += '<li><a href="'+item.links.googleplus+'" target="_BLANK"><i class="fui-googleplus"></i></a></li>'
								if(item.links.facebook !== "")	
									links += '<li><a href="'+item.links.facebook+'" target="_BLANK"><i class="fui-facebook"></i></a></li>'
								if(item.links.linkedin !== "")
									links += '<li><a href="'+item.links.linkedin+'" target="_BLANK"><i class="fui-linkedin"></i></a></li>'
								if(item.links.twitter !== "")
									links += '<li><a href="'+item.links.twitter+'" target="_BLANK"><i class="fui-twitter"></i></a></li>'

								var sBlock = '<div class="span3 sBlock"> '+
              								'<div class="sLogo">'+
	              								'<a href="/startups/'+item._id+'" target="_BLANK">'+
	              								profileImage+
	              								'</a>'+
              								'</div>'+
              								'<h6 class="title">'+item.name+'</h6>'+
              								'<p class="startup tagline">'+item.miniresume+'</p>'+
              								'<hr>'+links+
            								'</div>'
            					links = ""
								
								$(".allUsers").find('.span12 .row').append(sBlock)
							})
						},
						error: function(request, errorType, errorMessage){
						},
						complete: function(response){
						}
					})
	    		}
			})
		}	
	}
}

$(function() {
	app.init()
	$('.form-search .typehead').typeahead([
	  {
	    name: 'Search',
	    valueKey: 'name',
	    prefetch:{
	    	url:'/search/all',
	    	ttl:60000
	    },
	    template: '<div class="search-results"><span>{{type}}</span><p>{{name}}</p></div>',
	    engine: Hogan
	  }
	])
	
})







