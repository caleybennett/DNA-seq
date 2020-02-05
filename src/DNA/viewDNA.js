import React, { Component } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'
/* global localStorage */
import ListGroup from 'react-bootstrap/ListGroup'
// import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact'
import { FaSearch } from 'react-icons/fa'
// import ModalView from './Modal'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ViewDNA extends Component {
  constructor (props) {
    super(props)

    // initialize state
    this.state = {
      entries: [],
      filteredEntries: [],
      searchValue: '',
      isLoaded: false,
      sorted: false,
      setShow: false,
      show: false
    }
  }

  componentDidMount () {
    // when the page loads, get the dna sequences
    const entries = JSON.parse(localStorage.getItem('entries'))
    console.log('entries are:', entries)
    this.setState({ entries: entries,
      isLoaded: true })
  }

  sortClick = (event) => {
    this.setState({ sorted: true })
  }

  handleSearch = (event) => {
    this.setState({ searchValue: event.target.value }, () => this.searchForDNA())
  }

  searchForDNA = (event) => {
    // let filteredEntries = []
    const filteredEntries = this.state.entries.filter(item => item.name.toLowerCase().match(this.state.searchValue.toLowerCase()))
    this.setState({ filteredEntries: filteredEntries }, console.log(this.state.filteredEntries))
    console.log(filteredEntries)
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  render () {
    let entriesJsx = ''

    if (!this.state.isLoaded) {
      entriesJsx = <p> loading DNA... </p>
    } else if (this.state.filteredEntries.length < 1) {
      entriesJsx = this.state.entries.map(entry => (
        <ListGroup.Item className="list-group-item" key={entry.sequence} onClick={this.handleShow}>
          <h5>{entry.name }</h5>
          <p> Description: {entry.description} </p>
          <p> Sequence: {entry.sequence} </p>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{entry.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {entry.description}
              <br />
              {entry.sequence}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
              Close
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      ))
    } else if (!this.state.sorted) {
      entriesJsx = this.state.filteredEntries.map(entry => (
        <ListGroup.Item className="list-group-item" key={entry.sequence} onClick={this.handleShow}>
          <h5> {entry.name }</h5>
          <p> Description: {entry.description} </p>
          <p> Sequence: {entry.sequence} </p>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{entry.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {entry.description}
              <br />
              {entry.sequence}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
              Close
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      ))
    } else if (this.state.sorted) {
      entriesJsx = this.state.filteredEntries.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        } else {
          return 0
        }
      })
        .map(entry =>
          <ListGroup.Item className="list-group-item" key={entry.sequence} onClick={this.handleShow}>
            <h5> {entry.name} </h5>
            <p> Description: {entry.description} </p>
            <p> Sequence: {entry.sequence} </p>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{entry.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {entry.description}
                <br />
                {entry.sequence}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
              </Modal.Footer>
            </Modal>
          </ListGroup.Item>
        )
    }
    return (
      <div>
        <div className="right-align">
          <form className="search-bar" >
            <FaSearch />
            <input className="search" value={this.state.searchValue} onChange={this.handleSearch} type="text" placeholder="Search for Sequence"/>
            {console.log(this.state.searchValue)}
          </form>
          <button className="btn btn-info sort-btn" onClick={this.sortClick}> sort by name </button>
        </div>
        <br />
        <div className="content">
          <h3> DNA sequences: </h3>
          <ListGroup>
            {entriesJsx}
          </ListGroup>
        </div>
      </div>
    )
  }
}

export default ViewDNA
