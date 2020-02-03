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
      validInput: false
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
    const uppercaseSequence = sequence.toUpperCase()
    // make the string an array splitting by character
    const arr = uppercaseSequence.split('')

    const newArr = arr.filter(nucleotide => (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'C' || nucleotide === 'G'))
    console.log(newArr.length)
    console.log(arr.length)
    if (newArr.length !== arr.length) {
      return console.log('this does not match')
    } else {
      reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
    }
  }

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
    // make all characters uppercase
    this.onlyCorrectLetters(this.state.entries[this.state.entries.length - 1].sequence)
    // make the string an array splitting by character
    // const arr = uppercaseSequence.split('')
    //
    // const newArr = arr.filter(nucleotide => (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'C' || nucleotide === 'G'))
    // console.log(newArr.length)
    // console.log(arr.length)
    // if (newArr.length === arr.length) {
    //   this.setState({ validInput: true })
    // } else {
    //   this.setState({ validInput: false })
    // }

    // this.setState.validInput ? reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
    //   : console.log('not valid')
    // let i
    // // loop through array and see if the letters match the correct letters
    // for (i = 0; i < arr.length; i++) {
    //   console.log(arr[i])
    //   if (arr[i] === 'A' || arr[i] === 'T' || arr[i] === 'C' || arr[i] === 'G') {
    //     this.setState({ validInput: true })
    //   } else {
    //     this.setState({ validInput: false })
    //     return console.log('not valid again')
    //   }
    // }
    // this.setState.validInput ? reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
    //   : console.log('not valid')
  }
  // this.onlyCorrectLetters(this.state.entries[this.state.entries.length - 1].sequence)
  // make sure that the dna sequence isn't a duplicate
  // if validInput is true, setObject, if it is false, display an error message

  // This can be done by using a filter method, comparing the data we are submitting
  // to the data we already have uploaded.
  // if this.state.dna.sequence ==== sequence form the getter method, return true
  //

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
