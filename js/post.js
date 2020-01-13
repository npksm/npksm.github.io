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
			console.log("index: " +index+"\n value: " + value + "\n response.data[x].name "+ response.data[x].name) 
			$.ajax({
				url:"imagepost.html",
				type: "GET",
				dataType: "text",
				success: function (response){
					console.log('the page was loaded', response);
				},
				error: function(error){
					console.log('the page was NOT loaded', error);
				},
				complete: function(xhr, status){
					console.log("The request is complete!");
				}			
			});
			//$('#albums').append('<a class="post"><img class="thumb" src="'+response.data[x].link+'"></a>');
			});
	}
});