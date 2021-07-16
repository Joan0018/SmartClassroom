document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if (!tabs[0].url.match(/https:\/\/meet.google.com\/.+-.+-.+/)) return;

		document.querySelector('.popup-add-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'add-class'});
			window.close();
		}, false);
		document.querySelector('.popup-edit-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'edit-class'});
			window.close();
		}, false);
		document.querySelector('.popup-del-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'del-class'});
			window.close();
		}, false);

		let langChoice = document.querySelector('.language-choice');
		langChoice.onchange = function() {
			let currentLang = langChoice.options[langChoice.selectedIndex].text;
			chrome.storage.sync.set({'lang': currentLang}, null);
			updatePopup(currentLang);
			chrome.tabs.sendMessage(tabs[0].id, {data: 'translate'});
		};

		chrome.storage.sync.get(['lang'], function(request) {
			for (let i=0; i<langChoice.length; i++) {
				if (langChoice.options[i].text == request.lang) {
					langChoice.options[i].selected = true;
					break;
				}
			}
			updatePopup(request.lang);
		});
	});
}, false)

function updatePopup(currentLang) {
	console.log(currentLang);
	document.querySelector('.popup-name').innerText = meetLanguage[currentLang]['popup']['popup_name'];
	document.querySelector('.popup-add-class').innerText = meetLanguage[currentLang]['popup']['popup_add_class'];
	document.querySelector('.popup-edit-class').innerText = meetLanguage[currentLang]['popup']['popup_edit_class'];
	document.querySelector('.popup-del-class').innerText = meetLanguage[currentLang]['popup']['popup_del_class'];	
	document.querySelector('#language').innerText = meetLanguage[currentLang]['popup']['language'];
}

const meetLanguage = {
	en: {
		popup: {
			popup_name: 'Smart Classroom',
			popup_add_class: 'Facial Registration',
			popup_edit_class: 'Take Attendance',
			popup_del_class: 'Overall Analysis',
			language: 'Language',
		},
	},
	bm: {
		popup: {
			popup_name: 'Bilik Darjah Pintar',
			popup_add_class: 'Pendaftaran Muka',
			popup_edit_class: 'Kehadiran',
			popup_del_class: 'Analisis Keseluruhan',
			language: 'Bahasa',
		},
	},
	cn: {
		popup: {
			popup_name: '智慧课堂',
			popup_add_class: '人脸登记',
			popup_edit_class: '出勤登记',
			popup_del_class: '整体分析',
			language: '语言',
		},
	}
}