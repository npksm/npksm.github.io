var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {
	$.each(response.data, function(x){
				for (x in response.data){			
					$('#posts').html('<a class="post"><img class="thumb" src="'+response.data[x].link+'"></a>');
					//$('#imagepost').html('<img id="ii" src="'+response.data[x].link+'"></img>');
					//$('#words').html('<p> '+response.data[x].name+'></p>');		
				}	
				});

});

var settings = {
  "url": "https://api.imgur.com/3/account/npksm/albums/",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": ["Client-ID 3bb96a2eb726cfe", "Client-ID 3bb96a2eb726cfe"]
  },
};

$.ajax(settings).done(function (response) {
  		for (x in response.data){			
					$('#albums').html('<a class="post" src="'response.data[x].link'""><img class="thumb" src="i.imgur.com/'+response.data[x].cover+'"></a>');

  			}
});