var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {
				for( x in response.data){
					$('#imgurphotos').html('<a class="post"><img class="thumb" src="'+response.data[x].link+'"></a>');
					$('#imagepost').html('<img id="ii" src="'+response.data[x].link+'"></img>');
					$('#words').html('<p> '+response.data[x].name+'></p>');
					console.log(response.data);
				}

});