import React, { Component } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import SequenceForm from './SequenceForm'

// to do: figure out how to make an array of objects that is flat

// create a CreateDNA component
class CreateDNA extends Component {
  constructor (props) {
    super(props)

    // initialize state
    this.state = {
      entries: null,
      remoteEntries: null,
      dna: {
        sequence: '',
        name: '',
        description: ''
      },
      created: false,
      duplicate: false
    }
  }

  // when the page loads run this function
  componentDidMount () {
    console.log(this.state.entries)
    // add the remote entries to this.state.entries
    const remoteEntries = reactLocalStorage.getObject('entries')
    this.setState({ entries: remoteEntries })
    console.log('remoteEntries is', this.state.entries)
    // this.state.entries.push(remoteEntries.entries)
    // let flatEntries = []
    // const flat = (arr) => {
    //   arr.forEach((a) => {
    //     flatEntries.push(a)
    //     if (Array.isArray(a.children)) {
    //       flatEntries = flatEntries.concat(flat(a.children))
    //     }
    //   })
    //   return flatEntries
    // }
    // // flatten the array of objects
    // const flattened = flat(this.state.entries)
    // console.log(flattened)
    // console.log(this.state.entries)
    // update this.state.entries
    // add this to the entries field in state
    //
  }

  addToEntries = () => {
    // make a copy entries array from state
    // this.setState({ entries: [] })
    const entries = [...this.state.entries]
    console.log('entries is', entries)
    // check to see if there is the same sequence
    // filter through the array of entries to see if this.state.dna.sequence equals this.state.entries[].sequence
    // } else {
    // if the array length is zero push this.state.dna to entries
    const duplicate = entries.filter(entry => entry.sequence === this.state.dna.sequence)
    console.log('duplicate.length', duplicate.length)
    if (duplicate.length < 1) {
      entries.push(this.state.dna)

      // use the setState method to update entries and reset dna
      this.setState({ entries,
        dna: {
          sequence: '',
          name: '',
          description: ''
        }
      })
    } else {
      return console.log('this already exsists')
    }
    // }
    // entries.push(this.state.dna)
    // this.setState({ entries,
    //   dna: {
    //     sequence: '',
    //     name: '',
    //     description: ''
    //   }
    // })
    // console.log('this.state.entries is', this.state.entries)

    // const arr = this.state.entries.filter(entry => (entry.sequence === this.state.dna.sequence))
    // if the array length is not zero, there is a match, send an error message
    // if (arr.length !== 0) {
    //   return console.log('this already exists')
    // } else {
    // if the array length is zero push this.state.dna to entries
    // entries.push(this.state.dna)
    // // use the setState method to update entries and reset dna
    // this.setState({ entries,
    //   dna: {
    //     sequence: '',
    //     name: '',
    //     description: ''
    //   }
    // })
  }

  notDuplicate = () => {
    // the entry to be added
    console.log(this.state.entries)
    // the entries to filter through
    console.log()
  }

  // change the name of this to validates?
  onlyCorrectLetters = (sequence) => {
    const uppercaseSequence = sequence.toUpperCase()
    // make the string an array splitting by character
    const arr = uppercaseSequence.split('')

    const newArr = arr.filter(nucleotide => (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'C' || nucleotide === 'G'))

    // const arr = this.state.entries.filter(entry => (entry.sequence === this.state.dna.sequence))
    // // if the array length is not zero, there is a match, send an error message
    // if (arr.length !== 0) {
    // //   return console.log('this already exists')
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
    console.log('this.state.entries is', this.state.entries)
    this.onlyCorrectLetters(this.state.entries[this.state.entries.length - 1].sequence)
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
