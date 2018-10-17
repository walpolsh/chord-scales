import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    
    //create the intervals
    const chromatic = {
      0: "Root",
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
    
    let keys = Object.keys(chromatic)

    //steps
    const root = 0
    const half = 1
    const whole = 2
    const wholeHalf = 3

    //scales
    const major = [root, whole, whole, half, whole, whole, whole, half];
    const minor = [root, whole, half, whole, whole, half, whole, whole] 
    const melodicMinor = [root, whole, half, whole, whole, whole, whole, half]
    const harmonicMinor = [root, whole, half, whole, whole, half, wholeHalf, half]

    
    // Create a global counter 
    // Reduce those into a scale by iteratively adding each step to a new array.
    // ex mapScale(major) === [0,2,2,1,2,2,2,1] => [0,2,3,5,7,9,10,12]
    const mapScale = (scale) => {
      let counter = 0; 
      return scale.map((i) => {
        counter += i
        return counter
      })

    }
    
    //takes a scale, reduces it to key numbers
    //outputs an array containing 
    const filteredMode = (mode) => {
      let reducedMode = mapScale(mode)

      let arr = []
      //from 0 - 12
      for (let i = 0; i < keys.length; i++) {
        //from start of reduced scale < end
        for(let j = 0; j < reducedMode.length; j++) {
          if (i === reducedMode[j]) {
            arr.push(chromatic[i])
          }
        }
      }
      return arr
    }
    
    // create a function that takes your scale and generates all the modes with an array of the scale with all available starting indexes.
    const modeGenerator = (scale) => {
      let arr = []
      for (let i = 1; i < scale.length - 1; i++) {
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

        const renameEquivalents = (arr, num1, num2, num3) => {
          if (arr.includes(num1) && arr.includes(num2)) {        arr.splice(arr.indexOf(num2), 1, num3)
          } 
        }

        const filtered = filteredMode(arr)
        
        renameEquivalents(filtered, '4', '#4', '5');
        renameEquivalents(filtered, 'b3', '3', '2');
        renameEquivalents(filtered, '6', 'b6', '5');
        
        return (
          <div key={key}>
            <ol>{filtered.join(' - ')}</ol>
          </div>
        )
      })

      //if dupicate tones then replace tone.
      //create a function that prints triads
      //make an array that contains groups of three degrees
      //add to array by pushing degrees one at a time.
      
      // create a function that prints seventh chords
      
      
      
    }
    
    let test = modeGenerator(major)    
    
    //should be able to select scale degrees from a 8 input menu.
    return (          
      <div className="App">
        <header className="App-header">
          <header>
            Chord Scales
          </header>
          <div>
            <h1>Major Modes:</h1>
            {modeGenerator(major)}

          </div>
          <div>
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

          </div>

        </header> 
      </div>
    );
  }
}

export default App;
