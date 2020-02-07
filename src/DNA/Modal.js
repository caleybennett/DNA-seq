import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components'

// create a component called ModalView
class ModalView extends Component {
  constructor (props) {
    super(props)

    // define state
    this.state = {
      entries: [],
      isLoaded: false,
      setShow: false,
      show: false,
      red: false,
      blue: false,
      purple: false,
      green: false
    }
  }

  // function to truncate the dna seqeunce
  truncate = (str) => {
    // if the strings length is more than ten characters
    if (str.length > 10) {
      // take the string and return the first ten characters
      return str.substring(0, str.length - (str.length - 10)) + '...'
    } else {
      return str
    }
  }

  // for the modal, handle when it is closed
  handleClose = () => {
    this.setState({ show: false })
  }

  // for the modal, handle when it is open
  handleShow = () => {
    this.setState({ show: true })
  }

  render () {
    // a function that takes in a string
    const colorCharacter = (str) => {
    // make that string uppercase
      const uppercaseStr = str.toUpperCase()
      // then make the string an array
      const arr = uppercaseStr.split('')
      // iterate through that array
      const newArr = arr.map(char => {
        // if the character is `T`, change the className to green
        if (char === 'T') {
          return <span className="green"> T </span>
        } else if (char === 'G') {
          // if the character is `G`, change the className to purple
          return <span className="purple"> G </span>
        } else if (char === 'C') {
          // if the character is `C`, change the className to blue
          return <span className="blue"> C </span>
        } else if (char === 'A') {
          // if the character is `A`, change the className to red
          return <span className="red"> A </span>
        }
        // the class names were then styled in the scss stylesheet
      }
      )
      return newArr
    }

    return (
      // the button to activate the modal is a the truncated dna sequence
      // call colorCharacter when displaying the sequence
      <div>
        <Button variant="link" onClick={this.handleShow}>
          {this.truncate(this.props.sequence)}
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {colorCharacter(this.props.sequence)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalView
