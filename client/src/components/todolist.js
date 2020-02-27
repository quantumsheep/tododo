import React from 'react'
import axios from 'axios'
import { useRouteMatch, withRouter } from 'react-router-dom'

/**
 * @typedef Task
 * @property {string} id
 * @property {boolean} checked
 * @property {string} title
 * 
 * @typedef TodoL
 * @property {string} title
 * @property {string} id
 * @property {boolean} checked
 * @property {Task[]} tasks
 */

class TodoList extends React.Component {
  state = {
    id: null,
    /**
     * @type {TodoL}
     */
    data: null,
  }

  constructor(props) {
    super(props)
    this.state.id = this.props.match.params.id
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`/api/todolist/${this.state.id}`)
      this.setState({
        data: data.todolist,
      })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        {this.state.data.tas}
      </div>
    )
  }
}

export default withRouter(TodoList)
