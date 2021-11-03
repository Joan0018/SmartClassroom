
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Joan0018/SmartClassroom">
    <img src="src/img/Attendance64.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Virtual Classroom Management System</h3>
  <h2 align="center">Final Year Project from Tunku Abdul Rahman University College (TARUC)
    <br/>
    Bachelor of Computer Science (Honours) in Software Engineering (RSF)
    <br/>
    Supervisor: Ts. TEW YIQI
    <br/>
    Contributors: JOAN HAU, LIM KAH YEE
  </h2>
  <p align="center">
    This is a Virtual Classroom Management System with 
    <br />
    1. Face Landmark Detection and Face Recognition Attendance
    <br />
    2. Hand Landmark Detection and Hand Gesture Recognition 
    <br />
    <br />
    <!-- NEED ADDED AFTER FINAL REPORT RUN ORIGINALITY -->
    <a href="https://github.com/Joan0018/SmartClassroom"><strong>Explore the docs »</strong></a>
    <br />
    <a href="#table-of-content"><strong>Explore more »</strong></a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<a id="table-of-content">
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#get-start">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installationDemo">Installation Demo</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#facial">Facial Detection and Recognition</a></li>
        <li><a href="#hand">Hand Detection and Recognition</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
</a>


<!-- ABOUT THE PROJECT -->
<a id="about-the-project"><h2 style="display: inline-block">About The Project</h2></a>
A **Final Year Project** carries out by **Bachelor of Computer Science (Honours) in Software Engineering (RSF)** Students in **TARUC**. It is a Google Chrome Extension which able to support management during an online class. This project is designed to allow students to take attendance through **facial recognition** and interact with each other with **hand gestures**.
<br />
<br />
#### :exclamation: :collision: This project is available, but it has not been officially released and is still immature :collision: :exclamation:   
<br />

<!-- Sample
Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo_name`, `twitter_handle`, `email`, `project_title`, `project_description`-->

<a id="built-with"><h2 style="display: inline-block">Built With</h2></a>
#### Face Detection and Face Recognition
* <a href="https://github.com/justadudewhohacks/face-api.js/tree/master/weights"> `face-api.js` </a> 
#### Hand Detection and Hand Gesture Recognition
* <a href="https://google.github.io/mediapipe/solutions/hands"> `MediaPipe` </a>
* <a href="https://github.com/andypotato/fingerpose"> `Fingerpose` </a> 
* <a href="https://github.com/MIDIBlocks/handsfree-chrome"> `Handsfree.js` </a> 
#### Database
* <a href="https://firebase.google.com/docs?gclid=CjwKCAjw3riIBhAwEiwAzD3TiRT4tjJReyA5xT4EAhqiTfQ2mVnilp6-Jh1aURDKNgAcsizbYdF-rxoClHMQAvD_BwE&gclsrc=aw.ds"> `Firebase` </a>
* <a href="https://www.google.com/sheets/about/"> `Google Spreadsheet` </a> 
#### Google Service
* <a href="https://cloud.google.com/"> `Google Cloud Platform` </a> 



<!-- GETTING STARTED -->
<a id="get-start"><h2 style="display: inline-block">Getting Started</h2></a>

To get a local copy up and running follow these simple steps.

<!-- Prerequisites -->
<a id="prerequisites"><h2 style="display: inline-block">Prerequisites</h2></a>

*Google Chrome Current Version: Version 93.0.4577.63 (Official Build) (64-bit)*

<!-- Installation -->
<a id="installation"><h2 style="display: inline-block">Installation</h2></a>

| Step        | Description   | 
| :------------:|:-------------|
| 1           | Download the Project Folder to Local Device |
| 2           | Unzip the Project Folder |
| 3           | Browse and Open Developer Mode in Google Chrome Extension |
| 4           | Load Unpacked by Uploading the Project Folder to the Google Chrome Extension |

<!-- Installation Demo-->
<a id="installationDemo"><h2 style="display: inline-block">Installation Demo</h2></a>

1. Download the Project Folder to Local Device

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Step_1.png)

2. Unzip the Project Folder

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Step_2.png)

3. Browse and Open Developer Mode in Google Chrome Extension
   ```sh
   chrome://extensions/
   ```
   
   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Step_3.png)
   
4. Load Unpacked by Uploading the Project Folder to the Google Chrome Extension

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Step_4.png)



<!-- USAGE EXAMPLES -->
<a id="usage"><h2 style="display: inline-block">Usage</h2></a>

_For facial recognition module is used for student attendance tracking and management_
<br/>
_For hand recognition module is used for interactions between student and staff_

<a id="facial"><h2 style="display: inline-block">Facial Detection and Recognition</h2></a>

1. Chrome Extension Functions

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Facial/step1.png)

2. Enables the student to register the face

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Facial/step2.png)

3. Enables the student to take the attendance

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Facial/step3.png)
   
4. A tab for lecturer or tutor to check the current participants and attendance status

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Facial/step4.png)
   
5. Google Spreadsheet for checking

   ![Image of Step](https://github.com/Joan0018/SmartClassroom/blob/main/process/Facial/step5.png)
   
6. Demo Video

   https://user-images.githubusercontent.com/66239936/139573552-500a82ac-6395-4557-ace8-248dc125b676.mp4



  

<a id="hand"><h2 style="display: inline-block">Hand Detection and Recognition</h2></a>
## How to use in Google Meet
1. Open popup.js by clicking the extension
2. Get <kbd>Sheet Code</kbd> and Enter the Sheet Code
3. Start Model

![](https://i.imgur.com/Ld7fhCQ.png)

## How to shutdown chrome extension
> Remark: Directly refresh Chrome Extension in `chrome://extensions` will cause last time sheetCode auto fill in and input tag read-only. In order to solve this, just start the model and stop the model to update the sheetCode to empty string. 
1. Open popup.js by clicking the extension
2. Click <kbd>Stop Model</kbd> to shutdown chrome extension

![](https://i.imgur.com/rYLFEPG.png)

## Available Gesture
> Remark: The chrome extension provided 2 Gesture (Number and Sign) and 1 Mouse Function.

- Number (Shorcut key: LCtrl + LShift + 1)  <br>
> Remark: All of the number will activate ChatBot by pressing **SpaceBar** to send Message In Google's Meet Chatbox (E.g. [Your Name] chosen [Gesture] options.)

| ![](https://i.imgur.com/xL89ZE7.png) | ![](https://i.imgur.com/Gu6eqV8.png) | ![](https://i.imgur.com/nyOaaKO.png) | ![](https://i.imgur.com/h88vanY.png) | ![](https://i.imgur.com/HlQdrJt.png) |
|--|--|--|--|--|
| One | Two | Three | Four | Five |

<br>
<br>

- Sign (Shorcut key: LCtrl + LShift + 2) <br>
> Remark: Some of the Sign (Nice, I'm Good, Thank You, No Question) will activate ChatBot by pressing **SpaceBar** to send Message In Google's Meet Chatbox (E.g. [Your Name] [Gesture])

| ![](https://i.imgur.com/S93FVl1.png) | ![](https://i.imgur.com/ArMIHDR.png) | ![](https://i.imgur.com/wP3byHw.png) | ![](https://i.imgur.com/ffthm88.png) | ![](https://i.imgur.com/rLbFJ2A.png) | ![](https://i.imgur.com/pfDXJMn.png) |
|--|--|--|--|--|--|
| Help | Stick Caption | WebCam_Microphone | Nice, I'm Good | Thank You | No Question |

<br>
<br>

- Mouse (No Shorcut Key Available) <br>
> Remark: Required to refresh Website 

  Please refer to developer website [Handsfree's Palm Pointer](https://handsfree.dev/plugin/palmpointers/)

<br>

## Sample Result
https://user-images.githubusercontent.com/57024183/137918644-977b2db3-66db-49e7-9735-81faea563330.mp4

<br>



<!-- CONTACT -->
<a id="contact"><h2 style="display: inline-block">Contact</h2></a>

Joan Hau - [@githubProfile](https://github.com/Joan0018)
<br/>
Lim Kah Yee - [@githubProfile](https://github.com/lky1020)

Project Link: [@VirtualClassroom](https://github.com/Joan0018/SmartClassroom) 
<!-- Will update after FYP Report done -->
_For more facial recognition examples, please refer to the [Documentation](https://example.com)_
<br/>
_For more hand recognition examples, please refer to the [Documentation](https://example.com)_

<!-- ACKNOWLEDGEMENTS -->
<a id="acknowledgements"><h2 style="display: inline-block">Acknowledgement</h2></a>
_A Special Thanks To_
* [Attendance for Google Meet™](https://chrome.google.com/webstore/detail/attendance-for-google-mee/gioogehddfnceeihfoeencjbhggblkkd)
* [Google Meet Attendance & Engagement](https://chrome.google.com/webstore/detail/google-meet-attendance-en/dfoeddmkpdeheffinggbeggiebnhhmno)
* [Google Meet Attendance Tracker](https://chrome.google.com/webstore/detail/google-meet-attendance-tr/ldjjokmalaidehbgbifihdfdondjgfha)
* [MIDIBlocks](https://github.com/midiblocks/handsfree)
* [MIDIBlocks-Chrome](https://github.com/MIDIBlocks/handsfree-chrome)
