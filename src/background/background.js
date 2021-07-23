var head = document.getElementsByTagName('head')[0];

// Call  onGAPILoad
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://apis.google.com/js/client.js?onload=onGAPILoad";
head.appendChild(script);

// Check whether gapi token get
chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log('got the token', token);
})

// Set Up Service Account Token (To prevent Google Sheet give access denied issue)
function postJWT(jwt, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200 && callback) {
                callback(this.responseText);
                return;
            }
            if (console) console.log(this.responseText);
        }
    };
    var parameters = "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + encodeURIComponent(jwt);
    xhttp.open("POST", "https://www.googleapis.com/oauth2/v4/token", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function getCert() {
    var cert = //your json key (downloaded earlier) goes here
    {
        "type": "service_account",
        "project_id": "tidy-rainfall-319700",
        "private_key_id": "32fa7038d4277f57aef9f006633dac2eeec7aaec",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2NvKVVlYqLGVx\nhklkWMPET7ag7gv+daIAjTWR4q7knrwQea+j5GD/gva1v+jsDH+IHiTIpL9ks3Yn\nBkhihBkY25ztgGZAPiuUkB9rwHex+wGb4HEOSzJNUzdI+tsLxWxyRMi6uABjVSdp\nuZQ8axjdqt66f7lVDC3gj+5K7AKcMfMNmSHZhFl41BbZHyJJM4LMvN2dd98vzrFW\nwJxJiqN7m2Caf9FVcdoIB9DOEGx0b4AG0UrVj9MBaL3nLctBC4pWZuXAGbR/PBJ4\nMMh2F484vrBF2J5/sIG3aqAgvG2ZT2rP+MeGzzfNxGTWxQGhJ7/WWCeZ2KEz1bU/\nzHKlzOfDAgMBAAECggEAAUqdaIqOnMjoxSe3AHOSm6MW/8gAJMMPrWJS1WBebfdk\nDNfX81jsiRMUDZC5JWcnRj80comcY6nT9g3Y2H3oMaFo2NQWpXDrXSeyWVCpaIUH\na2PpWTkWN68VzroccFZrYNn09EHWmt2hJGIw10bJC9Uos/iwxxYJgzRx82z9zb6X\n0cBxFwMnlUp2brsRqBKWONCtI/how8KemKx/6LGUaeq9+zzLAJ9igLt+i48+wUbR\n6LQYXdkQJPGm9P5AvEcK3ZLcFbmvXVy4LuneiOLuoDA3QHrYjiY84+d5e+l1PVWu\nIn/SRrOP0ETsyv9oeMR+bZyDI3w4B8DAJkK5ADZVhQKBgQDlQp3smCrvjFh7SLHJ\n6Serz2gFj8QPvUmoLHxZKIMJOjRlxYhUrUEnEP0sO8wWccwthRng4bnGyIAluKBO\nUyKQpyD40ffOhi+OBIt9UZouyDGvy8ZhihOKgt8VX52Dfq2kLIeGEdDAbbUkcg8J\nA3MS5/iippERbG+3ZId7MAgKfQKBgQDLd53g9SiWC1ImV6jt7dQDaNuep7dDXeqF\n1Z1/7CCeqpUOIflInyijeAHyhs8MJZfr+8odGecjFyBQLeLJhQrKf8B28QPP5tCx\n2L/GuvdyAml8phuWhUvte3CZJXVbwEpwSaHg/yQ14kU6X6PM+t2geQPk2S3s73ni\n2E8EuRkPPwKBgHUoVPH6VT6zdugRnyFyr95CEIN/E4+DiOeTTDx30nbdsrcred7j\n5v6i1O5M5J+3qcK9WRst3zUxcyNTtUAxheFsNxJQopV8x0KJGguBrwwnLBUNSqS/\n3fqTpJMUmLcA/pV+WAdwhUBBECe+zeYqSB0qREpCWrIPuwt6KS4Pvpw1AoGAR2M2\nn4EktlBOiGllOeWh53hY5feOUzKWYFKsqf9dCo5rMcQ1xIcjKQeoF0G5T1e5T/DN\n3xwBfsxUaA1RbschHB9qldDGN6GSQ3P7BWz/+J5kCHn3X/5wv2f5/6Gm5YQ4GeGb\nzGd4evditrJrtDWooO8UsKyKcoErUK34O33+Dt0CgYAWWoUUzMM3HWFfVOVsrW0P\nC/DNyq64KDF/MTZO8QPtBzfYhcUKi11vaHY63zTMGatc9AM59noyMOrXvKo5t30m\neujGfiGyFkKHLcEwwqHzBPdDcWitXqY+E1Azp/N7iYOOkeM9WS8dnaOFxkwouzaa\nlOg9sWNBRe3WY8moaOrwTg==\n-----END PRIVATE KEY-----\n",
        "client_email": "smartclassroomserviceaccount@tidy-rainfall-319700.iam.gserviceaccount.com",
        "client_id": "101198967386035525868",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/smartclassroomserviceaccount%40tidy-rainfall-319700.iam.gserviceaccount.com"
    }

    return cert;
}

function getJWT() {
    var cert = getCert();
    var key = KEYUTIL.getKey(cert.private_key);
    var headers = { "alg": "RS256", "typ": "JWT" };
    var issued = Math.floor(new Date().getTime() / 1000);

    var claims = {
        "iss": cert.client_email,
        "scope": "https://www.googleapis.com/auth/spreadsheets",
        "aud": "https://www.googleapis.com/oauth2/v4/token",
        "exp": issued + 3600,
        "iat": issued
    };

    var jwt = KJUR.jws.JWS.sign(headers.alg, headers, JSON.stringify(claims), key);
    return jwt;
}

let clientToken;

postJWT(getJWT(), function (response) {
    clientToken = JSON.parse(response).access_token;
});

const API_KEY = 'AIzaSyCzT1Ltha85DX-xRemUx1b9JkipCdPEgiU';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const MANAGEMENT_SPREADSHEET_ID = '1Oa6kkkpFVh7o98gEmoNgnAsQmvNeRmzu8awyNrp3wWI';
const MANAGEMENT_SPREADSHEET_TAB_NAME = 'main';

// Initialize gapi
function onGAPILoad() {

    gapi.client.init({
        // Don't pass client nor scope as these will init auth2, which we don't want
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,

    }).then(function () {
        // Set service account token
        gapi.auth.setToken({
            'access_token': clientToken,
        });

        console.log('gapi initialized');

    }, function (error) {
        console.log('Error = ', error);
    });
}

// Check whether sheet code in the management spreadsheet
function checkSheetCode(programmeAvailable, sheetCode) {

    var data = {
        name: 'sheetCodeIsOn',
        sheetCode: null,
        detail: null,
        sheetID: null
    }

    for (let i = 0; i < programmeAvailable.length; i++) {
        console.log(programmeAvailable[i][0]);

        if (sheetCode === programmeAvailable[i][0]) {

            SPREADSHEET_ID = programmeAvailable[i][2];

            data.sheetCode = programmeAvailable[i][0];
            data.detail = programmeAvailable[i][1];
            data.sheetID = programmeAvailable[i][2];

            // Create header for Sheet if Sheet empty
            checkEmptySheet(data.sheetID);

            break;
        }
    }

    // Send data to popup.js to process
    chrome.runtime.sendMessage(data);
}

function checkEmptySheet(sheetID) {

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: 'Sheet1',
    }).then(async function (response) {

        if(response.result.values === undefined){
            //Create header
            let requests = []
            requests = requests.concat(createHandSheetHeaders(0));
            console.log(requests);
    
            const body = {
                requests: requests,
                includeSpreadsheetInResponse: true,
            }

            const init = {
                method: 'POST',
                async: true,
                headers: {
                    Authorization: 'Bearer ' + clientToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }

            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/1sRoB8cDP6Zi3jdmAYAyEpMStV3dGBu3FtW1KLPAKi78:batchUpdate`,
                init
            )
            
            if (response.ok) {
                console.log('Successfully create Sheet\'s header!');
            } else {
                console.log('Fail to create Sheet\'s header! Please contact TARUC Management');
            }

        }

    }, function (error) {
        console.log('Error', error)
    });
}

function formatDate(d){
    const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var day = weekday[d.getDay() - 1];
    var date = ('0' + d.getDate()).slice(-2);
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var year = ('0' + d.getFullYear()).slice(-4);

    return day + ', ' + date + '-' + month + '-' + year;
}

function calculateInterval(currentTime, lastActiveTime){

    var timeInterval = Math.abs(currentTime - lastActiveTime) / 1000;

    // calculate hours
    const hours = Math.floor(timeInterval / 3600) % 24;
    timeInterval -= hours * 3600;

    // calculate minutes
    var minutes = Math.floor(timeInterval / 60) % 60;
    timeInterval -= minutes * 60;

    // calculate seconds
    var seconds = timeInterval % 60;

    return  hours + ':' + ('0' + Math.trunc(minutes)).slice(-2) + ':' + ('0' + Math.trunc(seconds)).slice(-2);
}

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {

        // User need to authorize their own account first to use the service account
        chrome.identity.getAuthToken({ interactive: true }, function (token) {

            if (request.name === 'sheetCode') {
                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: MANAGEMENT_SPREADSHEET_ID,
                    range: MANAGEMENT_SPREADSHEET_TAB_NAME,
                }).then(function (response) {

                    console.log(`Got ${response.result.values.length} rows back`);

                    const programmeAvailable = (response.result.values);
                    programmeAvailable.shift(); // Remove title row in Sheet from the array
                    // console.log(programmeAvailable);

                    checkSheetCode(programmeAvailable, request.code);

                }, function (error) {
                    console.log('Error', error)
                });

            } else if (request.name === 'meetAction') {

                // To prevent model start will append data to Google Sheet
                if (request.name !== undefined && request.gesture !== undefined) {

                    const d = new Date();
                    var currentDate = formatDate(d); // Use different format instead of toLocaleDateString()
                    var currentTime = new Date();
                    var lastActiveTime = new Date(request.lastActiveTime); 

                    var interval = calculateInterval(currentTime, lastActiveTime);

                    const body = {
                        values: [[
                            request.username,
                            request.gesture,
                            currentDate,
                            lastActiveTime.toLocaleTimeString(),
                            currentTime.toLocaleTimeString(),
                            interval
                        ]]
                    };

                    // Append values to the spreadsheet
                    gapi.client.sheets.spreadsheets.values.append({
                        spreadsheetId: request.sheetID,
                        range: 'Sheet1',
                        valueInputOption: 'USER_ENTERED',
                        resource: body
                    }).then((response) => {
                        // On success
                        console.log(`${response.result.updates.updatedCells} cells appended.`)
                        sendResponse({ success: true });

                    }, function (error) {

                        var status = error.result.error.status;
                        alert('Error occur in Google SpreadSheet: ' + status + '\nPlease contact TARUC Management');

                    });
                }
            }
        })

        // Wait for response
        return true;
    }
);
