var token = 'IGQVJVdHNqSmdtMnpkSzZAvZAGpfZAWhPSktkQW1zS016b1V2TEJKRlJ2b2FBdVF4NEYzLWR1QjZAaRlhfcHU1QTZABM0xiR3FfTnJsSHBVU2JfSmNTYnVLUjdaeENOM0FtNmtTeFMxOHNrYzVKLWdaNVFFdTM0cEh0QTJsUUlJ',
	userid = 17306901306, 
	num_photos = 5; 

$.ajax({
	url: 'https://graph.instagram.com/me/media?fields=id,media_url, caption&access_token=' + token, // or /users/self/media/recent for Sandbox
	dataType: 'jsonp',
	type: 'GET',
	data: { media_url},
	success: function (data) {
		console.log(data);
		for (x in data.data) {
			$('ul').append('<li><img src=' + data + '></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
			// data.data[x].images.thumbnail.url - URL of image 150х150
			// data.data[x].images.standard_resolution.url - URL of image 612х612
			// data.data[x].link - Instagram post URL 
		}
	},
	error: function (data) {
		console.log(data); // send the error notifications to console
	}
});