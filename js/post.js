$.ajax({
	url:"https://npksm.github.io",
	type: "GET",
	//dataType: "text",
		success: function (response){
				console.log('the page was loaded', response);
				//$('#postimg').append(response);
		},
		error: function(error){
				console.log('the page was NOT loaded', error);
		},
		complete: function(xhr, status){
				console.log("The get request is complete!");
		}			
	});

	