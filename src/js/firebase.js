// Your web app's Firebase configuration
console.log("Please Wait...Firebase Loading")
const startTime = ~~(Date.now() / 1000)
var firebaseConfig = {
    apiKey: "AIzaSyCFe9RV9CHaR-yqzCwe65K8K8iQKxozLNY",
    authDomain: "smartclassroomjs.firebaseapp.com",
    projectId: "smartclassroomjs",
    storageBucket: "smartclassroomjs.appspot.com",
    messagingSenderId: "356809279066",
    appId: "1:356809279066:web:bf986b4e7cb3c5b2dd3a63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Congratulations, Firebase Successfully Loaded")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.data) {
    	case "starting...": {

		    chrome.tabs.query({currentWindow: true, active: true }, function (tabs) {
		        let ready = false;
		        if (tabs[0].id === sender.tab.id) {
		        	ready = true;
		        }
		        sendResponse({ready: ready});
		    });
		    return true;
    	}
        case "open-url": {
            chrome.tabs.create({ url: request.url })
        }
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
    switch(request.command) {

        case "saveFaceToFirebase": {
            chrome.identity.getAuthToken({'interactive': true}, function(token) {
                chrome.identity.getProfileUserInfo(
                    function(info){

                        if(request.data.length > 0) {
                            console.log(request.data.length)
                            for(let i = 1; i < request.data.length; i++){ 
            
                                var studFace = request.data[i].face;
                                var studName = request.data[0].name;
                                var studID = request.data[0].id;
                                var gender = request.data[0].gender
                                
                                const dbRealTime = firebase.database().ref('RegisteredStudent/' + studID + "-" + studName);
                                dbRealTime.set({
                                    Name: studName,
                                    ID: studID,
                                    Email: info.email,
                                    Gender: gender
                                });
                                
                                //To split out the format of image and get only the face image data
                                const image = studFace.split(',')[1];
                                const metadata = {
                                  contentType: 'image/png',  
                                };
            
                                const dbStorage = firebase.storage().ref('StudentFace/' + studID + "-" + studName + "/" + i + ".png");
                                dbStorage.putString(image, 'base64', metadata).then(snapshot => {
                                    console.log('snapShot',snapshot);
                                    snapshot.ref.getDownloadURL().then(function(downloadUrl) {
                                        const dbFaceRealTime = firebase.database().ref('RegisteredStudent/' + studID + "-" + studName + "/Images/" + i);

                                        dbFaceRealTime.set({
                                            ImageUrl: downloadUrl,
                                            DataUrl: studFace
                                        });
                                    })
                                    
                                }).catch(error => {
                                    console.log(error);
                                });
                            }
                        }
                    }
                );
            });


        }
        case "RetrieveStudentName":{
            var studList = [];

            const dbStud = firebase.database().ref('RegisteredStudent/').on('value', (snapshot) => {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    studList.push({
                        'name': childSnapshot.key,
                        'image': childSnapshot.val().Images
                    })
                });
                console.log(studList)

                sendResponse({
                    response: studList
                });

              }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            }); 

            return true;
        }
        case "SaveStudentAttendance":{
            var curData = request.data
            var fields = curData.split('-')
            var studID = fields[0];
            var studName = fields[1];

            const dbAttd = firebase.database().ref('AttendedStudent/' + request.type + '/' + request.data);

            dbAttd.set({
                Name: studName,
                ID: studID,
                Time: new Date().toLocaleTimeString()
            });
        }
        case "RetrieveStudentAttend":{
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                var attedList = [];
                firebase.database().ref('AttendedStudent/' + request.data).on('value', (snapshot) => {
                    console.log(snapshot.val());
                    snapshot.forEach(function(childSnapshot) {
                        attedList.push({
                            'id': childSnapshot.val().ID,
                            'name': childSnapshot.val().Name,
                            'time': childSnapshot.val().Time
                        })
                    });

                  }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
                }); 
                createSpreadsheet(token, request.data,attedList)
            })
        }
    }
});

//Read Token
function authenticate() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(token)
            }
        })
    })
}

function refreshToken(token, callback) {
    chrome.identity.removeCachedAuthToken({ token: token }, () => {
        Utils.log('Removed cached auth token.')
        chrome.identity.getAuthToken({ interactive: true }, callback)
    })
}
// const notifierMap = new Map()

async function createSpreadsheet(token, code, attend) {
    const body = {
        properties: {
            title: 'Google Meet Facial Attendance',
            spreadsheetTheme: getSpreadsheetTheme(),
        },
    }
    const init = {
        method: 'POST',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    let spreadsheetId = null
    let requests = []
    console.log("Creating new attendance spreadsheet...")
    // const notifierKey = `${className}-${code}`
    // if (!notifierMap.has(notifierKey)) {
    //     notifierMap.set(notifierKey, new Notifier(className, code))
    // }
    // const notifier = notifierMap.get(notifierKey)
    // notifier.post(port, { progress: 0 })
    const newSpreadsheet = await (
        await fetch('https://sheets.googleapis.com/v4/spreadsheets', init)
    ).json()
    if (newSpreadsheet.spreadsheetId == undefined) {
        throw newSpreadsheet.error
    }
    console.log(
        `Successfully created Attendance spreadsheet with id ${newSpreadsheet.spreadsheetId}.`
    )
    chrome.storage.local.set({
        'spreadsheet-id': newSpreadsheet.spreadsheetId,
    })
    spreadsheetId = newSpreadsheet.spreadsheetId
    //requests = requests.concat(updateSheetProperties(className, code, 0, '*'))
    requests = requests.concat(createHeaders(0))
    const icReqs = await initializeCells(code, 0,attend)
    //notifier.post(port, { progress: 0.6 })
    requests = requests.concat(icReqs)
    Utils.log(token)
    console.log(requests)
    Utils.log(spreadsheetId)
    const data = await batchUpdate(token, requests, spreadsheetId, 0)
    //notifier.post(port, { done: true, progress: 1 })
    //notifierMap.delete(notifierKey)
    console.log('Initialize spreadsheet response:')
    console.log(data)
}
