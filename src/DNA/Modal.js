import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ModalView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      entries: [],
      isLoaded: false,
      setShow: false,
      show: false
    }
  }
  // componentDidMount () {
  //   // when the page loads, get the dna sequences
  //   const entries = JSON.parse(localStorage.getItem('entries'))
  //   console.log('entries are:', entries)
  //   this.setState({ entries: entries,
  //     isLoaded: true })
  // }

  handleClose = () => {
    this.setState({ show: false })
  }
  handleShow = () => {
    this.setState({ show: true })
  }

  render () {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
        Launch modal
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.description}
            <br />
            {this.props.sequence}
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
