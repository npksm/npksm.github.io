//function getPage

function postImage(){
	$.ajax({
		url:"imagepost.html",
		type: "POST",
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
	})
};

	