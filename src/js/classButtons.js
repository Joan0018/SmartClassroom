function clearCards() {
	clearTags();
	document.querySelector('.student-name').value = "";
	document.querySelector('.student-id').value = "";
	//document.querySelector('#tag-input').value = "";
	tags = [];
}
function createNewClass() {
	// let className = document.querySelector('.student-name').value;
	// let students = [];
	// for (let i=0; i<tags.length; i++) {
	// 	students.push({
	// 		'name': tags[i],
	// 		'marked': false,
	// 		'overwrite': false
	// 	});
	// }

	clearCards();
	document.getElementById('card1').style.visibility = 'hidden';

	// let cls = {
	// 	'name': className,
	// 	'students': students,
	// 	'id': Date.now()
	// };

	// chrome.storage.sync.get(['classes'], function (result) {
	// 	classes = result.classes;
	// 	classes.push(cls);
	// 	if (fromEdit != -1) {
	// 		classes.splice(getIndexOfClassById(fromEdit, classes), 1);
	// 		fromEdit = -1;
	// 	}
	// 	chrome.storage.sync.set({'classes': classes}, null);
	// });
	
	stopWebCamera();
	clearVideo();
	storeFaceCaptured();
	segment = false;
}
function getParent(count, element) {
	if (count == 0) return element;
	return getParent(count-1, element.parentNode);
}

function cancelCard() {

	clearVideo();
	clearCards();
	stopWebCamera();
	facesCapture = [];
	studentList = [];
	labels = [];
	let card = getParent(3, this);
	card.style.visibility = 'hidden';
}

function getIndexOfClassById(id, classes) {
    for (let i=0; i<classes.length; i++)
        if (classes[i].id == id)
            return i;
    return -1;
}

function updateSelectClassChoice(callback) {
    let select = document.querySelector('.class-choice');
    chrome.storage.sync.get(['classes'], function (result) {
		if (result.classes !== undefined) {
			result.classes.forEach((cls) => {
				var option = document.createElement("option");
				option.text = cls.name;
				option.value = cls.id;
				select.add(option);
			});
		}
		callback(true);
	});
}

function AddHTMLCard() {
    const infoOnMeet = document.getElementsByClassName('ggUFBf')[1];
    infoOnMeet.insertAdjacentHTML('afterbegin', attendanceHTML);
    
    //Language thingy
    chrome.storage.sync.get(['lang'], function(response) {
    	let currentLang = response.lang;
	    document.querySelector('.card-title-2').innerText = meetLanguage[currentLang]['attendanceHTML']['card_title_2'];
	    document.querySelector('.class-choice-name').innerText = meetLanguage[currentLang]['attendanceHTML']['class_choice_name'];
	    document.querySelector('.show-choice-name').innerText = meetLanguage[currentLang]['attendanceHTML']['show_choice_name'];
	    meetLanguage[currentLang]['attendanceHTML']['show_choice'].forEach((elm)=> {
	    	let option = document.createElement('option');
	    	option.text = elm;
	    	document.querySelector('.show-choice').appendChild(option);
	    });
	    document.querySelector('.class-start-time-name').innerText = meetLanguage[currentLang]['attendanceHTML']['class_start_time_name'];
	    document.querySelector('.save-button').innerText = meetLanguage[currentLang]['attendanceHTML']['save_button'];
    });
    //------------------------

    updateSelectClassChoice(function(ifAdded) {
    	let select = document.querySelector('.class-choice');
    	let sortTime = document.querySelector('.show-choice');

    	let op1 = select.options[savedIndexSelectedClass];
    	if (op1 != null) op1.selected = true;

    	if (ifAdded) createAttendance();
    });
    document.querySelector('.class-start-time').value = savedTimeChoosenStartTime;
    document.querySelector('.save-button').addEventListener('click', exportAttendance, false);

    document.querySelector('.class-choice').onchange = sendFillClassList;
    document.querySelector('.show-choice').onchange = sendFillClassList;
    document.querySelector('.class-start-time').onchange = sendFillClassList;

    if (updatedObserver === undefined) {
	    updatedObserver = new MutationObserver(function(mutation) {
	        AddHTMLCard();
	    });
	    updatedObserver.observe(document.querySelector('.GvcuGe'), {
	        childList: true,
	        subtree: true,
	    });
	}
}
function sendFillClassList() {
	window.postMessage(
		{
			sender: 'fill-class-list',
		},
		'https://meet.google.com');
}

function editChoice() {
	let select = document.querySelector('#card2>.show-block-2>.choose-2')
	editClass(select.options[select.selectedIndex].value);
	document.getElementById('card2').style.visibility = 'hidden';
}

function deleteChoice() {
	let select = document.querySelector('#card3>.show-block-2>.choose-2')
	deleteClass(select.options[select.selectedIndex].value);
	document.getElementById('card3').style.visibility = 'hidden';
}


function addClass() {
    document.getElementById('card1').style.visibility = 'visible';
}

function deleteClass(id) {
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;

        classes.splice(getIndexOfClassById(id, classes), 1);
        chrome.storage.sync.set({'classes': classes}, null);
    });
}

function editClass(id) {
	
	document.getElementById('card1').style.visibility = 'visible';
	updateCards();
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;
        
        let i = getIndexOfClassById(id, classes);
        fromEdit = id;
        classes[i].students.forEach((student) => {
            tags.push(student.name);
        });
        addTags();
        document.querySelector('.student-name').value = classes[i].name;
    });
}

function updateChoiceBox(elemName) {
	let select = document.querySelector(`#${elemName}>.show-block-2>.choose-2`);
	select.innerText = null;
	
	function fixasync(callback) {
		chrome.storage.sync.get(['classes'], function (result) {
			if (result.classes !== undefined) {
				result.classes.forEach((cls) => {
					var option = document.createElement("option");
					option.text = cls.name;
					option.value = cls.id;
					select.add(option);
				});
				callback(true);
			}
		});
	}
	fixasync(function(ye) {
		if (ye) {select.selectedIndex = 0;}
	});
}

function getCurrentDateFormat() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	return mm + '/' + dd + '/' + yyyy;
}

function exportAttendance() {
	let text = "";
	let listName = document.querySelectorAll('.student>p');
	let listTime = document.querySelectorAll('.student>button');
	for (let i=0; i<listName.length; i++) {
		text += `${listTime[i].label} -=- ${listName[i].innerText}\n`;
	}

	let filename = ""; //[class]-[TimeStamp]-[date].txt format
	let select = document.querySelector('.class-choice');
    let sortTime = document.querySelector('.show-choice');
	
	//sortTime.options[sortTime.selectedIndex].text;
	filename += select.options[select.selectedIndex].text + '-';
	filename += sortTime.options[sortTime.selectedIndex].text + '-';
	filename += getCurrentDateFormat() + '.txt';

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function definePressedProperty(element) {
	Object.defineProperty(element, 'pressed', {
		get: function () {
			return this.getAttribute('aria-pressed') === 'true'
		},
		set: function (value) {
			this.setAttribute('aria-pressed', value)
		},
	})
}

function moreInfoHelp() {
	chrome.runtime.sendMessage({
		data: 'open-url',
		url: 'https://github.com/Joan0018/SmartClassroom/tree/main/Face%20Registration',
	})
}
