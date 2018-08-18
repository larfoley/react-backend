import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {

  state = {
    user: null
  }

  login(event) {
    event.preventDefault()
    axios.post('/api/login', {
      email: 'testuser@foo.com',
      password: 'foo'
    })
    .then((res) => {
      console.log(res)
      this.setState({user: res.data})
    })
    .catch(err => {
      console.log(err)
    })
    window.alert('login')
  }

  registerUser(event) {
    event.preventDefault()
    const email = "testuser@foo.com"
    const password = "foo"

    axios.post('/api/register', {email, password})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.message)
      })
    window.alert('register')
  }

  render() {
    return (
      <div>
        <h1>{this.state.user? "Logged In" : "Logged out"}</h1>

        <form onSubmit={this.login.bind(this)}>
          <h2>Login</h2>
          <input type="text"/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>

        <form onSubmit={this.registerUser}>
          <h2>Register</h2>
          <input type="text"/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>

      </div>
    )
  }
}

export default App
