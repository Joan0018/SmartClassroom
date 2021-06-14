// Initialize when meeting starts
const readyObserver = new MutationObserver(function (mutations, me) {
    if (document.getElementsByClassName('c8mVDd')[0]) {
        let s = document.createElement('script')
        s.src = chrome.runtime.getURL('js/inject.js')
        document.documentElement.appendChild(s)
        initialize();
        me.disconnect();
    }
})
readyObserver.observe(document.getElementsByClassName('crqnQb')[0], {
    childList: true,
    subtree: true,
});


//Globals
const sessionStorage = window.sessionStorage;
sessionStorage.setItem('joined', JSON.stringify({}));

chrome.storage.sync.get(null, function(result) {
    if (!result['classes']) {
        chrome.storage.sync.set({'classes': []}, null);
    }
    if (!result['lang']) {
        chrome.storage.sync.set({'lang': 'en'}, null);
    }
});
var updatedObserver = undefined;
var savedIndexSelectedClass = 1;
var savedTimeChoosenStartTime = getCurrentTime();
var fromEdit = -1;


function initialize() {
    chrome.runtime.sendMessage(
        {
            data: 'starting...',
        },
        function (response) {
            if (response.ready) {
                // Create divs and buttons
                const screen = document.getElementsByClassName('crqnQb')[0];

                screen.insertAdjacentHTML('afterbegin', classHTML);
                document.getElementById('card1').style.visibility = 'hidden';
                
                screen.insertAdjacentHTML('afterbegin', editHTML);
                document.getElementById('card2').style.visibility = 'hidden';

                screen.insertAdjacentHTML('afterbegin', deleteHTML);
                document.getElementById('card3').style.visibility = 'hidden';

                // Adding functions to buttons
                document.getElementById('Ok').addEventListener('click', createNewClass, false);
                document.querySelectorAll('.Cancel').forEach((element) => {
                    element.addEventListener('click', cancelCard, false);
                });
                document.getElementById('ICP').addEventListener('click', injectCurrentParticipants, false);
                //document.getElementById('tag-input').addEventListener('keyup', addNewTag, false);
                document.querySelector('.tag-container').addEventListener('click', focusOnInput, false);
                document.addEventListener('click', deleteTagCheck, false);

                document.getElementById('Edit').addEventListener('click', editChoice, false);
                document.getElementById('Delete').addEventListener('click', deleteChoice, false);

                const tempButton = document.querySelector('.NzPR9b').firstElementChild;
                tempButton.addEventListener('click', AddHTMLCard, false);

                updateCards();
            }
        }
    );
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log (request);
    switch(request.data) {
        case 'translate': {
            updateCards();
            break;
        }
        case 'add-class': {
            document.getElementById('card1').style.visibility = 'visible';
            break;
        }
        case 'edit-class': {
            document.getElementById('card2').style.visibility = 'visible';
            updateChoiceBox('card2');
            break;
        }
        case 'del-class': {
            document.getElementById('card3').style.visibility = 'visible';
            updateChoiceBox('card3');
            break;
        }
    }
});

function twod(v) {
    return ('0'+Number(v)).slice(-2);
}
function toMinutes(time) { // time is string example: "10:43"
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3));
}
function getCurrentTime() {
    let now = new Date();
    return twod(now.getHours()) + ':' + twod(now.getMinutes());
}


function choosenClass(classes) {
    let select = document.querySelector('.class-choice');
    return getIndexOfClassById(select.options[select.selectedIndex].value, classes);
}

// Save names and times when student entered to array 'joined' in chrome 
function storeNames(names) {
    let ctime = getCurrentTime();

    let joined = JSON.parse(sessionStorage.getItem('joined'));
    console.log(joined, names);

    for (let i=0; i<names.length; i++) {
        if (joined.hasOwnProperty(names[i])) continue;
        joined[names[i]] = ctime;
    }
    sessionStorage.setItem('joined', JSON.stringify(joined));
}

function updateOverwrite(data, callback) {
    let index = Number(data.idxs.match(/^\d+/));
    let flag = Number(data.idxs.match(/\d+$/));
    chrome.storage.sync.get(['classes'], function(request) {
        let classes = request.classes;
        classes[index].students[flag].overwrite = data.value;
        chrome.storage.sync.set({'classes': classes}, null);
        callback(true);
    });
}

function createAttendance() {
    let select = document.querySelector('.class-choice');
    if (select.selectedIndex == -1) return;

    let choosenTime = document.querySelector('.class-start-time').value;
    let selectedTime = document.querySelector('.show-choice').selectedIndex;

    savedIndexSelectedClass = select.selectedIndex;
    savedTimeChoosenStartTime = choosenTime;
    choosenTime = toMinutes(choosenTime);

    let ul = document.querySelector('.list-students');
    ul.innerHTML = "";

    joined = JSON.parse(sessionStorage.getItem('joined'));
    console.log(joined);
    chrome.storage.sync.get(['classes', 'lang'], function(request) {
        let classes = request.classes;
        let index = choosenClass(classes);
        
        for (let i=0; i<classes[index].students.length; i++)
            classes[index].students[i].marked = false;

        // Add Early and Late students to the list
        for (let [name, time] of Object.entries(joined)) {
            let flag = -1;
            classes[index].students.forEach((student, idx) => {
                if (student.name == name)
                    flag = idx;
            });


            if (flag != -1 && !classes[index].students[flag].marked) {
                classes[index].students[flag].marked = true;

                console.log(selectedTime, classes[index].students[flag])

                let buttonText = '', buttonLabel = '';
                let overwrite = classes[index].students[flag].overwrite;
                let stime = toMinutes(time); // student time in minutes

                switch (selectedTime) {
                    case 0: {
                        switch (overwrite) {
                            case false: {
                                if (stime <= choosenTime) {
                                    buttonText = '🟢' // green
                                    buttonLabel = 'Early';
                                }
                                else {
                                    buttonText = '🟡' // yellow
                                    buttonLabel = 'Late';
                                }
                                break;
                            }
                            default: {
                                buttonText = classes[index].students[flag].overwrite;
                                if (classes[index].students[flag].overwrite == '🟢')
                                    buttonLabel = 'Early';
                                else
                                    buttonLabel = 'Late';
                                break;
                            }
                        }
                        break;
                    }
                    case 1: { // green
                        switch (overwrite) {
                            case false: {
                                if (stime <= choosenTime) {
                                    buttonText = '🟢';
                                    buttonLabel = (request.lang == 'en')?'Early':'Ранний';
                                }
                                else
                                    return;
                                break;
                            }
                            case '🟢': {
                                buttonText = '🟢';
                                buttonLabel = (request.lang == 'en')?'Early':'Ранний';
                                break;
                            }
                            default: {
                                return;
                            }
                        }
                        break;
                    }
                    case 2: { // yellow
                        switch (overwrite) {
                            case false: {
                                if (stime > choosenTime) {
                                    buttonText = '🟡';
                                    buttonLabel = (request.lang == 'en')?'Late':'Опоздавший';
                                }
                                else
                                    return;
                                break;
                            }
                            case '🟡': {
                                buttonText = '🟡';
                                buttonLabel = (request.lang == 'en')?'Late':'Опоздавший';
                                break;
                            }
                            default: {
                                return;
                            }
                        }
                        break;
                    }
                    case 3: {
                        return;
                    }
                }

                let li = document.createElement('li');
                let button = document.createElement('button');
                let text = document.createElement('p');

                button.id = ('' + index) + '|' + ('' + flag);
                button.addEventListener('click', function() {
                    const colors = ['🟢', '🟡']; // green, yellow
                    for (let i=0; i<2; i++) 
                        if (this.innerText == colors[i]) {
                            window.postMessage(
                            {
                                sender: 'update-from-overwrite',
                                idxs: this.id,
                                value: colors[(i + 1) % 2],
                            },
                            'https://meet.google.com');
                            break;
                        }
                }, false);
                button.innerText = buttonText;
                button.label = buttonLabel;
                text.innerText = name + " (" + time + ")";
                li.setAttribute('class', 'student');
                
                li.appendChild(button);
                li.appendChild(text);
                ul.appendChild(li);
            }
        }

        //Add Gone students to the list
        if (selectedTime == 0 || selectedTime == 3)
            classes[index].students.forEach((student, flag) => {
                if (!student.marked) {
                    student.overwrite = false;
                    let li = document.createElement('li');
                    li.setAttribute('class', 'student');
                    let name = document.createElement('p');
                    name.innerText = student.name;

                    let button = document.createElement('button');
                    button.innerText = '🔴'; // red
                    button.label = (request.lang == 'en')?'Gone':'Отсутствующий';

                    li.appendChild(button);
                    li.appendChild(name);

                    ul.appendChild(li);
                }
            });

        chrome.storage.sync.set({'classes': classes}, null);
    });
}

window.addEventListener('message', (event) => {
    if (event.origin !== 'https://meet.google.com') return

    switch(event.data.sender) {
        case 'inject-message': {
            if (event.data.attendance) {
                storeNames(event.data.attendance);
            }
            break;
        }
        case 'fill-class-list': {
            createAttendance();
            break;
        }

        case 'update-from-overwrite': {
            updateOverwrite(event.data, function(ifUpdated) {
                if (ifUpdated) createAttendance();
            });
            break;
        }
    }
});