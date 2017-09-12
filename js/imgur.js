$(function () {
  'use strict'

  // Load images
  $.ajax({
  	url: 'https://api.imgur.com/3/account/npksm/images'
  	data:{
  		format: 'json',
  		method: 'GET',
  		headers: {
  			'authorization': ' Bearer {{65c27bf7c3674760152a8201788f33691de22a3b}}'
  	},
  	dataType: 'jsonp',
  	jsonp: 'jsoncallback'
  }).done(function(result){
  	var carouselLinks = []
  	var linksContainer = $('#links')
  	var baseUrl
  	//add images as links with thumbnails
  	$.each(result, function(index, photo){
  		$('<a/>')
                .append($('<img').prop('src', result.link))
                .prop('href', result.link)
                .prop('title', result.title)
                .attr('data-gallery', '')
                .appendTo(linksContainer)
              CarouselLinks.push({
                href: result.link + '_c.jpg',
                title: result.title
              })
  	})
  	
  })
