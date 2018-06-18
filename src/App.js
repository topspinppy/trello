import React, { Component } from 'react'
import { Provider as StoreProvider } from 'mobx-react'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default App
