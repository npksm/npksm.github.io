$(function () {
  'use strict'

  // Load images
  $.ajax({
  	url: 'https://api.imgur.com/3/album/3diZT/images'
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
  	$.each(result.photos.photo, function(index, photo){
  		baseUrl = 'imgur.com/a'
  	})
  	
  })