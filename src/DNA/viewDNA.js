import React, { Component } from 'react'
// import { reactLocalStorage } from 'reactjs-localstorage'
/* global localStorage */
import ListGroup from 'react-bootstrap/ListGroup'
import { FaSearch } from 'react-icons/fa'
import ModalView from './Modal'

// Create ViewDNA component
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
      sortedEntries: []
    }
  }

  // When page loads:
  componentDidMount () {
    // get the dna sequences in local storage
    const entries = JSON.parse(localStorage.getItem('entries'))
    // use state to store entries and update so that loading is finished
    this.setState({ entries: entries,
      isLoaded: true })
  }

  // function to sort entries when the sort button is clicked
  sortClick = (event) => {
    // use javascripts sort function
    const sortedEntries = this.state.entries.sort((a, b) => {
      // make each name uppercase and compart the names against eachother
      // returning 1, -1, or 0 to itereate through the names and
      // determine the order of the names
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1
      } else {
        return 0
      }
    })
    // update the state of the sorted entries
    this.setState({ sortedEntries: sortedEntries })
    // updated the sorted state to true
    this.setState({ sorted: true })
  }
  // function to handle the values of the search for a dna sequence by its name
  handleSearch = (event) => {
    // update the search value to what is being typed into the input box
    // once this is done run the search for DNA function
    this.setState({ searchValue: event.target.value }, () => this.searchForDNA())
  }

  searchForDNA = (event) => {
    // make a variable called filteredEntries
    // take the entries stored in state and filter through them
    // match the name of the entry to the search value defined above
    const filteredEntries = this.state.entries.filter(entry => entry.name.toLowerCase().match(this.state.searchValue.toLowerCase()))
    // store the filteredEntries in state
    this.setState({ filteredEntries: filteredEntries }, console.log(this.state.filteredEntries))
  }

  render () {
    // entries jsx is what will be rendered on the page
    let entriesJsx = ''
    // when the page isn't loaded give a user message that it is loading
    if (!this.state.isLoaded) {
      entriesJsx = <p> loading DNA... </p>
      // if there are no filtered entries (i.e. the user hasn't started typing in the search box), then just show entries
    } else if (!this.state.entries) {
      entriesJsx = <p> please enter a sequence </p>
    } else if (this.state.filteredEntries.length < 1) {
      entriesJsx = this.state.entries.map(entry => (
        // itereate through all entries and display the name and description
        // sequence will be displayed in modalview file
        <ListGroup.Item className="list-group-item" key={entry.sequence} onClick={this.handleShow}>
          <h5>{entry.name }</h5>
          <p> Description: {entry.description} </p>
          <p> Sequence:</p>
          <ModalView name={entry.name} description={entry.description} sequence={entry.sequence}/>
        </ListGroup.Item>
      ))
    } else if (this.state.sorted) {
      // if the entries are sorted but not filetered(search bar) then iterate through
      // the sorted entries
      if (this.state.filteredEntries.length < 1) {
        entriesJsx = this.state.sortedEntries.map(entry =>
          <ListGroup.Item className="list-group-item" key={entry.sequence} onClick={this.handleShow}>
            <h5> {entry.name} </h5>
            <p> Description: {entry.description} </p>
            <p> Sequence:</p>
            <ModalView name={entry.name} description={entry.description} sequence={entry.sequence}/>
          </ListGroup.Item>
        )
      } else {
        // if they are filtered then itereate through the filtered entries
        entriesJsx = this.state.filteredEntries.map(entry => (
          <div key={this.sequence}>
            <h5> {entry.name }</h5>
            <p> Description: {entry.description} </p>
            <p> Sequence:</p>
            <ModalView name={entry.name} description={entry.description} sequence={entry.sequence}/>
          </div>
        ))
      }
      // if the entries are not sorted, but are filtered, then iterate through the filtered entries
    } else if (!this.state.sorted) {
      entriesJsx = this.state.filteredEntries.map(entry => (
        <div key={this.sequence}>
          <h5> {entry.name }</h5>
          <p> Description: {entry.description} </p>
          <p> Sequence:</p>
          <ModalView name={entry.name} description={entry.description} sequence={entry.sequence}/>
        </div>
      ))
    }
    return (
      <div>
        <div className="right-align">
          <form className="search-bar" >
            <FaSearch />
            <input className="search" value={this.state.searchValue} onChange={this.handleSearch} type="text" placeholder="Search for Sequence"/>
            {console.log(this.state.searchValue)}
          </form>
          <button className="btn btn-primary sort-btn" onClick={this.sortClick}> sort alphabetically </button>
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
