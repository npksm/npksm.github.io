function getPage(){
	$.ajax({
		url:"imagepost.html",
		type: "GET",
		dataType: "text",
			success: function (response){
					console.log('the page was loaded', response);
					$('.content').html(response);
			},
			error: function(error){
					console.log('the page was NOT loaded', error);
			},
			complete: function(xhr, status){
					console.log("The get request is complete!");
			}			
	})
};

function postImage(){
	$.ajax({
		url:"imagepost.html",
		type:"POST",
		dataType: "text",
			success: function (response){
					console.log('the page was posted', response);
			},
			error: function(error){
					console.log('the page was NOT posted', error);
			},
			complete: function(xhr, status){
					console.log("The post request is complete!");
			}
	})
};

	