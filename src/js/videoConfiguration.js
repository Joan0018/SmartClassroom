//Clear the previous canvas view 
function clearVideo(){
	var canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 640, 480);

	var canvas = document.getElementById('canvasAttd')
	const ctx2 = canvas.getContext('2d');
	ctx2.clearRect(0, 0, 640, 480);
}

//Disable Web Camera after the user end capturing face
function stopWebCamera(){

	video = document.getElementById('video'),
	videoAttd = document.getElementById('videoAttd'),
	vendorUrl = window.URL || 
	window.webkitURL;

	const stream = video.srcObject;
	const streamAttd = videoAttd.srcObject;

	if(stream != null ){
		const tracks = stream.getTracks();
		

		if(tracks != null){
			tracks.forEach(function(track) {
				track.stop();
			});
		}
	}
	
	if(streamAttd!= null){
		const tracks = streamAttd.getTracks();

		
		if(tracks != null){
			tracks.forEach(function(track) {
				track.stop();
			});
		}
	}



	video.srcObject = null
}