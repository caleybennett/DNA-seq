import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import CreateDNA from './DNA/createDNA'
import Header from './header/Header'
import AutoDismissAlert from './AutoDismissAlert/AutoDismissAlert'
import ViewDNA from './DNA/viewDNA'

const Dashboard = () => (
  <div>
    <h3>Dashboard</h3>
    <p>This is separate route.</p>
  </div>
)

class App extends Component {
  constructor () {
    super()

    this.state = {
      alerts: []
    }
  }

    alert = ({ heading, message, variant }) => {
      this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
    }

    render () {
      const { alerts } = this.state

      return (
        <Fragment>
          <Header />
          {alerts.map((alert, index) => (
            <AutoDismissAlert
              key={index}
              heading={alert.heading}
              variant={alert.variant}
              message={alert.message}
            />
          ))}
          <main className="container">
            <Route path="/dashboard" component={Dashboard}/>
            <Route exact path="/enter-sequence" render={() => (
              <CreateDNA
                alert={this.alert}
              />
            )} />
            <Route exact path="/" render={() => (
              <ViewDNA
                alert={this.alert}
              />
            )} />
          </main>
        </Fragment>
      )
    }
}

export default App
