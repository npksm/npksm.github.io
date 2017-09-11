$(function () {
  'use strict'

  // Load images from flickr:
  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
      format: 'json',
      method: 'flickr.people.getPublicPhotos',
      user_id: '132594008@N04',
      api_key: 'b8d48b0baa7975b719341d7932ca80b1'
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var carouselLinks = []
    var linksContainer = $('#links')
    var baseUrl
    // Add the demo images as links with thumbnails to the page:
    $.each(result.photos.photo, function (index, photo) {
      baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
      photo.server + '/' + photo.id + '_' + photo.secret
      $('<a/>')
        .append($('<img>').prop('src', baseUrl + '_s.jpg'))
        .prop('href', baseUrl + '_b.jpg')
        .prop('title', photo.title)
        .attr('data-gallery', '')
        .appendTo(linksContainer)
      carouselLinks.push({
        href: baseUrl + '_c.jpg',
        title: photo.title
      })
    })

    // Initialize the Gallery as image carousel:
    blueimp.Gallery(carouselLinks, {
      container: '#blueimp-image-carousel',
      carousel: true
    })
  })

})