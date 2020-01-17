
  $(document).ready(function () {  
        var name = GetParameterValues('Name');  
        var id = GetParameterValues('ID');  
        alert("Hello " + name + " your ID is " + id);  
        function GetParameterValues(param) {  
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            }  
        }  
    }); 