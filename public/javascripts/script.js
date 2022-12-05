import { clickableGrid, createButton, interval } from "./utils.js"

var rows = 60, cols = 120

var grid = clickableGrid( rows, cols )
document.body.appendChild(grid)

var simulate = createButton( "Simulate", "click", () => { interval(grid, rows, cols) } )
document.body.appendChild(simulate)