export function clickableGrid( rows, cols ){
    var grid = document.createElement('table')
    grid.className = 'grid'
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'))
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'))
            cell.style.backgroundColor = "rgb(17, 17, 17)"
            cell.addEventListener("click", function () {
                this.style.backgroundColor = this.style.backgroundColor === "rgb(17, 17, 17)" ? "rgb(204, 204, 204)" : "rgb(17, 17, 17)"
            })
        }
    }
    return grid
}

function isValid( matrix, r, c, rows, cols ) {
    if (r < 0 || r >= rows)
        return false
    if (c < 0 || c >= cols)
        return false
    return matrix[r][c]
}

function isLive( matrix, r, c, rows, cols ) {
    var count = 0
    
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
                continue
            if (isValid(matrix, r+i, c+j, rows, cols))
                count++
        }
    }

    if(count == 3 || (count == 2 && matrix[r][c]))
        return true
    return false
}

export function intervalFunc ( grid, rows, cols ) {
    let matrix = Array(rows).fill().map(() => Array(cols))
    
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            matrix[r][c] = grid.rows[r].cells[c].style.backgroundColor === "rgb(204, 204, 204)"
        }
    }

    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            grid.rows[r].cells[c].style.backgroundColor = isLive(matrix, r, c, rows, cols) ? "rgb(204, 204, 204)" : "rgb(17, 17, 17)"
        }
    }
}

export function createButton ( text, type, func ) {
    var button = document.createElement("button")
    button.innerHTML = text
    button.addEventListener ( type, func )
    return button
}

export function setGrid ( grid, rows, cols, pattern ) {
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            grid.rows[r].cells[c].style.backgroundColor = pattern[r][c] === 1 ? "rgb(204, 204, 204)" : "rgb(17, 17, 17)"
        }
    }
}

export function saveButton ( grid, rows, cols ) {
    var button = document.createElement("button");
    button.innerHTML = "Save";
    button.addEventListener( "click", async function () {
        var name = prompt("Enter pattern name : ", "");
        if(name != null && name != "") {
            var pattern = []
            for (var r = 0; r < rows; ++r) {
                var row = []
                for (var c = 0; c < cols; ++c) {
                    row.push(grid.rows[r].cells[c].style.backgroundColor == "rgb(17, 17, 17)" ? 0 : 1);
                }
                pattern.push(row)
            }
            
            var data = { name: name, pattern: pattern };
            fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(function(response){
                if(response.ok) {
                    console.log('POST success.');
                    return;
                }
                if(response.status == 403) {
                    console.log('POST Failed: Pattern name already exists.');
                    return;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
    return button;
}

export function loadButtons ( grid, rows, cols, patterns ) {
    patterns.forEach((obj) => {
        var button = document.createElement("button")
        button.innerHTML = obj.name
        button.className = 'loadedButtons'
        button.addEventListener ( "click", () => { setGrid( grid, rows, cols, obj.pattern ) } )
        document.body.appendChild(button)
    })
}
