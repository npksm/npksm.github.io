var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {	
	for (x=0;x<10;x++){
		$.each(response, function(index, value){
			console.log("index: " +index+"\n value: " + value + "\n response.data[x].name "+ response.data[x].name) 
			$('#albums').append('<a class="post"><img class="thumb" src="'+response.data[x].link+'"></a>');
			});
	}
});