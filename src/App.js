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
      12: "8",
    };

    
    let chromaticKeys = Object.keys(chromatic)

    // return the scale based on tones
    // ex from 1 to 3 is a whole tone.
    // from 2 to 4 is a whole half tone. ect.
    // from 6 to 7 is a half tones
    
    const wholeHalf = 3
    const whole = 2
    const half = 1
    const root = 0
    const major = [root, whole, whole, half, whole, whole, whole, half];
    // const minor = [root, whole, half, whole, whole, half, whole, whole] 
    const melodicMinor = [root, whole, half, whole, whole, whole, whole, half]
    const harmonicMinor = [root, whole, half, whole, whole, half, wholeHalf, half]

    
    // create a function that stores the result each consecutive array item added together.
    // ex [0,2,2,1] => [0,2,3,5]
    
    const reduceScale = (scale) => {
      let arr = [] 
      let result = 0; //result of each addition
      for (let i = 0; i <= scale.length - 1; i++) {
        //add current index, to previous index until last item
        result += (scale[i])
        //push result
        arr.push(result)
      }
      return arr
    }

    // where the keys of chromaticIntervals match the values of 
    // create an array with values in chromaticIntervals

    //turn the scale degrees to chromatic values
    var filteredScale = (scale) => {
      let reducedScale = reduceScale(scale)
      let arr = []
      //from 0 - 12
      for (let i = 0; i < chromaticKeys.length; i++) {
        //from start of reduced scale < end
        for(let j = 0; j < reducedScale.length; j++) {
          if (i === reducedScale[j]) {
            arr.push(chromatic[i])
          }
        }
      }
      return arr
    }

    var filteredMode = (mode) => {
      let reducedMode = reduceScale(mode)
      let arr = []
      //from 0 - 12
      for (let i = 0; i < chromaticKeys.length; i++) {
        //from start of reduced scale < end
        for(let j = 0; j < reducedMode.length; j++) {
          if (i === reducedMode[j]) {
            arr.push(chromatic[i])
          }
        }
      }
      return arr
    }
    
    // create a function that takes your scale and generates all the modes by create an array of the scale with all available starting indexes.
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
        console.log(arr)
        return (
          <div key={key}>
            <ol>{filteredMode(arr).join(' - ')}</ol>
          </div>
        )
      })
    //create a function that prints triads
      //make an array that contains groups of three degrees
      //add to array by pushing degrees one at a time.
      
      // create a function that prints seventh chords
      
      
      
    }
    
    
    
    //should be able to select scale degrees from a 8 input menu.
    return (          
      <div className="App">
        <header className="App-header">
          <header>
            Chord Scales
          </header>
          <div>
            <h1>Major</h1>
            {filteredScale(major).join(' - ')}
            <h2>Modes:</h2>
            {modeGenerator(major)}

          </div>
          <div>
            <h1>Melodic Minor</h1>
            {filteredScale(melodicMinor).join(' - ')}
            <h2>Modes:</h2>
            {modeGenerator(melodicMinor)}

          </div>
          <div>
            <h1>Harmonic Minor</h1>
            {filteredScale(harmonicMinor).join(' - ')}
            <h2>Modes:</h2>
            {modeGenerator(harmonicMinor)}

          </div>

        </header> 
      </div>
    );
  }
}

export default App;
