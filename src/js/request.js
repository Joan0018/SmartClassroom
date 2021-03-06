'use strict'
function updateSheetProperties(className, code, sheetId, fields) {
    const requests = [
        {
            updateSheetProperties: {
                properties: {
                    sheetId: sheetId,
                    title: className,
                    gridProperties: {
                        rowCount: 2,
                        columnCount: 8,
                        frozenRowCount: 1,
                    },
                },
                fields: fields,
            },
        },
    ]
    requests.push(createSheetMetadata(className, sheetId))
    return requests
}

function addSheet(sheetName) {
    const requests = [
        {
            addSheet: {
                properties: {
                    title: sheetName,
                    gridProperties: {
                        rowCount: 2,
                        columnCount: 8,
                        frozenRowCount: 1,
                    },
                },
            },
        },
    ]
    // requests.push(createSheetMetadata(className, sheetId))
    return requests
}

function createSheetMetadata(className, sheetId) {
    const request = {
        createDeveloperMetadata: {
            developerMetadata: {
                metadataId: Utils.hashCode(className),
                metadataKey: className,
                location: {
                    sheetId: sheetId,
                },
                visibility: 'DOCUMENT',
            },
        },
    }
    return request
}

function deleteSheetMetadata(oldClassName) {
    const request = {
        deleteDeveloperMetadata: {
            dataFilter: {
                developerMetadataLookup: {
                    metadataId: Utils.hashCode(oldClassName),
                },
            },
        },
    }
    return request
}

function deleteCodeMetadata(code) {
    const request = {
        deleteDeveloperMetadata: {
            dataFilter: {
                developerMetadataLookup: {
                    metadataKey: code,
                },
            },
        },
    }
    return request
}

function createHeaders(sheetId) {
    const color = {
        red: 0.75,
        green: 0.75,
        blue: 0.75,
        alpha: 1,
    }

    const requests = [
        {
            updateCells: {
                rows: [
                    {
                        values: [
                            {
                                userEnteredValue: {
                                    stringValue: 'Last Name',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'LEFT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's last name.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'First Name',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'LEFT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's first name.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Student ID',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'LEFT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's ID.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Student Email',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'LEFT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's Email.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Present',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: 'Whether or not the student signed facial attendance.',
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Time In',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'RIGHT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: 'When the student first joined the meeting, or empty if the student never joined.',
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Time Out',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'RIGHT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: 'When the student left the meeting, or empty if the student was in the meeting at time of export.',
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Time Taken',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'RIGHT',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: 'When the student take the attendance.',
                            },
                        ],
                    },
                    {
                        values: [
                            {
                                userEnteredValue: {
                                    stringValue:
                                        'Generated by the Google Meet Smart Classroom extension.',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        italic: true,
                                    },
                                },
                            },
                        ],
                    },
                ],
                fields: '*',
                start: {
                    sheetId: sheetId,
                    rowIndex: 0,
                    columnIndex: 0,
                },
            },
        },
        {
            mergeCells: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: 1,
                    endRowIndex: 2,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                mergeType: 'MERGE_ALL',
            },
        },
        {
            updateBorders: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                top: {
                    style: 'SOLID',
                    color: color,
                },
                bottom: {
                    style: 'SOLID',
                    color: color,
                },
                left: {
                    style: 'DOUBLE',
                    color: color,
                },
                right: {
                    style: 'DOUBLE',
                    color: color,
                },
                innerVertical: {
                    style: 'SOLID',
                    color: color,
                },
            },
        },
        {
            updateBorders: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: 1,
                    endRowIndex: 2,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                top: {
                    style: 'DOUBLE',
                    color: color,
                },
            },
        },
    ]
    return requests
}

function createHandSheetHeaders(sheetId) {
    const requests = [
        {
            updateCells: {
                rows: [
                    {
                        values: [
                            {
                                userEnteredValue: {
                                    stringValue: 'Username',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's name.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Email',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's email.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Hand Gesture',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's hand gesture.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Date',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "Event Date",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'System Start Time',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "The student's system start time.",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Gesture Time',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "Time that student perform the hand gesture",
                            },
                            {
                                userEnteredValue: {
                                    stringValue: 'Time Interval',
                                },
                                userEnteredFormat: {
                                    horizontalAlignment: 'CENTER',
                                    textFormat: {
                                        bold: true,
                                    },
                                },
                                note: "Time Interval between Last Active Time and Gesture Time",
                            },
                        ],
                    },
                ],
                fields: '*',
                start: {
                    sheetId: sheetId,
                    rowIndex: 0,
                    columnIndex: 0,
                },
            },
        },
        {
            updateDimensionProperties: {
                range: {
                    sheetId: sheetId,
                    dimension: "COLUMNS",
                    startIndex: 0,
                    endIndex: 6
                },
                properties: {
                    pixelSize: 180
                },
                fields: "pixelSize"
            },
        },
    ]
    return requests
}

function AddASheet(sheetName){
    const requests = [
        {
            addSheet: {
                properties: {
                  title: sheetName,
                  gridProperties: {
                    rowCount: 25,
                    columnCount: 26
                  },
                  tabColor: {
                    red: 1.0,
                    green: 1.0,
                    blue: 1.0
                  }
                }
            }
        },
    ]
    return requests
}

async function initializeCells(code, sheetId, attend) {
    sheetId = parseInt(sheetId)
    const color = {
        red: 0.75,
        green: 0.75,
        blue: 0.75,
        alpha: 1,
    }
    const rows = await generateAttendanceRows(code, attend)

    let requests = [
        {
            insertDimension: {
                range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: 1,
                    endIndex: 1 + rows.length,
                },
                inheritFromBefore: false,
            },
        },
        {
            updateCells: {
                rows: rows,
                fields: '*',
                start: {
                    sheetId: sheetId,
                    rowIndex: 1,
                    columnIndex: 0,
                },
            },
        },
        {
            mergeCells: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: 1,
                    endRowIndex: 2,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                mergeType: 'MERGE_ALL',
            },
        },
        {
            createDeveloperMetadata: {
                developerMetadata: {
                    metadataId: Utils.hashCode(`${code}??${sheetId}`),
                    metadataKey: code,
                    location: {
                        dimensionRange: {
                            sheetId: sheetId,
                            dimension: 'ROWS',
                            startIndex: 1,
                            endIndex: 2,
                        },
                    },
                    visibility: 'DOCUMENT',
                },
            },
        },
    ]
    requests = requests.concat(addGroup(sheetId, 1, rows.length))
    requests = requests.concat(createBorders(sheetId, 1, rows.length, color))
    return requests
}

async function updateCells(token, code, spreadsheetId, sheetId, startRow, attend) {
    sheetId = parseInt(sheetId)
    const color = {
        red: 0.75,
        green: 0.75,
        blue: 0.75,
        alpha: 1,
    }

    let requests = []
    const numRows = await getRowCountByStartRow(
        token,
        spreadsheetId,
        sheetId,
        startRow
    )
    const rows = await generateAttendanceRows(code, attend)
    requests.push({
        deleteDimensionGroup: {
            range: {
                sheetId: sheetId,
                dimension: 'ROWS',
                startIndex: startRow + 1,
                endIndex: startRow + numRows,
            },
        },
    })
    if (rows.length > numRows) {
        requests.push({
            insertDimension: {
                range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: startRow + numRows,
                    endIndex: startRow + rows.length,
                },
                inheritFromBefore: true,
            },
        })
    } else if (rows.length < numRows) {
        requests.push({
            deleteDimension: {
                range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: startRow + rows.length,
                    endIndex: startRow + numRows,
                },
            },
        })
    }
    requests.push({
        updateCells: {
            rows: rows,
            fields: '*',
            start: {
                sheetId: sheetId,
                rowIndex: startRow,
                columnIndex: 0,
            },
        },
    })
    requests = requests.concat(addGroup(sheetId, startRow, rows.length))
    requests = requests.concat(
        createBorders(sheetId, startRow, rows.length, color)
    )
    return requests
}

function createBorders(sheetId, startRow, numRows, color) {
    const requests = [
        {
            updateBorders: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: startRow,
                    endRowIndex: startRow + numRows,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                top: {
                    style: 'DOUBLE',
                    color: color,
                },
                bottom: {
                    style: 'DOUBLE',
                    color: color,
                },
                left: {
                    style: 'DOUBLE',
                    color: color,
                },
                right: {
                    style: 'DOUBLE',
                    color: color,
                },
            },
        },
        {
            updateBorders: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: startRow,
                    endRowIndex: startRow + 1,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                },
                bottom: {
                    style: 'SOLID',
                    color: color,
                },
            },
        },
    ]
    return requests
}

function autoResize(sheetId) {
    const request = {
        autoResizeDimensions: {
            dimensions: {
                sheetId: sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 8,
            },
        },
    }
    return request
}

function addGroup(sheetId, startRow, numRows) {
    const requests = [
        {
            addDimensionGroup: {
                range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: startRow + 1,
                    endIndex: startRow + numRows,
                },
            },
        },
        {
            updateDimensionGroup: {
                dimensionGroup: {
                    range: {
                        sheetId: sheetId,
                        dimension: 'ROWS',
                        startIndex: startRow + 1,
                        endIndex: startRow + numRows,
                    },
                    depth: 1,
                    collapsed: false,
                },
                fields: 'collapsed',
            },
        },
    ]
    return requests
}

async function collapseGroup(token, code, spreadsheetId, sheetId) {
    const spreadsheet = await getSpreadsheet(token, spreadsheetId)
    const meta = await getMetaByKey(`${code}??${sheetId}`, token, spreadsheetId)
    const startRow = meta.location.dimensionRange.startIndex
    const requests = []
    const sheet = spreadsheet.sheets.find(
        (sheet) => sheet.properties.sheetId === sheetId
    )
    for (const rowGroup of sheet.rowGroups) {
        if (!rowGroup.collapsed && rowGroup.range.startIndex !== startRow + 1) {
            requests.push({
                updateDimensionGroup: {
                    dimensionGroup: {
                        range: rowGroup.range,
                        depth: rowGroup.depth,
                        collapsed: true,
                    },
                    fields: 'collapsed',
                },
            })
        }
    }
    if (requests.length > 0) {
        return requests
    }
    return null
}

const red = {
    red: 217 / 255,
    green: 48 / 255,
    blue: 37 / 255,
    alpha: 1,
}
const green = {
    red: 52 / 255,
    green: 167 / 255,
    blue: 83 / 255,
    alpha: 1,
}
const white = {
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
}

async function generateAttendanceRows(code, attend) {
    var now = new Date();
    var datenow = ("0" + now.getDate()).slice(-2)+'-'+("0" + (now.getMonth() + 1)).slice(-2)+'-'+now.getFullYear();
    var timenow = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();;
    var dateTime = datenow +' '+timenow;
    const header = `${dateTime} : ${code}`
    const rowData = [
        {
            values: [
                {
                    userEnteredValue: {
                        stringValue: header,
                    },
                    userEnteredFormat: {
                        horizontalAlignment: 'CENTER',
                        backgroundColor: {
                            red: 0.95,
                            green: 0.95,
                            blue: 0.95,
                            alpha: 1,
                        },
                    },
                    textFormatRuns: [
                        {
                            startIndex: 0,
                            format: {
                                bold: true,
                            },
                        },
                        {
                            startIndex: header.length - code.length,
                            format: {
                                bold: true,
                                italic: true,
                            },
                        },
                    ],
                },
            ],
        },
    ]
    let i = attend.length - 1;
    const names = []
    attend.forEach((student) => {
        names.push(student.name);
    });
    names.sort(Utils.compareLast)
    for (const name of names) {
        const firstName = Utils.getFirstName(name)
        const lastName = Utils.getLastName(name)
        let studId = attend[i].id,
            email = attend[i].email,
            present = 'Y',
            timeIn = attend[i].start,
            timeOut = attend[i].end,
            timeTake = attend[i].take

        rowData.push({
            values: [
                {
                    userEnteredValue: {
                        stringValue: firstName,
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: lastName,
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: studId,
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: email,
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: present,
                    },
                    userEnteredFormat: {
                        backgroundColor: present === 'N' ? red : green,
                        borders: {
                            top: {
                                style: 'SOLID',
                                color: white,
                            },
                            bottom: {
                                style: 'SOLID',
                                color: white,
                            },
                        },
                        horizontalAlignment: 'CENTER',
                        textFormat: {
                            foregroundColor: white,
                            bold: true,
                        },
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: timeIn,
                    },
                    userEnteredFormat: {
                        horizontalAlignment: 'RIGHT',
                        numberFormat: {
                            type: 'TIME',
                            pattern: 'hh:mm A/P"M"',
                        },
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: timeOut,
                    },
                    userEnteredFormat: {
                        horizontalAlignment: 'RIGHT',
                        numberFormat: {
                            type: 'TIME',
                            pattern: 'hh:mm A/P"M"',
                        },
                    },
                },
                {
                    userEnteredValue: {
                        stringValue: timeTake,
                    },
                    userEnteredFormat: {
                        horizontalAlignment: 'RIGHT',
                        numberFormat: {
                            type: 'TIME',
                            pattern: 'hh:mm A/P"M"',
                        },
                    },
                },
            ],
        })
        i -= 1;
    }
    return rowData
}

function getSpreadsheetTheme() {
    return {
        primaryFontFamily: 'Courier New',
        themeColors: [
            {
                colorType: 'ACCENT5',
                color: {
                    rgbColor: {
                        red: 1,
                        green: 0.42745098,
                        blue: 0.003921569,
                    },
                },
            },
            {
                colorType: 'TEXT',
                color: {
                    rgbColor: {},
                },
            },
            {
                colorType: 'ACCENT1',
                color: {
                    rgbColor: {
                        red: 0.25882354,
                        green: 0.52156866,
                        blue: 0.95686275,
                    },
                },
            },
            {
                colorType: 'ACCENT3',
                color: {
                    rgbColor: {
                        red: 0.9843137,
                        green: 0.7372549,
                        blue: 0.015686275,
                    },
                },
            },
            {
                colorType: 'BACKGROUND',
                color: {
                    rgbColor: {
                        red: 1,
                        green: 1,
                        blue: 1,
                    },
                },
            },
            {
                colorType: 'ACCENT6',
                color: {
                    rgbColor: {
                        red: 0.27450982,
                        green: 0.7411765,
                        blue: 0.7764706,
                    },
                },
            },
            {
                colorType: 'ACCENT4',
                color: {
                    rgbColor: {
                        red: 0.20392157,
                        green: 0.65882355,
                        blue: 0.3254902,
                    },
                },
            },
            {
                colorType: 'ACCENT2',
                color: {
                    rgbColor: {
                        red: 0.91764706,
                        green: 0.2627451,
                        blue: 0.20784314,
                    },
                },
            },
            {
                colorType: 'LINK',
                color: {
                    rgbColor: {
                        red: 0.06666667,
                        green: 0.33333334,
                        blue: 0.8,
                    },
                },
            },
        ],
    }
}

async function getMetaByKey(key, token, spreadsheetId) {
    
    const init = {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/developerMetadata/${Utils.hashCode(`${key}`)}`,
        init
    )
    if (response.ok || response.status === 404) {
        const data = await response.json()
        Utils.log(`Get metadata for key ${key} response:`)
        console.log(data)
        if (data.error) {
            return null
        }
        return data
    } else if (response.status == 401) {
        throw response
    } else {
        console.log(response)
        throw new Error(
            'An error occurred while accessing the spreadsheet. Please try again later.'
        )
    }
}

async function getSpreadsheet(token, spreadsheetId) {
    const init = {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
        init
    )
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        throw new Error(
            'An error occurred while accessing the spreadsheet. Please try again later.'
        )
    }
}

async function getRowCountByStartRow(token, spreadsheetId, sheetId, startRow) {
    const spreadsheet = await getSpreadsheet(token, spreadsheetId)
    const group = spreadsheet.sheets
        .find((sheet) => sheet.properties.sheetId === sheetId)
        .rowGroups.find((group) => group.range.startIndex === startRow + 1)
    if (group) {
        return group.range.endIndex - startRow
    }
    return 0
}

async function batchUpdate(token, requests, spreadsheetId, sheetId = -1) {
    if (sheetId !== -1) {
        requests.push(autoResize(sheetId))
    }
    Utils.log('Executing batch update...')
    console.log(requests)
    const body = {
        requests: requests,
        includeSpreadsheetInResponse: true,
    }
    const init = {
        method: 'POST',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
        init
    )
    const data = await response.json()
    console.log(data);
    if (response.ok) {
        return data
    } else {
        return null;
        // throw new Error(
        //     'An error occurred while updating the spreadsheet. Please try again later.'
        // )
    }
}
