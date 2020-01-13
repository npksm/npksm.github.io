var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {
	console.log(response)	
		
				for (x in response.data){			
					$('#posts').append('<a class="post" href="'i'""><img class="thumb" src="https://i.imgur.com/'+response.data[x].id+'m.jpg"></a>');
				}
		
});

