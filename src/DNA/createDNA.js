import React, { Component } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'
import SequenceForm from './SequenceForm'
/* global localStorage */

// create a CreateDNA component
class CreateDNA extends Component {
  constructor (props) {
    super(props)

    // initialize state
    this.state = {
      entries: [],
      dna: {
        sequence: '',
        name: '',
        description: ''
      },
      created: false,
      duplicate: true,
      validCharacters: false
    }
  }

  addToEntries = () => {
    // make a copy entries array from state
    const entries = [...this.state.entries]
    // push the new entry to the entries array
    entries.push(this.state.dna)
    // use the setState method to update entries and reset dna
    this.setState({ entries })
  }

  // function that validates characters
  onlyCorrectLetters = (sequence) => {
    // make the sequence uppercase
    const uppercaseSequence = sequence.toUpperCase()
    // make the string an array splitting by character
    const arr = uppercaseSequence.split('')
    // make a new array with only the correct nucleotides
    const newArr = arr.filter(nucleotide => (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'C' || nucleotide === 'G'))
    // if the array lengths don't match it means an invalid character was entered
    if (newArr.length !== arr.length) {
      // reset this.state
      this.setState({
        dna: {
          sequence: '',
          name: '',
          description: ''
        },
        entries: []
      })
      // add in user messaging
      this.props.alert({
        heading: 'Yikes, you entered an invalid sequence',
        message: 'Correct characters are: A, T, C, and G',
        variant: 'danger'
      })
    } else {
      // if it is a valid sequence, add the entry to local storage
      localStorage.setItem('entries', JSON.stringify(this.state.entries))
      // reset the dna object
      // update created to true
      this.setState({ created: true,
        dna: {
          sequence: '',
          name: '',
          description: ''
        }
      })
      // user messaging
      this.props.alert({
        heading: 'Yay!',
        message: 'You entered a sequence!',
        variant: 'success'
      })
    }
  }

  // a function to handle the change entered in the create form
  handleChange = event => {
    const inputName = event.target.name
    const inputValue = event.target.value
    // set the state of dna to equal the values being entered in the form
    this.setState({ dna: {
      ...this.state.dna,
      [inputName]: inputValue
    }
    })
  }

  // function that checks for duplicate sequences
  duplicate = (sequence, arr) => {
    // filter though the array and find the sequence and see if it equals the sequence entered
    const duplicateArr = arr.filter(arr => arr.sequence === sequence)
    // if the duplicateArr is not empty, it means user entered a duplicate sequence
    if (duplicateArr.length > 0) {
      // user messaging
      this.props.alert({
        heading: 'Yikes',
        message: 'You entered a sequence that already exsists',
        variant: 'danger'
      })
      // reset state
      this.setState({
        dna: {
          sequence: '',
          name: '',
          description: ''
        },
        entries: []
      })
    } else {
      // if its not a duplicate, make sure it has the correct characters
      this.onlyCorrectLetters(sequence)
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // get the entries already entered in local storage
    const entries = JSON.parse(localStorage.getItem('entries'))
    // if there are entries
    if (entries) {
      // check to make sure it is not a duplicate, sending in the sequence entered and the entries
      // that are already in local storage
      this.duplicate(this.state.dna.sequence, entries)
    } else {
      // if there are no entries, then only check for valid characters
      this.onlyCorrectLetters(this.state.dna.sequence)
      // if the characters are valid
      if (this.state.validCharacters) {
        // enter the entry in local storage
        localStorage.setItem('entries', JSON.stringify(this.state.entries))
        // reset state
        this.setState({ created: true,
          dna: {
            sequence: '',
            name: '',
            description: ''
          }
        })
      }
    }
  }

  render () {
    return (
      <div className="form-box">
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
