import React from 'react'

const SequenceForm = ({ dna, handleChange, handleSubmit, addToEntries }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Name"
      type="text"
      value={dna.name}
      onChange={handleChange}
      name="name"
    />
    <input
      placeholder="Description"
      type="text"
      value={dna.description}
      onChange={handleChange}
      name="description"
    />
    <input
      placeholder="Sequence"
      type="text"
      value={dna.sequence}
      onChange={handleChange}
      name="sequence"
    />
    <button type="submit" className="btn btn-primary" onClick={addToEntries}> Submit </button>
  </form>
)

export default SequenceForm
