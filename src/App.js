import React, { Component } from 'react';
import './App.css';

//* Get the chord names for every
// * Triad object:
// * major = [1,3,5]
// * Seventh chord object. 
// * ‘major 7th’ = [1,3,5,7]
// * If chord is unrecognized print ‘'undefined' '
// * Based on a numerical system
// * Stored in an array
// * 1 b2 2 b3 3 4 b5 5 b6 6 b7 7
// * Create a function to compare the chords provided to the 7 notes selected from the scale. 
// * If every other note for 3 or 4 notes matches a tone 

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
      6: "b5",
      7: "5",
      8: "b6",
      9: "6",
      10: "b7",
      11: "7",
      12: "8",
    };

    // return the scale based on tones
    // ex from 1 to 3 is a whole tone.
    // from 2 to 4 is a whole half tone. ect.
    // from 6 to 7 is a half tones
    
    const wholeHalf = 3
    const whole = 2
    const half = 1
    const root = 0
    const major = [root, whole, whole, half, whole, whole, whole, half];
    const minor = [root, whole, half, whole, whole, half, whole, whole] 
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
    let chromaticKeys = Object.keys(chromatic)
    var filteredScale = (scale) => {
      let reducedScale = reduceScale(scale)
      let arr = []
      for (let i = 0; i < chromaticKeys.length; i++) {
        for(let j = 0; j < reducedScale.length; j++) {
          if (i === reducedScale[j]) {
            arr.push(chromatic[i])
          }
        }
      }
      return arr
    }

    // create a function that takes your scale and generates all the modes by create an array of the scale with all available starting indexes.
    
    const modeGenerator = (scale) => {
      let result = filteredScale(scale)
      console.log(result)
      let arr = []
      for (let i = 0; i < result.length; i++) {
        let first = result.slice(0, i)
        let last = result.slice(i, result.length - 1)

        arr.push(last.concat(first))
      }

      return arr
      
    }
    
    console.log(modeGenerator(minor))
    //create a function that prints triads
      //make an array that contains groups of three degrees
      //add to array by pushing degrees one at a time.
    
    // create a function that prints seventh chords
    
    
    //should be able to select scale degrees from a 8 input menu.

    return (          
      <div className="App">
        <header className="App-header">
          <header>
            Chord Scales
          </header>
          <div>
            <h1>Major</h1>
            {filteredScale(major)}
          </div>
          <div>
            <h1>Minor</h1>
            {filteredScale(minor)}
          </div>
          <div>
            <h1>Melodic Minor</h1>
            {filteredScale(melodicMinor).join(' - ')}
          </div>
          <div>
            <h1>Harmonic Minor</h1>
            {filteredScale(harmonicMinor)}
          </div>

        </header> 
      </div>
    );
  }
}

export default App;
