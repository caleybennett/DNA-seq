import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components'
// import $ from 'jquery'

class ModalView extends Component {
  constructor (props) {
    super(props)

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

  truncate = (str) => {
    if (str.length > 10) {
      return str.substring(0, str.length - (str.length - 10)) + '...'
    } else {
      return str
    }
  }

  handleClose = () => {
    this.setState({ show: false })
  }
  handleShow = () => {
    this.setState({ show: true })
  }

  render () {
    // const green = styled.span`
    //   color: green;`
    //
    // const red = styled.span`
    //   color: red;`
    //
    // const blue = styled.span`
    //   color: blue;`
    //
    // const purple = styled.span`
    //   color: purple;`

    const colorCharacter = (str) => {
      console.log(str)
      const uppercaseStr = str.toUpperCase()
      const arr = uppercaseStr.split('')
      console.log(arr)
      const newArr = arr.map(char => {
        if (char === 'T') {
          return <span className="green"> T </span>
        } else if (char === 'G') {
          return <span className="purple"> G </span>
        } else if (char === 'C') {
          return <span className="blue"> C </span>
        } else if (char === 'A') {
          return <span className="red"> A </span>
        }
      }
      )
      console.log(newArr)
      return newArr
    }

    return (
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
