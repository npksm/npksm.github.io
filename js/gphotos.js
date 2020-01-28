var settings = {
  "url": "https://photoslibrary.googleapis.com/v1/albums",
  "method": "GET",
  "timeout": 0,
 
};

$.ajax(settings).done(function (response) {
    console.log(response)

});