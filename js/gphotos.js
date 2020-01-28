var settings = {
  "url": "https://photoslibrary.googleapis.com/v1/albums",
  "method": "GET",
  "timeout": 0,
  
    "web":{"client_id":"82019015804-1pmmkaagakpnqb10qls0s7elk4063p0s.apps.googleusercontent.com","project_id":"npksm-1578767982793","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"xNNgnfSWZMcMRL--wi6IjaLy","javascript_origins":["http://npksm.github.io"]}
};

$.ajax(settings).done(function (response) {
    console.log(response)

});