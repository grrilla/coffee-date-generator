let CLIENT_ID = '951450672419-1f057vlvdvspimp5spujh32utcachngm.apps.googleusercontent.com'
let ORG_CHART_SHEET_ID = '1GEZId7qG4uMk76j0bEMukLI5tGP00zhY4u5Tz663EEY'


// Global State
let GS = {}

$(document).ready(function () {
    $('#sheetLink').attr('href', 'https://docs.google.com/spreadsheets/d/' + ORG_CHART_SHEET_ID)
    $('#bioLink').attr('href', 'https://docs.google.com/spreadsheets/d/' + ORG_CHART_SHEET_ID)
    gapi.load('client:auth2', () => {
        var SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.readonly'
        gapi.client.init({
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
    })
})

function signInUser() {
    gapi.auth2.getAuthInstance().signIn()
}


function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        GS.user = gapi.auth2.getAuthInstance().currentUser.get()
        GS.token = GS.user.getAuthResponse()['access_token']
        doSignedIn()
        let loginEl = document.getElementById("login");
        if (loginEl) {
            loginEl.style.display = "none";
        }
    } else {
        gapi.auth2.getAuthInstance().signIn()
    }
}

function createIndexKeys(indexArray) {
    let tempMap = new Map([])
    for (let i = 0; i < indexArray.length; i++) {
        tempMap[indexArray[i].toLowerCase()] = i
    }
    return tempMap
}
