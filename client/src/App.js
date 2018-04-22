import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {

  componentWillMount() {
    console.log(1);
    axios.get('/api/user')
      .then(console.log)
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default App
