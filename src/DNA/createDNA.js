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

  // when the page loads run this function
  componentDidMount () {
    // console.log(this.state.entries)
    // // add the remote entries to this.state.entries
    // const remoteEntries = reactLocalStorage.getObject('entries')
    // this.setState({ entries: remoteEntries })
    // console.log('remoteEntries is', this.state.entries)
  }

  // duplicate = (entries) => {
  //   let duplicate = []
  //   // the issue with this is I am not accessing it correctly
  //   console.log('entries in duplicate function is', entries)
  //   for (let i = 0; i < entries.length; i++) {
  //     console.log(entries[i])
  //     if (entries[i] === this.state.dna.sequence) {
  //       duplicate.push(entries[i])
  //     } else {
  //       duplicate = []
  //     }
  //     return duplicate
  //   // if (duplicate.length < 1) {
  //   //   entries.push(this.state.dna)
  //   //   // use the setState method to update entries and reset dna
  //   //   this.setState({ entries,
  //   //     dna: {
  //   //       sequence: '',
  //   //       name: '',
  //   //       description: ''
  //   //     }
  //   //   })
  //   // } else {
  //   //   return console.log('this already exsists')
  //   // }
  // }

  addToEntries = () => {
    // make a copy entries array from state
    const entries = [...this.state.entries]
    console.log('entries is', entries)
    console.log(entries.length)
    entries.push(this.state.dna)
    // use the setState method to update entries and reset dna
    this.setState({ entries,
      dna: {
        sequence: '',
        name: '',
        description: ''
      }
    })
  }
  //
  // const duplicate = entries.filter(entry => entry.sequence === this.state.dna.sequence)
  // console.log('duplicate.length', duplicate.length)
  // console.log(duplicate)
  // if (duplicate.length < 1) {
  //   entries.push(this.state.dna)
  //
  //   // use the setState method to update entries and reset dna
  //   this.setState({ entries,
  //     dna: {
  //       sequence: '',
  //       name: '',
  //       description: ''
  //     }
  //   })
  // } else {
  //   return console.log('this already exsists')
  // }
  // }
  //   // entries.push(this.state.dna)
  //   // this.setState({ entries,
  //   //   dna: {
  //   //     sequence: '',
  //   //     name: '',
  //   //     description: ''
  //   //   }
  //   // })
  //   // console.log('this.state.entries is', this.state.entries)
  //
  //   // const arr = this.state.entries.filter(entry => (entry.sequence === this.state.dna.sequence))
  //   // if the array length is not zero, there is a match, send an error message
  //   // if (arr.length !== 0) {
  //   //   return console.log('this already exists')
  //   // } else {
  //   // if the array length is zero push this.state.dna to entries
  //   // // use the setState method to update entries and reset dna
  //   // this.setState({ entries,
  //   //   dna: {
  //   //     sequence: '',
  //   //     name: '',
  //   //     description: ''
  //   //   }
  //   // })
  // }

  // change the name of this to validates?
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
      // this.state.entries.push(this.state.dna)
      // // use the setState method to update entries and reset dna
      // this.setState({ this.state.entries,
      //   dna: {
      //     sequence: '',
      //     name: '',
      //     description: ''
      //   }
      // })
      this.setState({ validCharacters: true })
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
    // console.log('this.state.entries[0] is', this.state.entries.entries[0].sequence)
    // this.duplicate(this.state.entries)
    // let duplicate = []
    // // the issue with this is I am not accessing it correctly
    // console.log('entries in duplicate function is', this.state.entries)
    // for (let i = 0; i < this.state.entries.length; i++) {
    //   console.log(this.state.entries[i].sequence)
    //   console.log(this.state.dna)
    //   if (this.state.entries[i].sequence === this.state.dna.sequence) {
    //     duplicate.push(this.state.entries[i])
    //   } else {
    //     duplicate = []
    //   }
    // }
    // console.log('duplicate.length', duplicate.length)
    // console.log(duplicate)
    // check for duplicate
    const entries = reactLocalStorage.getObject('entries')
    let arr = []
    console.log('entries are', entries)
    if (entries) {
      arr = entries.entries
      arr.push(this.state.entries)
      const arr2 = Array.from(new Set(arr))
      if (arr2.length === arr.length) {
        this.setState({ duplicate: false })
      }
    }
    this.onlyCorrectLetters(this.state.dna.sequence)
    if (this.state.validCharacters && !this.state.duplicate) {
      reactLocalStorage.setObject('entries', { 'entries': this.state.entries })
      this.setState({ created: true })
    } else {
      console.log('this does not have correct characters')
    }

    // once item is saved in local storage, reset this.state.entries to remote entries
    // const remoteEntries = reactLocalStorage.getObject('entries')
    // this.setState({ entries: remoteEntries })
  }

  // TO DO: implement alert props

  render () {
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
