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
					$('#albums').append('<a class="post"><!-- <div class="postid">'+response.data[x].link+'</div>--><img class="thumb" title="'+response.data[x].title+'" src="https://i.imgur.com/'+response.data[x].cover+'m.jpg" data-source="'+response.data[x].link+'"><div id="title"></div></a>');                            
				}

					$(".thumb").click(function(){
                        Response.Redirect("WebForm2.aspx?Name="+this.title+"&ID="+this.getAttribute('data-source'));
                    })

});