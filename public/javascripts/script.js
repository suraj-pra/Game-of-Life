import { clickableGrid, createButton, intervalFunc, clearButton } from "./utils.js"

var rows = 60, cols = 120

// creating grid
var grid = clickableGrid( rows, cols )
document.body.appendChild(grid)

let interval

// creating Simulate button
var simulate = createButton( "Simulate", "click", function () {
    simulate.disabled = true
    interval = setInterval( intervalFunc, 200, grid, rows, cols )
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
var clear = createButton( "Clear", "click", () => { clearButton( grid, rows, cols ) } )
clear.setAttribute('id','clear')
document.body.appendChild(clear)
