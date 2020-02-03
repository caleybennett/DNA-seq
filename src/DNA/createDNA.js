import React, { Component } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import SequenceForm from './SequenceForm'

class CreateDNA extends Component {
  constructor (props) {
    super(props)

    // first set the initial state of the DNA object to be empty strings
    // include a `created` key that will start as false and become true when
    // a user creates a DNA sequence

    this.state = {
      entries: [],
      dna: {
        sequence: '',
        name: '',
        description: ''
      },
      created: false,
      duplicate: false,
      validInput: true
    }
  }

  addToEntries = () => {
    // make a copy entries array from state
    const entries = [...this.state.entries]
    // push the dna variable to it
    entries.push(this.state.dna)
    // use the setState method to update notes and reset the currentNote
    this.setState({ entries,
      dna: {
        sequence: '',
        name: '',
        description: ''
      }
    })
  }

  onlyCorrectLetters = (sequence) => {
    // first make everything uppercase and split the string by the characters
    const uppercaseSequence = sequence.toUpperCase()
    console.log('uppercase sequence is ' + uppercaseSequence)
    console.log(uppercaseSequence.split(''))
    const arr = uppercaseSequence.split('')
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== ('A' || 'T' || 'G' || 'C')) {
        console.log('not valid')
      } else {
        reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
      }
    }
  }
  // This method doesn't work -- it only returns the two A's.
  // Maybe use a function that maps the maps over the array and if one of the letters
  // matches the right letter it pushes it to a new array
  // then take the length of both the arrays and see if they are the same.
  //     const newArr = arr.filter(nucleotide => nucleotide === ('A' || 'T' || 'C' || 'G'))
  //     if (newArr.length === arr.length) {
  //       return 'valid'
  //     } else {
  //       return 'not valid'
  // }
  // addFromLS = (obj) => {
  //
  // }
  //
  // // componentDidMount () {
  // //   // check local storage for an object
  // //
  // //   // if it exsists, add it
  // //   // call addFromLS
  //  }

  handleChange = event => {
    const inputName = event.target.name
    const inputValue = event.target.value

    this.setState({ dna: {
      ...this.state.dna,
      [inputName]: inputValue
    }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // make sure that the dna sequence has only the appropriate letters
    const uppercaseSequence = this.state.entries[this.state.entries.length - 1].sequence.toUpperCase()
    console.log('uppercase sequence is ' + uppercaseSequence)
    console.log(uppercaseSequence.split(''))
    const arr = uppercaseSequence.split('')
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === ('A' || 'T' || 'G' || 'C')) {
        return reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
      } else {
        return console.log('not valid')
      }
    }
    // this.onlyCorrectLetters(this.state.entries[this.state.entries.length - 1].sequence)
    // make sure that the dna sequence isn't a duplicate
    // if validInput is true, setObject, if it is false, display an error message

    // this.state.validInput ?  : console.log('not valid input')
    // once the item is created, change the state of created to true
    // Do something here with local storage to store the data
    // Only store the data if it has correct letters
    //   // newArr.length === arr.length ? this.setState({ validInput: true }) : this.setState({ validInput: false })
    // }
    // create a state that is
    // Only store data if it has never been entered before
    // In order to do this, do a getter method to get all the data and filter through
    // through it

    // This can be done by using a filter method, comparing the data we are submitting
    // to the data we already have uploaded.
    // if this.state.dna.sequence ==== sequence form the getter method, return true
    //
  }

  // notValid = event => {
  //   // add in modal here
  //   return <h2> This sequence is not valid</h2>
  // }

  // TO DO: implement alert props

  render () {
    // if (this.state.dna.sequence) {
    //   return (
    //     <h3> You create a sequence! </h3>
    //   )
    // }
    return (
      <div>
        <h3> Enter your DNA sequence </h3>
        <SequenceForm
          dna={this.state.dna}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          addToEntries={this.addToEntries}
        />
      </div>
    )
  }
}

export default CreateDNA
