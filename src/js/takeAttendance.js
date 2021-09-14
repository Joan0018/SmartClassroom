var studentList = [];
var labels = [];
var attendedStud;

function getNameList(){
    chrome.runtime.sendMessage({command: "RetrieveStudentName"}, (response) => {
        Utils.log("Retrieve Student Name List From Firebase Database")
        if (response.response.length > 0){
            for(let i = 0; i < response.response.length; i++){
                studentList.push({
                    'name': response.response[i].name,
                    'image': response.response[i].image
                })
            }
        }
    });
}


function facialAttendance(){
    getNameList();
    var canvas = document.getElementById('canvasAttd'),
    context = canvas.getContext('2d'),
    video = document.getElementById('videoAttd'),
    vendorUrl = window.URL || window.webkitURL;

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceLandmark68Net.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceRecognitionNet.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceExpressionNet.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.ssdMobilenetv1.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.ageGenderNet.loadFromUri(chrome.runtime.getURL('src/models/')),
    ])

    video.addEventListener('play', function() {
        draw(this, context, 640, 480);
    }, false);


    async function draw(video, context, width, height) {
        
            context.drawImage(video, 0, 0, width, height); 
            const displaySize = { width: width, height: height }
            faceapi.matchDimensions(context, displaySize)
    
            if(studentList.length > 0){
                const labeledFaceDescriptors = await loadLabeledImages()
                const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.9)
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors()
        
                if(detections.length > 0){
                    const resizedDetections = faceapi.resizeResults(detections, displaySize)
                    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
                    
                    results.forEach((result, i) => {
                        const box = resizedDetections[i].detection.box
                        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                        drawBox.draw(context)
                        attendedStud = result.label
                    })
                }
                setTimeout(draw, 500, video, context, width, height);
            }
    }
    

    
}

function saveAttendance(){

    if(attendedStud != null){
        alert("Attendance " + attendedStud + " is taken.");
        clearVideo();
        stopWebCamera();
        document.getElementById('takeAttendanceCard').style.visibility = 'hidden';
        let meetingCode = getMeetCode();
        chrome.runtime.sendMessage({command: "SaveStudentAttendance", data: attendedStud, type: meetingCode, email: currentEmail, time: Date.now()}, (response) => {
            Utils.log("Take Student Attendance");
        });
    
        studentList = [];
        labels = [];
    }else{
        alert("Sorry, there is an error occured. Please try again");
    }



}

function loadLabeledImages() {

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceLandmark68Net.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceRecognitionNet.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.faceExpressionNet.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.ssdMobilenetv1.loadFromUri(chrome.runtime.getURL('src/models/')),
        faceapi.nets.ageGenderNet.loadFromUri(chrome.runtime.getURL('src/models/')),
    ])


    studentList.forEach((name, i) =>{
        labels[i] = name.name
    })

    console.log(labels)
    var x = 0;

    if(labels.length > 0){
        return Promise.all(

            labels.map(async label => {
                const descriptions = []
                    
                for(let i = 1; i < 6; i++){
                    const img = await faceapi.fetchImage(studentList[x].image[i].DataUrl)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                        
                    descriptions.push(detections.descriptor)
                }
    
                if(x < studentList.length){
                    x++;
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
                   
            })
    
    
        )
    }

}