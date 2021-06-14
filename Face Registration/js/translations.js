const meetLanguage = {
	en: {
		popup: {
			popup_name: 'Smart Classroom',
			popup_add_class: 'Facial Registration',
			popup_edit_class: 'Take Attendance',
			popup_del_class: 'Overall Analysis',
			language: 'Language',
		},
		classHTML: {
			new_class_name: 'Register Students face',
			input_name_class_name: 'Student Name',
			student_names: 'Please put your face in front of camera',
			ICP: 'Start Capture Face', // ICP - "Inject current participants"
			Cancel: 'Cancel',
			Ok: 'Save',
		},
		attendanceHTML: {
			card_title_2: 'Attendance',
			class_choice_name: 'Class:',
			show_choice_name: 'Sort:',
			show_choice: ['All', 'Early 🟢', 'Late 🟡', 'Gone 🔴'],
			class_start_time_name: 'Period start:',
			save_button: 'Export',
		},
		updateHTML: {
			name_2: 'Select Class',
			Cancel_2: 'Cancel',
			Edit: 'Edit',
			Delete: 'Delete'
		}
	},
	bm: {
		popup: {
			popup_name: 'Bilik Darjah Pintar',
			popup_add_class: 'Pendaftaran Muka',
			popup_edit_class: 'Kehadiran',
			popup_del_class: 'Analisis Keseluruhan',
			language: 'Bahasa',
		},
		classHTML: {
			new_class_name: 'Mendaftar Muka Pelajar',
			input_name_class_name: 'Nama pelajar',
			student_names: 'Sila letakkan Muka anda di hadapan kamera',
			ICP: 'Mula Tangkap Muka', // ICP - "Inject current participants"
			Cancel: 'Batal',
			Ok: 'Simpan',
		},
		attendanceHTML: {
			card_title_2: 'Kehadiran',
			class_choice_name: 'Kelas:',
			show_choice_name: 'Susun:',
			show_choice: ['Semua', 'Awal 🟢', 'Lambat 🟡', 'Hilang 🔴'],
			class_start_time_name: 'Tempoh bermula:',
			save_button: 'Eksport',
		},
		updateHTML: {
			name_2: 'Pilih Kelas',
			Cancel_2: 'Batal',
			Edit: 'Edit',
			Delete: 'Padam'
		}
	},
	cn: {
		popup: {
			popup_name: '智慧课堂',
			popup_add_class: '人脸登记',
			popup_edit_class: '出勤登记',
			popup_del_class: '整体分析',
			language: '语言',
		},
		classHTML: {
			new_class_name: '学生人脸注册',
			input_name_class_name: '学生名字',
			student_names: '请把你的脸放在镜头前',
			ICP: '开始捕捉人脸', // ICP - "Inject current participants"
			Cancel: '取消',
			Ok: '保存',
		},
		attendanceHTML: {
			card_title_2: '出勤率',
			class_choice_name: '班级:',
			show_choice_name: '种类:',
			show_choice: ['全部', '提早 🟢', '迟到 🟡', '缺席 🔴'],
			class_start_time_name: '期间开始:',
			save_button: '导出',
		},
		updateHTML: {
			name_2: '选择班级',
			Cancel_2: '取消',
			Edit: '编辑',
			Delete: '删除'
		}
	}
}
function updateCards() {
	chrome.storage.sync.get(['lang'], function(request) {
		document.querySelector('.new-class-name').innerText = meetLanguage[request.lang]['classHTML']['new_class_name'];
		document.querySelector('.input-name-class-name').innerText = meetLanguage[request.lang]['classHTML']['input_name_class_name'];
		document.querySelector('.student-names').innerText = meetLanguage[request.lang]['classHTML']['student_names'];
		document.querySelector('#ICP').innerText = meetLanguage[request.lang]['classHTML']['ICP'];
		document.querySelector('#Ok').innerText = meetLanguage[request.lang]['classHTML']['Ok'];


		document.querySelectorAll('.Cancel').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['classHTML']['Cancel'];
		});

		document.querySelectorAll('.name-2').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['updateHTML']['name_2'];
		});

		document.querySelector('#Edit').innerText = meetLanguage[request.lang]['updateHTML']['Edit'];
	    document.querySelector('#Delete').innerText = meetLanguage[request.lang]['updateHTML']['Delete'];
	});
}
