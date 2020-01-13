var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {		
	$.each(response, function(index, value){
		console.log("index: " +index+"\n value: " + value+ "\n index.name " +index.name) 
		//$('#albums').html('<p>'response.data[x].name'</p>');
		});
});