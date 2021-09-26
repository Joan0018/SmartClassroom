/**
 * To get the current google meet joined user's email
 */
const currentEmail = document.getElementsByClassName("Duq0Bf")[0].innerHTML;
/**
 * Initialize variables needed for attendance tracker
 */
 var studentsNameSet = [];
 let studentCurrentAttend = getStudentAttendDetail();

 /**
 * Initialize when meeting starts
 * Check whether the google meet start
 * Get the start time when google meet start
*/
const readyObserver = new MutationObserver(function (mutations, me) {
    if (document.getElementsByClassName('c8mVDd')[0]) {
        initialize();
        me.disconnect();
    }
})

readyObserver.observe(document.getElementsByClassName('crqnQb')[0], {
    childList: true,
    subtree: true,
});

/**
 * Initialize the startup language
 */
chrome.storage.sync.get(null, function(result) {
    if (!result['lang']) {
        chrome.storage.sync.set({'lang': 'en'}, null);
    }
});

/**
 * Initialize the interface
 */
function initialize() {
    chrome.runtime.sendMessage(
        {
            data: 'starting...',
        },
        function (response) {
            if (response.ready) {
                /**
                 * Initialize the start time of the user joined and send to bakcground
                 */
                const startTime = new Date().toLocaleTimeString();
                chrome.storage.sync.set({start: startTime}, function() {
                    console.log('Start Time is set to ' + startTime);
                });
                /**
                 * To draw and Initialize the side bar in the google meet
                 */
                const panelContainer = document.querySelector('.R3Gmyc.qwU8Me')
                document
                    .querySelector('[jsname="HlFzId"]')
                    .insertAdjacentHTML('afterend', panelHTML)
                const attendancePanel = document.getElementById('panel')

                const ariaPressedObserver = new MutationObserver(
                    (mutations, me) => {
                        mutations[0].target.setAttribute('aria-pressed', false)
                        me.disconnect()
                    }
                )
                const ariaPressedObserverOptions = {
                    attributes: true,
                    attributeFilter: ['aria-pressed'],
                    attributeOldValue: true,
                }
                const panelUnhiddenObserver = new MutationObserver(
                    (mutations, me) => {
                        const mutation = mutations[0]
                        const target = mutation.target
                        if (
                            mutation.oldValue.includes('qdulke') &&
                            !target.classList.contains('qdulke')
                        ) {
                            target.classList.add('qdulke')
                            attendancePanel.classList.remove('qdulke')
                            me.disconnect()
                        }
                    }
                )
                const panelSpawnedObserver = new MutationObserver(
                    (mutations, me) => {
                        const mutation = mutations[0]
                        if (mutation.addedNodes.length > 0) {
                            const addedNode = mutation.addedNodes[0]
                            if (addedNode.getAttribute('data-tab-id') === '5') {
                                addedNode.classList.add('qdulke')
                                attendancePanel.classList.remove('qdulke')
                                me.disconnect()
                            }
                        }
                    }
                )

                document
                    .querySelector('.r6xAKc')
                    .insertAdjacentHTML('afterend', buttonHTML)

                const infoButton = document.querySelector('.r6xAKc button')
                definePressedProperty(infoButton)

                const attendanceButton = document.getElementById('attendance')
                definePressedProperty(attendanceButton)

                infoButton.addEventListener('click', (event) => {
                    if (!infoButton.pressed) {
                        if (!attendanceButton.pressed) {
                            ariaPressedObserver.observe(
                                attendanceButton,
                                ariaPressedObserverOptions
                            )
                        } else {
                            event.stopPropagation()
                            infoButton.pressed = true
                            document
                                .querySelector('[data-tab-id="5"]')
                                .classList.remove('qdulke')
                            attendanceButton.pressed = false
                            attendancePanel.classList.add('qdulke')
                        }
                    }
                })

                attendanceButton.addEventListener('click', (event) => {
                    if (!attendanceButton.pressed) {
                        const infoPanel =
                            document.querySelector('[data-tab-id="5"]')
                        if (infoPanel === null) {
                            panelSpawnedObserver.observe(panelContainer, {
                                childList: true,
                            })
                            attendanceTracker();
                        } else {
                            
                            attendanceTracker();
                            panelUnhiddenObserver.observe(
                                document.querySelector('[data-tab-id="5"]'),
                                {
                                    attributes: true,
                                    attributeFilter: ['class'],
                                    attributeOldValue: true,
                                }
                            )
                        }
                        if (!infoButton.pressed) {
                            ariaPressedObserver.observe(
                                infoButton,
                                ariaPressedObserverOptions
                            )
                        } else {
                            event.stopPropagation()
                            infoButton.pressed = false
                            document
                                .querySelector('[data-tab-id="5"]')
                                .classList.add('qdulke')
                            attendanceButton.pressed = true
                            attendancePanel.classList.remove('qdulke')
                        }
                    }
                })

                const exportButton = document.getElementById('export')
                exportButton.addEventListener('click', () => {
                    const sheetCode = document.getElementsByClassName("mdc-text-field__input")[0].value
                    const msg = document.getElementById("errMsg");
                    if(sheetCode !== ""){
                        if(/^\d{6}$/.test(sheetCode)){
                            chrome.runtime.sendMessage({command: "checkSheetCode", data:sheetCode}, (response) => {
                                msg.innerHTML = "connecting...";
                                Utils.log("Check and Assign Spreadsheet ID");
                                var code = getMeetCode();
                                chrome.runtime.sendMessage({
                                    command: 'RetrieveStudentAttend',
                                    data: code,
                                    sheet: response.response,
                                    meetCode: getMeetCode(),
                                    currentTime: getCurrentTime()
                                })
                                
                            });
                            msg.innerHTML = "invalid sheet code...";
                        }
                        else{
                            msg.innerHTML = "6-digits Sheet Code Required";
                        }
                    }
                    else{
                        msg.innerHTML = "Please Enter the Sheet Code";
                    }
                })

                initializePanel();
                /**----------------------------------------End of Initialize the side bar------------------------------------------------------ */
                
                /**Get the whole screen of the Google Meet*/
                const screen = document.getElementsByClassName('crqnQb')[0];

                /**Add the Facial Registration Card*/
                screen.insertAdjacentHTML('afterbegin', registerFaceHTML);
                document.getElementById('registerFaceCard').style.visibility = 'hidden';
                
                /**Add the Take Attendance Card*/
                screen.insertAdjacentHTML('afterbegin', takeAttendanceHTML);
                document.getElementById('takeAttendanceCard').style.visibility = 'hidden';

                /**Add the Overall Analysis Card (Haven Start Yet)*/
                screen.insertAdjacentHTML('afterbegin', deleteHTML);
                document.getElementById('card3').style.visibility = 'hidden';

                /**Adding functions to save and cancel button*/
                document.getElementById('Ok').addEventListener('click', registerStudentFace, false);
                document.getElementById('Ok-track').addEventListener('click', saveAttendance, false);
                document.querySelectorAll('.Cancel').forEach((element) => {
                    element.addEventListener('click', cancelCard, false);
                });

                //For registerFaceCard and takeAttendanceCard function listener
                document.getElementById('SRF').addEventListener('click', facialRegistration, false);
                document.getElementById('TP').addEventListener('click', takeFacialPhoto, false);
                document.getElementById('SCF').addEventListener('click', facialAttendance, false);
                
                updateCards();
                wait4Meet2End();
            }
        }
    );
}

/**
 * Display card on top of google meet screen
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    Utils.log (request);
    switch(request.data) {
        case 'translate': {
            updateCards();
            break;
        }
        case 'register-face': {
             /**
             * Assume the student name entered in follow the google meet registered name
             */
            alert("Please Enter Full Name and Student ID as Registered \nFormat of Input: \r\nName: XXXX XXXX XXXX \r\nStudent ID: XXWMRXXXXX \r\nClick the take photo button once you are ready")
            document.getElementById('registerFaceCard').style.visibility = 'visible';
            break;
        }
        case 'take-attendance': {
            alert("Please Show your face in front of camera with enough light source")
            document.getElementById('takeAttendanceCard').style.visibility = 'visible';
            break;
        }
    }
});

/**
 * 
 * @param {Date} v 
 * @returns {String} - Minutes of time in 2 places
 */
function twod(v) {
    return ('0'+Number(v)).slice(-2);
}

/**
 * 
 * @param {Date} time 
 * @returns {String} - Time in String example: "11.20"
 */
function toMinutes(time) { 
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3));
}

/**
 * 
 * @returns {String} - Time in Hours and Minutes
 */
function getCurrentTime() {
    let now = new Date();
    return twod(now.getHours()) + ':' + twod(now.getMinutes());
}

/**
 * Initialize the help ? button in side bar
 */
function initializePanel() {
    document
        .getElementById('panel')
        .querySelector('.help')
        .addEventListener('click', moreInfoHelp)
    
}

/**
 * 
 * @returns Get the current Meeting Code
 */
function getMeetCode() {
    return document
        .querySelector('c-wiz')
        .getAttribute('data-unresolved-meeting-id')
}

/**
 * Wait for the Google Meet to End
 */
function wait4Meet2End(){
    // wait until the meeting is done
    waitForElement( '[data-call-ended="true"]',function(){
        var currentTime = new Date().toLocaleTimeString();
        studentsNameSet = [];
        chrome.runtime.sendMessage({command: 'user-leave', type: getMeetCode(), active: attendedStud, data:currentTime});
    });
}

/**
 * Simple function that waits until a specific element exists in the DOM...
 * (References from Stack Overflow)
 */
function waitForElement(elementPath, callBack){
    
    let waitfor = elementPath === '[data-call-ended = "true"]' ? 10000 : 2500
    
    window.setTimeout( function(){
        let itExists = document.querySelector(elementPath)
        if( !itExists || itExists.length === 0 ) {
            waitForElement( elementPath, callBack );
        }
        else{
            callBack( elementPath, itExists );
        }
    }, waitfor )
}

function getStudentAttendDetail(){
    var code = getMeetCode();
    let studentList = [];
    chrome.runtime.sendMessage({command: "RetrieveStudentAttdDetail", data:code}, (response) => {
        Utils.log("Retrieve Student Attedance List From Firebase Database")
        if (response.response.length > 0){
            for(let i = 0; i < response.response.length; i++){
                studentList.push({
                    'name': response.response[i].name.toUpperCase(),
                    'time': response.response[i].time
                })
            }
        }
    });

    return studentList;
}

/**Tracker all the participant in the class */
/**
 * **Need to add student join table in firebase database 3 Aug 2021 comment
 */
function attendanceTracker(){
    let rosterStatusEl = document.getElementById('roster-status');
    for (let i = 0 ; i < rosterStatusEl.childElementCount; i++){
        if(rosterStatusEl.children[i].className == "mdc-list-item"){
            rosterStatusEl.removeChild(rosterStatusEl.children[i]);
        }
    }

    for (let i = 0 ; i < rosterStatusEl.childElementCount; i++){
        if(rosterStatusEl.children[i].className == "mdc-list-divider"){
            rosterStatusEl.removeChild(rosterStatusEl.children[i]);
        }
    }

    let currentlyPresentStudents = document.getElementsByClassName("ZjFb7c");
    
    for(let i=0; i<currentlyPresentStudents.length; i++){
        checkCurrentList(currentlyPresentStudents,i);
    }
}

function checkCurrentList(currentlyPresentStudents,i){
    let entry;
    let index = 0;
    entry = [];

    for(j = 0; j < studentCurrentAttend.length; j++){
        if(studentCurrentAttend[j].name === currentlyPresentStudents[i].innerHTML.toUpperCase()){
            let rosterStatusEl = document.getElementById('roster-status');
            entry.push({
                name: currentlyPresentStudents[i].innerHTML.toUpperCase(),
                color: 'green',
                tooltip: 'Present',
                text: `Joined at ${studentCurrentAttend[j].time}`,
            })
            const entryEl = initializeStudentElement(entry[0])
            rosterStatusEl.appendChild(entryEl)
            index = -1;
        }
    }

    if(index != -1 ){
        let rosterStatusEl = document.getElementById('roster-status');
        entry.push({
            name: currentlyPresentStudents[i].innerHTML.toUpperCase(),
            color: 'red',
            tooltip: 'Absent',
            text: `No Attendance Taken`,
        })
        const entryEl = initializeStudentElement(entry[0])
        rosterStatusEl.appendChild(entryEl);
    }
 
}

/**
 * Initializes a student list item element to append to the student list.
 * @param {Object} entry - The details of the student's attendance status.
 * @param {string} entry.name - The student's name.
 * @param {string} entry.color - The color of the status icon.
 * @param {string} entry.text - The secondary text below the student's name.
 * @returns {HTMLElement} The student list item element.
 */
 function initializeStudentElement(entry) {
    const studentTemplate = document.getElementById('student-template')
    const entryEl = studentTemplate.content.cloneNode(true)
    const statusIcon = entryEl.querySelector('.mdc-list-item__graphic')
    statusIcon.classList.add(entry.color)
    statusIcon.setAttribute('aria-label', entry.tooltip)
    statusIcon.setAttribute('data-tooltip', entry.tooltip)
    entryEl.querySelector('.mdc-list-item__primary-text').textContent = entry.name
    entryEl.querySelector('.mdc-list-item__secondary-text').textContent = entry.text
    return entryEl
}