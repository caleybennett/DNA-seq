import React, { Component } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'
/* global localStorage */
import ListGroup from 'react-bootstrap/ListGroup'

class ViewDNA extends Component {
  constructor (props) {
    super(props)

    // initialize state
    this.state = {
      entries: [],
      isLoaded: false,
      sorted: false
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

  render () {
    let entriesJsx = ''
    if (!this.state.isLoaded) {
      entriesJsx = <p> loading DNA... </p>
    } else if (!this.state.sorted) {
      entriesJsx = this.state.entries.map(entry => (
        <div key={entry.sequence}>
          <h5> {entry.name }</h5>
          <p> {entry.sequence} </p>
        </div>
      ))
    } else if (this.state.sorted) {
      entriesJsx = this.state.entries.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      })
        .map(entry =>
          <div key={entry.sequence}>
            <h5> {entry.name }</h5>
            <p> {entry.sequence} </p>
          </div>
        )
    }
    return (
      <div>
        <h3> DNA sequences: </h3>
        <button className="btn btn-info" onClick={this.sortClick}> sort by name </button>
        <ListGroup>
          {entriesJsx}
        </ListGroup>
      </div>
    )
  }
}

export default ViewDNA
