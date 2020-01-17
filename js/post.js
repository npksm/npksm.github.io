$(document).ready(function(){
    var queryString = new Array();
        $(function(){
            if(queryString.length=0){
                if (window.location.search.split('?').length > 1) {
                    var params = window.location.search.split('?')[1].split('&');
                        for (var i = 0; i < params.length; i++) {
                            var key = params[i].split('=')[0];
                            var value = decodeURIComponent(params[i].split('=')[1]);
                                queryString[key] = value;
		                }
                }
            }
        }
            var albumid= queryString["ID"];
});

console.log(albumid)

var albumURL = "https://api.imgur.com/3/album/'+albumid+'/images"

var settings = {
  "url": albumURL,
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
    var captionText = document.getElementById("caption");
    var modalImg = document.getElementById("modalImg");
				for (x in response.data){			
					$('#posts').append('<a class="post"><div class="postid">'+response.data[x].id+'</div><img class="thumb" alt="'+response.data[x].name+'" src="https://i.imgur.com/'+response.data[x].id+'m.jpg" data-source="https://i.imgur.com/'+response.data[x].id+'.jpg"></a>');
				}
             
    $(".thumb").click(function(){
		        modal.style.display = "block";
                modalImg.src= this.getAttribute('data-source');
                captionText.innerHTML = this.alt;
		});
        
        $(".close").click(function(){
            modal.style.display="none";
		})

});