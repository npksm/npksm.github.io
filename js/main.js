var token = 'IGQVJVdHNqSmdtMnpkSzZAvZAGpfZAWhPSktkQW1zS016b1V2TEJKRlJ2b2FBdVF4NEYzLWR1QjZAaRlhfcHU1QTZABM0xiR3FfTnJsSHBVU2JfSmNTYnVLUjdaeENOM0FtNmtTeFMxOHNrYzVKLWdaNVFFdTM0cEh0QTJsUUlJ',
	userid = 17306901306,
	id,
	media_url,
	caption;  

$.get(
	'https://graph.instagram.com/me/media?fields=id,media_url, caption&access_token=' + token,
	function(data, status){
		alert("Status: " + status);
		$("posts").append("<p> "Data: "+ data </p>");
	});