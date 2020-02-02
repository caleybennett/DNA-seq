import React from 'react'
import { Route, Link } from 'react-router-dom'
import CreateDNA from './DNA/createDNA'

const Dashboard = () => (
  <div>
    <h3>Dashboard</h3>
    <p>This is separate route.</p>
  </div>
)

const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <h1>Welcome to React!</h1>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/enter-sequence" component={CreateDNA} />
    </div>
  </div>
)

export default App
