var token = 'IGQVJVMVY5NHJjQTd1UEEtT3ZAzZAXhyN01jR0ZATNnk4YUVxTnRpSkpMSVVQV0hxaFZAfa0l4Vy1vTlJkYkFJOTlLX0RJOEY1REJDVWttLWJtX1AyVzg0REcxVU1JZAmkzQktIb2JGZAS15eWNwWlA3VTdwV0R4V2k4V0poUElF',
	userid = 17306901306, 
	num_photos = 5; 

$.ajax({
	url: 'https://api.instagram.com/v1/users/' + self + '/media/recent', // or /users/self/media/recent for Sandbox
	dataType: 'jsonp',
	type: 'GET',
	data: { access_token: token, count: num_photos },
	success: function (data) {
		console.log(data);
		for (x in data.data) {
			$('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
			// data.data[x].images.thumbnail.url - URL of image 150х150
			// data.data[x].images.standard_resolution.url - URL of image 612х612
			// data.data[x].link - Instagram post URL 
		}
	},
	error: function (data) {
		console.log(data); // send the error notifications to console
	}
});