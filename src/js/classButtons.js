/** 
 * Clear the video frame in the pop up cards
 * Clear the data in the pop up cards
 * Initialize the value in the array 
*/
function clearCards() {
	clearVideo();
	document.querySelector('.student-id').value = "";
	document.querySelector('.student-name').value = "";
}

/**
 * Register the student face 
 * Reset the variables after close the card
 */
function registerStudentFace() {
	clearCards();
	clearVideo();
	stopWebCamera();
	storeFaceCaptured();
	document.getElementById('registerFaceCard').style.visibility = 'hidden';
}

function getParent(count, element) {
	if (count == 0) return element;
	return getParent(count-1, element.parentNode);
}

/**
 * Reset and Close the card
 */
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

/**
 * Define button at the side bar
 */
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

/**
 * Define button ? at the side bar
 */
function moreInfoHelp() {
	chrome.runtime.sendMessage({
		data: 'open-url',
		url: 'https://github.com/Joan0018/SmartClassroom',
	})
}
