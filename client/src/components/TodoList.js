import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * @typedef Task
 * @property {string} _id
 * @property {boolean} checked
 * @property {string} title
 * 
**/

class TodoList extends React.Component {
  state = {
    id: null,
    task: null,
    /**
     * @type {Task[]}
     */
    tasks: [],
    new_task_title: "",
    task_titles: [],
    task_checks: [],
  }

  constructor(props) {
    super(props)
    this.state.id = this.props.match.params.id
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`/api/todolist/${this.state.id}`)
      const task_titles = data.todolist.tasks.reduce((obj, task) => {
        obj[task._id] = task.title
        return obj
      }, {})

      const task_checks = data.todolist.tasks.reduce((obj, task) => {
        obj[task._id] = task.checked
        return obj
      }, {})

      this.setState({
        title: data.todolist.title,
        tasks: data.todolist.tasks,
        task_titles,
        task_checks,
      })

    } catch (e) {
      console.error(e)
    }
  }

  /**
   * @param {React.ChangeEvent} event 
   */
  handle_change = (event) => {
    this.setState({ new_task_title: event.target.value })
  }

  create_task = async (event) => {
    event.preventDefault()

    if (this.state.new_task_title.trim().length === 0) {
      return
    }

    try {
      const res = await axios.post(`/api/todolist/${this.state.id}`, {
        title: this.state.new_task_title,
      })

      if (res.data?.task) {
        const tasks = this.state.tasks
        const task_titles = this.state.task_titles
        const task_checks = this.state.task_checks
        task_titles[res.data.task._id] = res.data.task.title
        task_checks[res.data.task._id] = res.data.task.checked
        tasks.push(res.data.task)

        this.setState({
          tasks,
          task_titles,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  change_statut = async (task_id, value) => {
    console.log(value)
    try {
      await axios.put(`/api/todolist/${this.state.id}/${task_id}/check`, {
        checked: value ? true : false,
      })

      const task_checks = this.state.task_checks
      task_checks[task_id] = value

      this.setState({
        task_checks,
      })
    } catch (e) {
      console.error(e)
    }
  }

  change_task_name = async (task_id) => {
    try {
      await axios.put(`/api/todolist/${this.state.id}/${task_id}`, {
        title: this.state.task_titles[task_id]
      })
    } catch (e) {
      console.error(e)
    }
  }

  delete_task = async (task_id) => {
    console.log(task_id)
    try {
      await axios.delete(`/api/todolist/${this.state.id}/${task_id}`)
      const tasks = this.state.tasks.filter((task) => task._id !== task_id)

      this.setState({
        tasks,
      })
    } catch (e) {

    }
  }

  render() {
    const tasks = this.state.tasks || []

    return (
      <div className="container">
        Todolist : {this.state.title}
        {tasks.map(task => (
          <div key={task._id}>
            <form onSubmit={e => {
              e.preventDefault()
              this.change_task_name(task._id)
            }}
            >
              <input
                type="checkbox"
                checked={this.state.task_checks[task._id]}
                onChange={e => {
                  this.change_statut(task._id, e.target.checked)
                }}>


              </input>
              <input
                type="text"
                value={this.state.task_titles[task._id] || ""}
                onChange={e => {
                  const task_titles = this.state.task_titles
                  task_titles[task._id] = e.target.value

                  this.setState({
                    task_titles,
                  })
                }}
              >

              </input>
              <button onClick={e => {
                e.preventDefault()
                this.delete_task(task._id)
              }}>
                Delete
              </button>
            </form>
          </div>
        ))}
        <form onSubmit={this.create_task}>
          <input
            value={this.state.new_task_title}
            onChange={this.handle_change}
            type="text"
            placeholder="New task title"
          />
          <button type="submit">+</button>
        </form>
        <Link to={`/`}><button type="button">Retour à la liste</button></Link>
      </div>
    )
  }
}

export default withRouter(TodoList)
