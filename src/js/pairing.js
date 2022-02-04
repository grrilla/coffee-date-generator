function doSignedIn() {
    let sheetId = ORG_CHART_SHEET_ID
    if (!sheetId || sheetId === '') {
        alert('must set a sheet ID')
        return
    }
    var params = {
        spreadsheetId: sheetId,
        range: 'A1:R'
    };


    gapi.client.sheets.spreadsheets.values.get(params).then(function (response) {
        let values = response.result.values
        indexOfCol = createIndexKeys(values[0])
        values.shift()
        let participants = values.map((value) => {
            return {
                name: value[indexOfCol['name']],
                department: value[indexOfCol['department']],
                email: value[indexOfCol['email']],
            }
        });
        let pairings = pairPeople(participants)
        console.log(pairings)
        let html = ''
        for (let i = 0; i < pairings.matchPool.length; i++) {
            let pairing = pairings.matchPool[i]
            console.log(pairing)
            html += `<div class="pairing">
                <div class="pairing-left">  
                    <div class="pairing-name">${pairing.personOne.name}</div>
                </div>
                <div class="pairing-right">
                    <div class="pairing-name">${pairing.personTwo.name}</div>
                </div>
            </div>`

        }
        document.getElementById('pairings').innerHTML = html
    }).catch((err) => {
        console.error('error', err)
    });
}