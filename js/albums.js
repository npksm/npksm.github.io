var settings = {
  "url": "https://api.imgur.com/3/account/me/albums",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

$.ajax(settings).done(function (response) {
	console.log(response)	
				for (x in response.data){			
					$('#albums').append('<a class="post"><img class="thumb" id="'+response.data[x].id+'" src="https://i.imgur.com/'+response.data[x].cover+'m.jpg"></a>');
				}
					$(".thumb").click(function(){
						var thisSRC = this.id;
						$("#content").html('<iframe id="iframe" class="fill" src="https://i.imgur.com/a/'+thisSRC+'" width ="560" height="315"></iframe>');
					})

		
});