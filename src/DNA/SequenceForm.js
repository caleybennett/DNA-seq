import React from 'react'

const SequenceForm = ({ dna, handleChange, handleSubmit, addToEntries }) => (
  <form onSubmit={handleSubmit}>
    <input
      className="create-form"
      placeholder="Name"
      type="text"
      value={dna.name}
      onChange={handleChange}
      name="name"
      required
    />
    <input
      className="create-form"
      placeholder="Description"
      type="text"
      value={dna.description}
      onChange={handleChange}
      name="description"
      required
    />
    <input
      className="create-form"
      placeholder="Sequence"
      type="text"
      value={dna.sequence}
      onChange={handleChange}
      name="sequence"
      required
    />
    <br />
    <button type="submit" className="btn btn-primary submit-button" onClick={addToEntries}> Submit </button>
  </form>
)

export default SequenceForm
