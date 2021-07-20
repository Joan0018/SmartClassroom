const meetLanguage = {
	en: {
		popup: {
			popup_lang: 'Smart Classroom',
			popup_face_register: 'Facial Registration',
			popup_take_attendance: 'Take Attendance',
			popup_overall_analysis: 'Overall Analysis',
			language: 'Language',
		},
		classHTML: {
			new_class_name: 'Register Students face',
			input_name_student_name: 'Name',
			input_name_student_id: 'Student ID',
			student_names: 'Please put your face in front of camera',
			SRF: 'Start Capture Face', // SRF - "Start Register Face"
			TP: 'Take Photo',
			Cancel: 'Cancel',
			Ok: 'Save',

		},
		updateHTML: {
			name_2: 'Taking Attendance',
			Ok: 'Save',
			Cancel: 'Cancel',
			SCF: 'Start Capture Face'
		}
	},
	bm: {
		popup: {
			popup_lang: 'Bilik Darjah Pintar',
			popup_face_register: 'Pendaftaran Muka',
			popup_take_attendance: 'Kehadiran',
			popup_overall_analysis: 'Analisis Keseluruhan',
			language: 'Bahasa',
		},
		classHTML: {
			new_class_name: 'Mendaftar Muka Pelajar',
			input_name_student_name: 'Nama',
			input_name_student_id: 'ID Pelajar',
			student_names: 'Sila letakkan Muka anda di hadapan kamera',
			SRF: 'Mula Tangkap Muka',
			TP: 'Ambil Gambar',
			Cancel: 'Batal',
			Ok: 'Simpan',
		},
		updateHTML: {
			name_2: 'Ambil Kehadiran',
			Ok: 'Simpan',
			Cancel: 'Batal',
			SCF: 'Mula Tangkap Muka'
		}
	},
	cn: {
		popup: {
			popup_lang: '智慧课堂',
			popup_face_register: '人脸登记',
			popup_take_attendance: '出勤登记',
			popup_overall_analysis: '整体分析',
			language: '语言',
		},
		classHTML: {
			new_class_name: '学生人脸注册',
			input_name_student_name: '学生名字',
			input_name_student_id: '学生卡号',
			student_names: '请把你的脸放在镜头前',
			SRF: '开始捕捉人脸', 
			TP: '拍照',
			Cancel: '取消',
			Ok: '保存',
		},
		updateHTML: {
			name_2: '报到',
			Ok: '保存',
			SCF: '开始捕捉人脸',
			Cancel: '取消'
		}
	}
}
function updateCards() {
	chrome.storage.sync.get(['lang'], function(request) {
		document.querySelector('.new-class-name').innerText = meetLanguage[request.lang]['classHTML']['new_class_name'];
		document.querySelector('.input-name-student-name').innerText = meetLanguage[request.lang]['classHTML']['input_name_student_name'];
		document.querySelector('.input-name-student-id').innerText = meetLanguage[request.lang]['classHTML']['input_name_student_id'];
		document.querySelector('.input-name-student-name').innerText = meetLanguage[request.lang]['classHTML']['input_name_student_name'];
		document.querySelector('.student-names').innerText = meetLanguage[request.lang]['classHTML']['student_names'];
		document.querySelector('#SRF').innerText = meetLanguage[request.lang]['classHTML']['SRF'];
		document.querySelector('#TP').innerText = meetLanguage[request.lang]['classHTML']['TP'];
		document.querySelector('#Ok').innerText = meetLanguage[request.lang]['classHTML']['Ok'];

		document.querySelectorAll('.Cancel').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['classHTML']['Cancel'];
		});

		document.querySelectorAll('.name-2').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['updateHTML']['name_2'];
		});

		document.querySelector('#SCF').innerText = meetLanguage[request.lang]['updateHTML']['SCF'];
		document.querySelector('#Ok-track').innerText = meetLanguage[request.lang]['updateHTML']['Ok'];
		document.querySelectorAll('.Cancel').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['updateHTML']['Cancel'];
		});
	});
}
