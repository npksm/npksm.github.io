$(function(){
	$(".thumb").click(function(){
		$("#content").html('<iframe id="iframe" src:"'+thumb.src+'" width ="560" height="315"></iframe>');
	});
});