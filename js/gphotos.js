var settings = {
  "url": "https://photoslibrary.googleapis.com/v1/albums",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer 82019015804-1pmmkaagakpnqb10qls0s7elk4063p0s.apps.googleusercontent.com"
  },
};

$.ajax(settings).done(function (response) {
    console.log(response)

});