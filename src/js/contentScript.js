/**
 * To get the current google meet joined user's email
 */
const currentEmail = document.getElementsByClassName("Duq0Bf")[0].innerHTML;

/**
 * Initialize when meeting starts
 * Check whether the google meet start
 * Get the start time when google meet start
*/
const readyObserver = new MutationObserver(function (mutations, me) {
    if (document.getElementsByClassName('c8mVDd')[0]) {
        const startTime = ~~(Date.now() / 1000)
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
                        } else {
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
                    var code = getMeetCode();
                    chrome.runtime.sendMessage({
                        command: 'RetrieveStudentAttend',
                        data: code
                    })
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
        case 'add-class': {
            alert("Please Enter Full Name and Student ID as Registered \nFormat of Input: \r\nName: XXXX XXXX XXXX \r\nStudent ID: XXWMRXXXXX \r\nClick the take photo button once you are ready")
            document.getElementById('registerFaceCard').style.visibility = 'visible';
            break;
        }
        case 'edit-class': {
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
