import React, { Component } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'
import SequenceForm from './SequenceForm'
/* global localStorage */
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
    this.setState({ entries
      // dna: {
      //   sequence: '',
      //   name: '',
      //   description: ''
      // }
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
    console.log(uppercaseSequence)
    // make the string an array splitting by character
    const arr = uppercaseSequence.split('')
    console.log(arr)

    const newArr = arr.filter(nucleotide => (nucleotide === 'A' || nucleotide === 'T' || nucleotide === 'C' || nucleotide === 'G'))

    console.log(newArr.length)
    console.log(arr.length)
    if (newArr.length !== arr.length) {
      this.setState({
        dna: {
          sequence: '',
          name: '',
          description: ''
        },
        entries: []
      })
      return console.log('this does not match')
    } else {
      localStorage.setItem('entries', JSON.stringify(this.state.entries))
      this.setState({ created: true,
        dna: {
          sequence: '',
          name: '',
          description: ''
        }
      })
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

  duplicate = (sequence, arr) => {
    console.log('in duplicate function')
    const duplicateArr = arr.filter(arr => arr.sequence === sequence)
    console.log(duplicateArr)
    if (duplicateArr.length > 0) {
      console.log(arr.sequence)
      console.log(sequence)
      console.log('duplicate!!!')
    } else {
      this.onlyCorrectLetters(sequence)
    }
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
    const entries = JSON.parse(localStorage.getItem('entries'))
    // let arr = []
    console.log('entries are', entries)
    if (entries) {
      // arr = entries
      // this.state.entries.map(entry => arr.push(entry))
      this.duplicate(this.state.dna.sequence, entries)
      // // arr.push(this.state.entries)
      // console.log('arr is ', arr)
      // const arr2 = Array.from(new Set(arr))
      // console.log('arr2 is', arr2)
      // console.log('this.state.dna.sequence is', this.state.dna.sequence)
      // if (arr2.length === arr.length) {
      //   // this.setState({ duplicate: false })
      //   this.onlyCorrectLetters(this.state.dna.sequence)
      //   console.log(this.state)
      //   // if (this.state.validCharacters && !this.state.duplicate) {
      //   //   localStorage.setItem('entries', JSON.stringify(this.state.entries))
      //   //   this.setState({ created: true,
      //   //     dna: {
      //   //       sequence: '',
      //   //       name: '',
      //   //       description: ''
      //   //     }
      //   //   })
      //   // } else {
      //   //   console.log('this does not have correct characters')
      //   // }
      // } else {
      //   console.log('this is a duplicate')
      // }
    } else {
      console.log('got to else')
      console.log(this.state.dna.sequence)
      this.onlyCorrectLetters(this.state.dna.sequence)
      if (this.state.validCharacters) {
        localStorage.setItem('entries', JSON.stringify(this.state.entries))
        this.setState({ created: true,
          dna: {
            sequence: '',
            name: '',
            description: ''
          }
        })
      } else {
        console.log('this does not have correct characters')
      }
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
