var settings = {
  "url": "https://photoslibrary.googleapis.com/v1/albums",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "AIzaSyCGVzXHPuGPmfZrhf_SA2LU3Zs7fpXkSN8"
  },
};

$.ajax(settings).done(function (response) {
    console.log(response)

});