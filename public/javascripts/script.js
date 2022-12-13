import { clickableGrid, createButton, intervalFunc, setGrid, saveButton, loadButtons } from "./utils.js"

var rows = 60, cols = 120

// creating grid
var grid = clickableGrid( rows, cols )
document.body.appendChild(grid)

let interval
// creating Simulate button
var simulate = createButton( "Simulate", "click", function () {
    simulate.disabled = true
    interval = setInterval( intervalFunc, 100, grid, rows, cols )
} )
simulate.setAttribute('id','simulate')
document.body.appendChild(simulate)

// creating Stop button
var stop = createButton( "Stop", "click", () => {
    clearInterval(interval)
    simulate.disabled = false
} )
stop.setAttribute('id','stop')
document.body.appendChild(stop)

// creating Clear button
var clear = createButton( "Clear", "click", () => { setGrid( grid, rows, cols, Array(rows).fill().map(() => Array(cols).fill(0)) ) } )
clear.setAttribute('id','clear')
document.body.appendChild(clear)

// creating Save button
var save = saveButton( grid, rows, cols )
save.setAttribute('id','save')
document.body.appendChild(save)

let patterns
// creating Load button
var load = createButton( "Load", "click", async function () {
    await fetch('/load')
        .then((response) => response.json())
        .then((data) => patterns = data)
    
    document.querySelectorAll('.loadedButtons').forEach(e => e.remove())
    loadButtons( grid, rows, cols, patterns )
} )
load.setAttribute('id','load')
document.body.appendChild(load)
