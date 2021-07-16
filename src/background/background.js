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
        "project_id": "smartclassroom-319211",
        "private_key_id": "9c12436e8fc9a61763415a73684b5859c8cf5f45",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlV2yr4qPkuBTh\n8qHB1wwhF2ClnOuZEMqLDyAO7IBEI6FCsovCRQxoQJiXYpnmrv2O/hWzg8VbJYgy\nyPxtqeJk+lBsV433PAeAH6rH6YDGUhZQTL344TuJLEVAbn+oekwkDHzDITkyXAqy\nRPpGTvlhwlOfGQid7F9TyFJ3vEzGNWuKRB7tttT/JW2ek54KfXZzV4R5MoeKDsb3\nZiAuYsP1tJNducqbH3Q+mBeKyQgNpYW90CWy5ECytKLsVa2h3zklg4dqJiFgX+e0\nyXgZmkY3EvbwVgytY9uDPm2BB/ESJD6fPhMHGGqIFgfAyr7LdHYK36j/02Oh9JsL\n//nFnxlnAgMBAAECggEAB1HSp8BpsgYSBzgYOOM6gYqJIiAFAPNL6O5IUVGeXQ5f\nZOKP8AOw0Vmmb8Z3hP5MHME37hfO4l7V9FD9MCl+OUd9Q51JFv1Ke/4GvwSmgIM5\nhRc975s4rDhxKWJIHsIbJgIOr/z3zLIAAWU5hlRE71LQGmwmc0E1CwEsvfeQ4mPd\n8uwy6OvisDEQDEa898qm3o26w0W5zDxZn8IL0PLXImB/bavf6x67Ye6dig+v5Onr\nUqBQ6pC3RARgXET+OumtKCp5fcpDxYZrqwT9IUgCxVX2G7o38GN7uPTJqqYuebq9\nzdPzi29nL22uhNyM1lzxqIhTDlTokUv4kgvhBlayYQKBgQDy1xgI43hvl+oY/EqS\nbvpJtpRlNIsD7/5wPvXgjLD6UPeheC90kGHUrbNsj02Jl9RGhyZcbUhJbI3i6ZM6\nfIvNSt9HJWTZzTJT5DPxhyPI8O9a8T4QsBTCx+vK6MOEPbJtYzTF3CHMYilYhvv8\nI9y6JA+gmWaqk+3Gj0eTMPaAkQKBgQDxxRBdYQC34ozapphdgOC4+L3m9+WEQl+V\nVJFDtkHfMsv7YbBTzHyc/wELq2lN1qaqulvWtWWQS3U82gBHA+JIgKXsxBIm1z6Q\n57eSnWuCNXH3a16FpS1NodgLzA6ZTyz39m0V7CSFFCdGbxRv+Fs6zY+/IVwr9Eyw\nvz7mKp72dwKBgQCbLojVZUdZSKL4RIEDApg+8sXxxpnvcjYOVK2bSUzvKT6VmM/6\nlSlvV3EJNqo9+yBT0ZnaBpvjD9O75beH8H8GOYplVKgV5uL6aSIofkuH5S+P1gnr\ncBpUPp2XlRccMrEK5hKbPgj7Kt9xCxGMFv6+lLzHzD+nUdDoyjbbALcFgQKBgFpH\nU80Ko9IGbsJW4x5HOaLYf1D30GSKxFZmtberHv3RYgoEeGtSOFYHgsRwxWmjdaja\n3eBW7A3tn2GRpfjeomigYVUAAicuyNYjMJE25yY//sZ8+Va+TyRmAt6k2+6zef89\nrY46F4j59ZB/ego1mxtiFwMv2dMv7lMxlrMrxyARAoGBAJjdWGbDCWjt+xdq7R9d\n0hPOsJWFl+jJUzb1CoE8R/Y9Zc9ISjElj2keGoGz0lWsinpYXXXOP9eBpJHlDOT5\nO74lihRnRa8BUuokys5ZLKdJogZi4U4DQosYJ02byHqlIawXgdgkA3997bz6xKv7\no2En9Gzuvrl7RG/LUx8+03Hy\n-----END PRIVATE KEY-----\n",
        "client_email": "user-644@smartclassroom-319211.iam.gserviceaccount.com",
        "client_id": "103304609163647483410",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/user-644%40smartclassroom-319211.iam.gserviceaccount.com"
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

const API_KEY = 'AIzaSyADyoalWfI5ZIDSjvXE7lyZunZNPdIka1s';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const MANAGEMENT_SPREADSHEET_ID = '10Jz7g8PxIu_f03wIMIfyCaOA6DfRtmuQw3hY_iUMwMY';
const MANAGEMENT_SPREADSHEET_TAB_NAME = 'main';

// Initialize gapi
function onGAPILoad() {

    gapi.client.init({
        // Don't pass client nor scope as these will init auth2, which we don't want
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,

    }).then(function () {
        console.log('gapi initialized')

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
            break;
        }
    }

    // Send data to popup.js to process
    chrome.runtime.sendMessage(data);
}

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {

        // User need to authorize their own account first to use the service account
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            // Set GAPI auth token (service account token)
            gapi.auth.setToken({
                'access_token': clientToken,
            });

            if (request.name === 'sheetCode') {
                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: MANAGEMENT_SPREADSHEET_ID,
                    range: MANAGEMENT_SPREADSHEET_TAB_NAME,
                }).then(function (response) {

                    console.log(`Got ${response.result.values.length} rows back`);

                    const programmeAvailable = (response.result.values);
                    programmeAvailable.shift(); // Remove title row in Sheet from the array
                    console.log(programmeAvailable);

                    checkSheetCode(programmeAvailable, request.code);

                }, function (error) {
                    console.log('Error', error)
                });

            } else if (request.name === 'meetAction') {

                // To prevent model start will append data to Google Sheet
                if (request.name !== undefined && request.gesture !== undefined) {
                    const body = {
                        values: [[
                            request.username,
                            request.gesture,
                            new Date().toString()
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
