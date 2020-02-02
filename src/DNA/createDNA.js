import React, { Component } from 'react'
import ls from 'local-storage'
import SequenceForm from './SequenceFrom'

class CreateDNA extends Component {
  constructor (props) {
    super(props)

    // first set the initial state of the DNA object to be empty strings
    // include a `created` key that will start as false and become true when
    // a user creates a DNA sequence

    this.state = {
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
  handleChange = event => {
    const inputName = event.target.name
    const inputValue = event.target.value

    this.setState({ dna: {
      ...this.state.dna,
      [inputName]: inputValue
    }
    })
    // console.log('input name is ' + inputName, 'input value is ' + inputValue)
  }

  handleSubmit = event => {
    // Do something here with local storage to store the data
    // Only store the data if it has correct letters
    // first make the string into an array
    // filter through the letters in the the array and make sure that they are
    // either "A", "T", "G", "C"
    // const matchingLetters = (str) => {
    //   // first make everything uppercase and split the string by the characters
    //   const arr = str.toUpperCase()
    // arr.split('')
    // This method doesn't work -- it only returns the two A's.
    // Maybe use a function that maps the maps over the array and if one of the letters
    // matches the right letter it pushes it to a new array
    // then take the length of both the arrays and see if they are the same.
    //   const newArr = arr.filter(nucleotide => nucleotide === ('A' || 'T' || 'C' || 'G'))
    //   if (newArr.length === arr.length) {
    //     return 'valid'
    //   } else {
    //     return 'not valid'
    //   }
    //
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

  notValid = event => {
    // add in modal here
    return <h2> This sequence is not valid</h2>
  }

  render () {
    if (this.state.created) {
      return this.props.alert({
        heading: 'Success:',
        message: 'You logged a DNA sequence',
        variant: 'success'
      })
    } return (
      <div>
        <h3> Enter your DNA sequence </h3>
        <SequenceForm
          dna={this.state.DNA}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CreateDNA
