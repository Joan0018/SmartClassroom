var facesCapture = [];
var dataURL;
var studGender = [];
var detectionsStore;

//Capturing face when user click facial registration
function facialRegistration() {

	if(checkValidity()){
		var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		video = document.getElementById('video'),
		vendorUrl = window.URL || window.webkitURL;

		navigator.getUserMedia(
			{ video: {} },
			stream => video.srcObject = stream,
			err => console.error(err)
		)

		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(chrome.runtime.getURL('models/')),
			faceapi.nets.faceLandmark68Net.loadFromUri(chrome.runtime.getURL('models/')),
			faceapi.nets.faceRecognitionNet.loadFromUri(chrome.runtime.getURL('models/')),
			faceapi.nets.faceExpressionNet.loadFromUri(chrome.runtime.getURL('models/')),
			faceapi.nets.ssdMobilenetv1.loadFromUri(chrome.runtime.getURL('models/')),
			faceapi.nets.ageGenderNet.loadFromUri(chrome.runtime.getURL('models/')),
		])

		video.addEventListener('play', function() {
			draw(this, context, 640, 480);
		}, false);

		async function draw(video, context, width, height) {
			
			context.drawImage(video, 0, 0, width, height);

			
			const displaySize = { width: width, height: height }
			faceapi.matchDimensions(context, displaySize)

			detectionsStore = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
			.withFaceLandmarks()
			.withFaceExpressions()
			.withFaceDescriptors()
			.withAgeAndGender()

			if(detectionsStore.length > 0){

				//extractFaceFromBox(video, detectionsStore[0].detection.box)
		
				const resizedDetections = faceapi.resizeResults(detectionsStore, displaySize)
				faceapi.draw.drawDetections(context, resizedDetections)
				faceapi.draw.drawFaceLandmarks(context, resizedDetections)
				faceapi.draw.drawFaceExpressions(context, resizedDetections)

				resizedDetections.forEach( detection => {
					const box = detection.detection.box
					const drawBox = new faceapi.draw.DrawBox(box, { label: detection.gender })
					studGender.push({
						'gender':detection.gender
					})
					drawBox.draw(canvas)
				})
			}
			setTimeout(draw, 100, video, context, width, height);
		}
	}
	else{
		console.log("Error Detected")
	}
}


// async function removeBg(video, context, width, height) {

// 	//  ? Loading BodyPix w/ various parameters
//     const net = await bodyPix.load({
//         architecture: 'MobileNetV1',
//         outputStride: 16,
//         multiplier: 0.75,
//         quantBytes: 2
//     });

//     // ? Segmentation occurs here, taking video frames as the input
//     const segmentation = await net.segmentPerson(video, {
//         flipHorizontal: false,
//         internalResolution: 'medium',
//         segmentationThreshold: 0.5
//     });


//     // Convert the segmentation into a mask to darken the background.
//     const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
//     const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
//     const backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor, false);

//     // const opacity = 0.7;
//     // const maskBlurAmount = 3;
//     // const flipHorizontal = false;
//     compositeFrame(backgroundDarkeningMask, video, context, width, height);
//     // requestAnimationFrame(removeBg);
//     // bodyPix.drawMask(canvas, video, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
// }
// async function compositeFrame(backgroundDarkeningMask, video, context, width, height) {
//     if (!backgroundDarkeningMask) return;
//     // composite the segmentation mask on top
//     context.globalCompositeOperation = 'destination-over';
//     context.putImageData(backgroundDarkeningMask, 0, 0);
//     // composite the video frame
//     context.globalCompositeOperation = 'source-in';
//     context.drawImage(video, 0, 0, width, height);
// }



//Add the face being capture into an Array 

function addFaceCaptured(){
    var studName = document.querySelector('.student-name').value;
	var studID = document.querySelector('.student-id').value;
	var studFace = dataURL;
	var malePredict = [];
	var femalePredict = [];

	studGender.forEach( gender => {

		if(gender.gender == "male"){
			malePredict.push({
				'gender':gender.gender
			})
		}
		else if (gender.gender == "female"){
			femalePredict.push({
				'gender':gender.gender
			})
		}
	})

	if(facesCapture.length > 5 ){
		console.log("5 Images have been capture")
	}
	else{
		
		
		if(studName != "" && studFace != "" && studID != ""){

			if(malePredict.length > femalePredict.length){
				facesCapture.push({
					'name': studName,
					'id': studID,
					'gender': "Male",
					'face': studFace
				});
			}
			else if(femalePredict.length > malePredict.length){
				facesCapture.push({
					'name': studName,
					'id': studID,
					'gender': "Female",
					'face': studFace
				});
			}

		}
	}
}

// This function extract a face from video frame with giving bounding box and display result into output image
async function extractFaceFromBox(inputImage, box){ 
	const regionsToExtract = [
		new faceapi.Rect( box.x - 10, box.y - 70, box.width + 75, box.height + 100)
	]
						
	let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)

	if(faceImages.length == 0){
		console.log('Face not found')
	}
	else
	{
		faceImages.forEach(cnv =>{     
			dataURL = cnv.toDataURL();      
		})
	}   
} 

//Store the face by passing the array through sending message (Process will be taken in firebase.js)
function storeFaceCaptured(){

    if(facesCapture.length > 0){
        chrome.runtime.sendMessage({command: "saveFaceToFirebase", data:facesCapture}, (response) => {
            facesCapture = [];
			console.log("Save Student Face To Firebase Database")
        });
    }
    else{
        console.log("No Face Captured")
    }

}

//To Validate the user Input for Student anme and Student ID
function checkValidity(){

	const studIDKey = /^[0-9]{2}[A-Z]{3}[0-9]{5}?$/; //True consider correct format
	const studNameKey1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; //False consider correct format
	const studNameKey2 = /\d/; //False consider correct format

	
	if(document.querySelector('.student-name').value == ""){
		alert("Null Value Detected for Student Name \nStudent Name is Required")
	}
	else if(studNameKey1.test(document.querySelector('.student-name').value) && studNameKey2.test(document.querySelector('.student-name').value)){
		alert("Wrong Format Detected for Student Name \nOnly Alphabet is Acceptable")
	}
	else if(document.querySelector('.student-id').value == ""){
		alert("Null Value Detected for Student ID \nStudent ID is Required")

	}else if(!studIDKey.test(document.querySelector('.student-id').value)){
		alert("Wrong Format Detected for Student ID \nStudent ID Format: XXWMRXXXXX")
	}
	else{
		return true;
	}
	return false;
}

//To take the photo of the student face
function takeFacialPhoto(){

	if(detectionsStore.length > 0){

		extractFaceFromBox(video, detectionsStore[0].detection.box);
		console.log(detectionsStore)

		addFaceCaptured();
	}
	
}