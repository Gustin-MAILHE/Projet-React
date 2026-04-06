import {inspect} from "node:util";
import {styles} from './style'

function GenerateMap(level: number) {
    let matrix = Array(level).fill(0).map(()=>Array(level).fill(0))
    matrix[Math.floor(Math.random()*level)][Math.floor(Math.random()*level)] = 1;
    return matrix
}

export default function ShowMap() {
    const matrix = GenerateMap(3)
    let colors = ['rgba(255, 50, 50, 1.0)',
                        'rgba(255, 127, 50, 1.0)',
                        'rgba(255, 255, 50, 1.0)',
                        'rgba(127, 255, 50, 1.0)',
                        'rgba(50, 255, 50, 1.0)',
                        'rgba(50, 255, 127, 1.0)',
                        'rgba(50, 255, 255, 1.0)',
                        'rgba(50, 127, 255, 1.0)',
                        'rgba(50, 50, 255, 1.0)',
                        'rgba(127, 50, 255, 1.0)',
                        'rgba(255, 50, 255, 1.0)',
                        'rgba(255, 50, 127, 1.0)']
    let backgroundColor;
    const transparency = String((matrix.length%10)/10)
    const falseColor = colors[Math.floor(Math.random() * colors.length)]
    const trueColor = falseColor.replace(/[\d\.]+\)$/g, transparency.concat(")"))
    let itemList = [];
    for (const row of matrix) {
        for (const value of row) {
            if (value === 0) {
                backgroundColor = falseColor
                itemList.push(<button id="false" style={{backgroundColor}}>{transparency}</button>)
            } else {
                backgroundColor = trueColor
                itemList.push(<button id="true" style={{backgroundColor}}>{transparency}</button>)
            }
        }
    }
    return itemList
}