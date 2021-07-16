const classHTML = `<div 
    id="card1"
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        "
    >
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="background-shadow"></div>
    <div class="show-block">
        <h2 class="new-class-name"> Register Students face </h2>
        <div class="separator"></div>
        <div style="display: flex; flex-direction: row; align-items: center; margin: 0 0.5em;">
            <p class="input-name-student-name"> Name </p>
            <input class="student-name"/> 
        </div>

        <div style="display: flex; flex-direction: row; align-items: center; margin: 0 0.5em;">
            <p class="input-name-student-id"> Student ID </p>
            <input class="student-id"/>
        </div>

        <p class="student-names" style="width: auto;"> Please put your face in front of camera </p>
        <p class="student-names" style="width: auto;"> Please take 5 photos </p>
        <div class="tag-container">
            <canvas id="canvas" style="display: block;margin:auto;" width="640" height="480" ></canvas>
            <video id="video" style="display: block;position:absolute;margin:auto;visibility:hidden;" width="640" height="480" autoplay="true" muted></video>
        </div>
        <button id="ICP" class="hover-state"> Start Capture Face </button>
        <div class="separator"></div>
        <button id="TP" class="hover-state"> Take Photo </button>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Ok" class="hover-state">Save</button>
        </div>
    </div>
</div>`;

const attendanceHTML = `
<div class="container">
    <h4 class="isOLae card-title-2" style="padding-left: 0px;">Attendance</h4>
    <div class="settings">
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p class="class-choice-name" style="width: 50px;"> Class: </p>
            <select class="class-choice">
            </select>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p class="show-choice-name" style="width: 50px;"> Sort: </p>
            <select class="show-choice">
            </select>

            <p class="class-start-time-name"> Period start: </p>
            <input class="class-start-time" type="time"/>
        </div>
    </div>
    <div class="list-container">
        <ul class="list-students">
        </ul>
    </div>
    <button class="save-button hover-state">Export</button>
</div>
<div role="separator" class="kCtYwe kyoOSe"></div>
`;


const editHTML = `
<div id="card2"        
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        ">
    <div class="background-shadow"></div>
    <div class="show-block">
        <h2 class="name-2"> Taking Attendance </h2>
        <div class="separator"></div>
        <div class="tag-container">
            <canvas id="canvasAttd" style="display: block;margin:auto;" width="640" height="480" ></canvas>
            <video id="videoAttd" style="display: block;position:absolute;margin:auto;visibility:hidden;" width="640" height="480" autoplay="true" muted></video>
        </div>
        <div class="separator"></div>
        <button id="SCF" class="hover-state"> Start Capture Face </button>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Ok-track" class="hover-state">Save</button>
        </div>
    </div>
    </div> 
</div>`;


const deleteHTML = `
<div id="card3"        
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        ">
    <div class="background-shadow"></div>
    <div class="show-block-2">
        <h2 class="name-2"> Select Class </h2>
        <div class="separator"></div>
        <select class="choose-2" size="6">
        </select>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Delete" class="hover-state">Delete</button>
        </div>
    </div> 
</div>`

const buttonHTML = `<div class="r6xAKc">
<span data-is-tooltip-wrapper="true"
    ><button
        id="attendance"
        class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc"
        jscontroller="soHxf"
        jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef"
        jsname="A5il2e"
        aria-label="Attendance"
        data-tooltip-enabled="true"
        data-tooltip-id="tt-c12"
        data-panel-id="5"
        aria-pressed="false"
    >
        <div class="VfPpkd-Bz112c-Jh9lGc"></div>
        <i
            class="VfPpkd-kBDsod NtU4hc"
            aria-hidden="true"
            ><svg
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"/>
                <path d="M17,4 L6,4 C4.79111111,4 4,4.7 4,6 L4,18 C4,19.3 4.79111111,20 6,20 L18,20 C19.2,20 20,19.3 20,18 L20,7.20710678 C20,7.07449854 19.9473216,6.94732158 19.8535534,6.85355339 L17,4 Z M17,11 L7,11 L7,4 L17,4 L17,11 Z" fill="#FFFFFF" fill-rule="nonzero"/>
                <rect fill="#FFFFFF" opacity="0.5" x="12" y="4" width="3" height="5" rx="0.5"/>
            </g>
            </svg></i
        ><i
            class="VfPpkd-kBDsod Mwv9k"
            aria-hidden="true"
            ><svg
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"/>
                <path d="M17,4 L6,4 C4.79111111,4 4,4.7 4,6 L4,18 C4,19.3 4.79111111,20 6,20 L18,20 C19.2,20 20,19.3 20,18 L20,7.20710678 C20,7.07449854 19.9473216,6.94732158 19.8535534,6.85355339 L17,4 Z M17,11 L7,11 L7,4 L17,4 L17,11 Z" fill="#8AB4F8" fill-rule="nonzero"/>
                <rect fill="#8AB4F8" opacity="0.5" x="12" y="4" width="3" height="5" rx="0.5"/>
            </g>
            </svg></i
        >
    </button>
    <div
        class="EY8ABd-OWXEXe-TAWMXe"
        role="tooltip"
        aria-hidden="true"
        id="tt-c12"
    >
        Attendance
    </div></span
>
</div>`

const sheetsSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate;padding-right: 4px;" viewBox="0 0 64 88" width="12pt" height="12pt"><defs><clipPath id="_clipPath_KAvDqF0Ev6kg4Yj0RZmUZ8LSvIjixP4M"><rect height="88" width="64"></rect></clipPath></defs><g clip-path="url(#_clipPath_KAvDqF0Ev6kg4Yj0RZmUZ8LSvIjixP4M)"><clipPath id="_clipPath_tDC5NP6inp0FhE5TGFdi9OsXat0bSKFd"><rect transform="matrix(1,0,0,1,0,0)" height="88" width="64" y="0" x="0"></rect></clipPath><g clip-path="url(#_clipPath_tDC5NP6inp0FhE5TGFdi9OsXat0bSKFd)"><g><path d=" M 58 88 L 6 88 C 2.7 88 0 85.3 0 82 L 0 6 C 0 2.7 2.7 0 6 0 L 42 0 L 64 22 L 64 82 C 64 85.3 61.3 88 58 88 Z  M 17 39.5 L 29.5 39.5 L 29.5 46 L 17 46 L 17 39.5 L 17 39.5 L 17 39.5 L 17 39.5 L 17 39.5 Z  M 17 51 L 29.5 51 L 29.5 57.5 L 17 57.5 L 17 51 L 17 51 L 17 51 L 17 51 L 17 51 Z  M 47 57.5 L 34.5 57.5 L 34.5 51 L 47 51 L 47 57.5 L 47 57.5 L 47 57.5 L 47 57.5 L 47 57.5 Z  M 47 46 L 34.5 46 L 34.5 39.5 L 47 39.5 L 47 46 L 47 46 L 47 46 L 47 46 L 47 46 Z  M 12 34.5 L 12 62.5 L 52 62.5 L 52 34.5 L 12 34.5 L 12 34.5 L 12 34.5 L 12 34.5 L 12 34.5 Z " fill-rule="evenodd"></path></g></g></g></svg>`
const panelHTML = `<div
    class="WUFI9b qdulke"
    id="panel"
    jsname="b0t70b"
    jscontroller="dkJU2d"
    jsaction="VOcP9c:QPhnyd;ntQuZe:EuYDs"s
    >
    <div class="CYZUZd">
        <div
            class="J8vCN zHGix"
            role="heading"
            aria-level="2"
            tabindex="-1"
            jsname="rQC7Ie"
        >
            Attendance
        </div>
        <div class="VUk8eb">
            <button
                class="help mdc-icon-button medium-button material-icons"
                style="right: 52px"
                aria-label="Help"
                jscontroller="VXdfxd"
                jsaction="mouseenter:tfO1Yc; mouseleave:JywGue;"
                tabindex="0"
                data-tooltip="Help"
                data-tooltip-vertical-offset="-12"
                data-tooltip-horizontal-offset="0"
            >
                help_outline
            </button>
            <div jsaction="JIbuQc:hR1TY;rcuQ6b:npT2md" jscontroller="AXYg3e">
                <span data-is-tooltip-wrapper="true"
                    ><button
                        class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb"
                        jscontroller="soHxf"
                        jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef"
                        aria-label="Close"
                        data-tooltip-enabled="true"
                        data-tooltip-id="tt-c21"
                    >
                        <div class="VfPpkd-Bz112c-Jh9lGc"></div>
                        <i
                            class="google-material-icons VfPpkd-kBDsod"
                            aria-hidden="true"
                            >close</i
                        >
                    </button>
                    <div
                        class="EY8ABd-OWXEXe-TAWMXe"
                        role="tooltip"
                        aria-hidden="true"
                        id="tt-c21"
                    >
                        Close
                    </div></span
                >
            </div>
        </div>
    </div>
    <div class="hWX4r">
        <div class="view class-view">
            <h4 class="subtitle">Student</h4>
            <ul class="mdc-list class-list">
                <template id="class-item-template">
                    <li
                        class="mdc-list-item"
                        role="option"
                        tabindex="0"
                    >
                        <span class="mdc-list-item__ripple"></span>
                        <span
                            class="mdc-list-item__graphic material-icons"
                            aria-hidden="true"
                        >
                            perm_identity
                        </span>
                        <span class="mdc-list-item__text class-entry">
                            My Class
                        </span>
                        <div class="mdc-list-item__meta double-meta">
                            <button
                                class="
                                    mdc-icon-button
                                    material-icons
                                    medium-button
                                    edit-class
                                "
                                aria-label="Edit"
                                jscontroller="VXdfxd"
                                jsaction="mouseenter:tfO1Yc; mouseleave:JywGue;"
                                tabindex="0"
                                data-tooltip="Edit"
                                data-tooltip-vertical-offset="-12"
                                data-tooltip-horizontal-offset="0"
                            >
                                edit
                            </button
                            ><button
                                class="
                                    mdc-icon-button
                                    material-icons
                                    medium-button
                                    delete-class
                                "
                                aria-label="Delete"
                                jscontroller="VXdfxd"
                                jsaction="mouseenter:tfO1Yc; mouseleave:JywGue;"
                                tabindex="0"
                                data-tooltip="Delete"
                                data-tooltip-vertical-offset="-12"
                                data-tooltip-horizontal-offset="0"
                            >
                                delete
                            </button>
                        </div>
                    </li>
                </template>
            </ul>
            <div class="no-classes notification" style="display: none">
                <i class="material-icons"> warning </i>
                <p>
                    You don't have any students! Add a student by clicking the
                    button below.
                </p>
            </div>
            <button class="mdc-button addeth-class">
                <div class="mdc-button__ripple"></div>
                <i
                    class="material-icons mdc-button__icon"
                    aria-hidden="true"
                    >add</i
                >
                <span class="mdc-button__label">Add Student</span>
            </button>
        </div>
    </div>
    <div id="export-container">
        <div
            role="progressbar"
            class="mdc-linear-progress"
            id="progress-bar"
            aria-label="Export Progress"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-valuenow="0"
        >
            <div class="mdc-linear-progress__buffer">
                <div class="mdc-linear-progress__buffer-bar"></div>
                <div class="mdc-linear-progress__buffer-dots"></div>
            </div>
            <div
                class="
                    mdc-linear-progress__bar mdc-linear-progress__primary-bar
                "
            >
                <span class="mdc-linear-progress__bar-inner"></span>
            </div>
            <div
                class="
                    mdc-linear-progress__bar mdc-linear-progress__secondary-bar
                "
            >
                <span class="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>
        <button
            class="mdc-button mdc-button--raised" id="export"
        >
            <div class="mdc-button__ripple"></div>
            ${sheetsSVG}
            <span class="mdc-button__label">Export</span>
        </button>
    </div>
    </div>`