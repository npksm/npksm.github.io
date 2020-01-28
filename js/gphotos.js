var settings = {
  "url": "https://photoslibrary.googleapis.com/v1/albums",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "idk"
  },
};

$.ajax(settings).done(function (response) {
    console.log(response)

});