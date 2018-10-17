import React, { Component } from 'react';
import './App.css';

const triads = (scale) => {
  let arr = [
    [scale[0], scale[2], scale[4]],
    [scale[1], scale[3], scale[5]],
    [scale[2], scale[4], scale[6]],
    [scale[3], scale[5], scale[0]],
    [scale[4], scale[6], scale[1]],
    [scale[5], scale[0], scale[2]],
    [scale[6], scale[1], scale[3]]
  ]
  return arr.join(' - ')
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    
    //create the intervals
    const chromatic = {
      0: "1",
      1: "b2",
      2: "2",
      3: "b3",
      4: "3",
      5: "4",
      6: "#4",
      7: "5",
      8: "b6",
      9: "6",
      10: "b7",
      11: "7",
    };
    
    let chromaticKeys = Object.keys(chromatic)
    let chromaticValues = Object.values(chromatic)

    //steps
    const r = 0
    const h = 1
    const w = 2
    const wh = 3

    //scales
    const major = [r, w, w, h, w, w, w, h];
    // const minor = [r, w, h, w, w, h, w, w] 
    // const melodicMinor = [r, w, h, w, w, w, w, h]
    // const harmonicMinor = [r, w, h, w, w, h, wh, h]

    // let triads = filtered.map((item, index) => {
    //   return [filtered[index], filtered[index + 2], filtered[index + 4]]
    // })

    const mapScale = scale => {
      let counter = 0; 
      return scale.map((i) => {
        counter += i
        return counter
      })

    }
    
    //take scale, reduce it to key numbers
    //outputs an array containing different modes
    
    const filteredMode = scale => {
      let reducedMode = mapScale(scale)
      let arr = []
      for (let i = 0; i < chromaticKeys.length; i++) {
        for(let j = 0; j < reducedMode.length; j++) {
          if (i === reducedMode[j]) {
            arr.push(chromaticValues[i])
          }
        }
      }
      return arr
    }
    
    // create a function that takes your scale and generates all the modes with an array of the scale with all available starting indexes.
    const renameEquivalents = (arr, num1, num2, num3) => {
      if (arr.includes(num1) && arr.includes(num2)) {        arr.splice(arr.indexOf(num2), 1, num3)
      } 
    }
    //edge case
    const renameLocrian = (arr, num1, num2, num3, num4) => {
      if (arr.includes(num1) && arr.includes(num2) &&arr.includes(num3)) {        
        arr.splice(arr.indexOf(num3), 1, num4)
      } 
    }
    
    const modeGenerator = (scale) => {
      let arr = []
      for (let i = 1; i < scale.length; i++) {
        let first = scale.slice(0, i)
        let last = scale.slice(i, scale.length)
        arr.push(last.concat(first))
      }
      return arr.map((value, key) => {
        let arr = []
        for (let i of value) {
          if (i === 0) {
            arr.unshift(i)
          } else {
            arr.push(i)
          }
        }


        const filtered = filteredMode(arr)


        renameLocrian(filtered, 'b3', '4', '#4', 'b5')
        renameEquivalents(filtered, '4', '#4', '5');
        renameEquivalents(filtered, 'b3', '3', '2');
        renameEquivalents(filtered, '6', 'b6', '5');
        


        return (
          <div key={key}>
            <ol>{filtered.join(' - ')}</ol>
            <ol>{triads(filtered)}</ol>
          </div>
        )
      })
    }
    let majorModes = modeGenerator(major)
    console.log(majorModes)
    
    //should be able to select scale degrees from a 8 input menu.
    return (          
      <div className="App">
        <header className="App-header">
          <h1>
            Chord Scales
          </h1>
          <div>
            <h1>Major Modes:</h1>
            {majorModes}

          </div>
          {/* <div>
            <h1>Minor Modes:</h1>
            {modeGenerator(minor)}

          </div>
          <div>
            <h1>Melodic Minor Modes:</h1>
            {modeGenerator(melodicMinor)}

          </div>
          <div>
            <h1>Harmonic Minor Modes:</h1>
            {modeGenerator(harmonicMinor)}

          </div> */}

        </header> 
      </div>
    );
  }
}

export default App;
