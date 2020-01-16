var settings = {
  "url": "https://api.imgur.com/3/account/me/images",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 27d067e9b81601874a49408b277dbd4641ae825c"
  },
};

var modal = document.getElementById("myModal");

$.ajax(settings).done(function (response) {
	console.log(response)
    var modal = document.getElementById("myModal");
				for (x in response.data){			
					$('#posts').append('<a class="post"><!-- <div class="postid">'+response.data[x].id+'</div>--><img class="thumb" alt="'+response.data[x].name+'" src="https://i.imgur.com/'+response.data[x].id+'m.jpg" ></a>');
				}
             
    $(".thumb").click(function(){
		        modal.style.display = "block";
                captionText.innerHTML = this.alt;
		});
        
        $(".close").click(function(){
            modal.style.display="none";
		})

});


