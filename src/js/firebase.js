/**
 * Chrome Extension Firebase Configuration
 */
 var firebaseConfig = {
    apiKey: "AIzaSyCFe9RV9CHaR-yqzCwe65K8K8iQKxozLNY",
    authDomain: "smartclassroomjs.firebaseapp.com",
    projectId: "smartclassroomjs",
    storageBucket: "smartclassroomjs.appspot.com",
    messagingSenderId: "356809279066",
    appId: "1:356809279066:web:bf986b4e7cb3c5b2dd3a63"
};

/**
 * Initialize Firebase
 */
firebase.initializeApp(firebaseConfig);

var startTime;

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
                    if(request.data.length > 0) {

                        for(let i = 1; i < request.data.length; i++){ 
            
                                var studFace = request.data[i].face;
                                var studName = request.data[0].name;
                                var studID = request.data[0].id;
                                var gender = request.data[0].gender
                                
                                const dbRealTime = firebase.database().ref('RegisteredStudent/' + studID + "-" + studName);
                                dbRealTime.set({
                                    Name: studName,
                                    ID: studID,
                                    Email: request.email,
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
            var studName = fields[1].toUpperCase();
            const attend = firebase.database().ref('AttendedStudent/' + request.type + '/' + request.data);

            chrome.storage.sync.get(['start'], function(result) {
                attend.set({
                    Name: studName,
                    ID: studID,
                    Email: request.email,
                    TakeTime: new Date().toLocaleTimeString(),
                    StartTime: result.start,
                    EndTime: ""
                });
            });
        }
        case "RetrieveStudentAttend":{
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                var attendList = [];
                firebase.database().ref('AttendedStudent/' + request.data).on('value', (snapshot) => {
                    snapshot.forEach(function(childSnapshot) {
                        attendList.push({
                            'id': childSnapshot.val().ID,
                            'name': childSnapshot.val().Name,
                            'email': childSnapshot.val().Email,
                            'start': childSnapshot.val().StartTime,
                            'take': childSnapshot.val().TakeTime,
                            'end': childSnapshot.val().EndTime
                        })
                    });

                  }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
                }); 
                
                createSpreadsheet(clientToken, request.data,attendList, request.sheet, request.meetCode, request.currentTime)

            })
        }
        case "RetrieveStudentAttdDetail":{
            var attedListDetail = [];
            firebase.database().ref('AttendedStudent/' + request.data).on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    attedListDetail.push({
                        'name': childSnapshot.val().Name,
                        'time': childSnapshot.val().StartTime
                    })
                });
                sendResponse({
                    response: attedListDetail
                });

                }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
            }); 
        }
        case "checkSheetCode":{
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: MANAGEMENT_SPREADSHEET_ID,
                    range: MANAGEMENT_SPREADSHEET_TAB_NAME,
                }).then(function (response) {

                    Utils.log(`Got ${response.result.values.length} rows back`);

                    const programmeAvailable = (response.result.values);
                    programmeAvailable.shift(); // Remove title row in Sheet from the array

                    for (let i = 0; i < programmeAvailable.length; i++) {
                        if (request.data === programmeAvailable[i][0]) {
                            sendResponse({
                                response: programmeAvailable[i][2]
                            });
                            break;
                        }
                    }
                    
                }, function (error) {
                    console.log('Error', error)
                });
            })
        }
        case "user-leave":{
            if(request.active){
                const dbAttd = firebase.database().ref('AttendedStudent/' + request.type + '/' + request.active);
                dbAttd.update({
                    'EndTime': request.data
                })
            }

        } 
    }
});

/**
 * 
 * @returns {String} token
 */
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

/**
 * 
 * @param {*} token 
 * @param {*} callback 
 * Refresh Token
 */
function refreshToken(token, callback) {
    chrome.identity.removeCachedAuthToken({ token: token }, () => {
        Utils.log('Removed cached auth token.')
        chrome.identity.getAuthToken({ interactive: true }, callback)
    })
}


/**
 * 
 * @param {String} token - Token generate from Chrome
 * @param {String} code - Current Meeting Code
 * @param {String} attend - String array which store the current student Attend
 */
 async function createSpreadsheet(token, code, attend, sheet, meetCode, currentTime) {
    if(attend.length > 0){
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
        let spreadsheetId = sheet;
        let sheetId = 0;
        let requests = []
        requests = requests.concat(createHeaders(sheetId))
        const icReqs = await initializeCells(code, sheetId,attend)
        requests = requests.concat(icReqs)
        const data = await batchUpdate(token, requests, spreadsheetId, sheetId)
        console.log('Initialize spreadsheet response:')
        console.log(data)
        if(data == null){
            updateSpreadsheet(token, code, attend, sheet, meetCode, currentTime)
        }

    }
    
}

async function updateSpreadsheet(token, code, attend, spreadsheetId, meetCode, currentTime) {
    let requests = [];
    let sheetName = `${meetCode}??${new Date().toLocaleTimeString()}`;
    Utils.log('Updating spreadsheet...')

        let sheetId
        const spreadsheet = await getSpreadsheet(token, spreadsheetId)
        sheetId = 
            spreadsheet.sheets.reduce(
                (acc, sheet) => Math.max(acc, sheet.properties.sheetId),
                0
            ) + 1
        requests = requests.concat(addSheet(sheetName))
        // requests = requests.concat(createHeaders(sheetId))
        Utils.log(`Creating new sheet for class ${code}, ID ${sheetId}`)

    let data = await batchUpdate(token, requests, spreadsheetId, 0);

    let spreadsheetProperties = data.updatedSpreadsheet.sheets;
    let maxlength = data.updatedSpreadsheet.sheets.length
    let sheetID = spreadsheetProperties[maxlength - 1].properties.sheetId;

    editSpreadSheet(token, code, attend, spreadsheetId, sheetID);
}

async function editSpreadSheet(token, code, attend, sheet, sheetId){

    if(attend.length > 0){
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
        let spreadsheetId = sheet;
        let requests = []
        requests = requests.concat(createHeaders(sheetId))
        const icReqs = await initializeCells(code, sheetId,attend)
        requests = requests.concat(icReqs)
        const data = await batchUpdate(token, requests, spreadsheetId, sheetId)
        console.log('Initialize spreadsheet response:')
        console.log(data)
        if(data == null){
            console.log("null");
        }

    }
}
