import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

/**
* @typedef TodoL
* @property {string} title
* @property {string} id
* @property {boolean} checked
* @property {Task[]} tasks
*/

export default class Lists extends React.Component {
  state = {
    /** @type {TodoL} */
    todolists: [],
    new_todolist_title: "",
    todolist_titles: {},
  }

  async componentDidMount() {
    try {
      const { data: { todolists } } = await axios.get('/api/todolist')
      const todolist_titles = todolists.reduce((obj, todolist) => {
        obj[todolist.id] = todolist.title
        return obj
      }, {})

      this.setState({
        todolists,
        todolist_titles,
      })
    } catch (e) {
      console.error(e)
    }
  }

  delete_todolist = async (id) => {
    try {
      await axios.delete(`/api/todolist/${id}`)

      const todolists = this.state.todolists.filter((e) => e.id !== id)
      this.setState({
        todolists,
      })
    } catch (e) {
      console.error(e)
    }

  }

  change_todolist_name = async (id) => {
    try {
      await axios.put(`/api/todolist/${id}`, {
        title: this.state.todolist_titles[id]
      })
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * @param {React.ChangeEvent} event 
   */
  handle_change = (event) => {
    this.setState({ new_todolist_title: event.target.value })
  }

  /**
   * @param {React.ChangeEvent} event 
   */
  create_todolist = async (event) => {
    event.preventDefault()
    if (this.state.new_todolist_title.trim().length === 0) {
      return
    }

    try {
      const res = await axios.post('/api/todolist', {
        title: this.state.new_todolist_title,
      })

      if (res.data?.todolist) {
        const todolists = this.state.todolists
        const todolist_titles = this.state.todolist_titles
        todolist_titles[res.data.todolist.id] = res.data.todolist.title
        todolists.push(res.data.todolist)

        this.setState({
          todolists,
          todolist_titles,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="container">
        Liste de Todolist : 
        {this.state.todolists.map(todolist => (
          <div key={todolist.id}>
            <form onSubmit={e => {
              e.preventDefault()
              this.change_todolist_name(todolist.id)
            }}>
              <input type="checkbox" checked={todolist.checked} disabled={true}></input>
              <input
                type="text"
                value={this.state.todolist_titles[todolist.id] || ""}
                onChange={e => {
                  const todolist_titles = this.state.todolist_titles
                  todolist_titles[todolist.id] = e.target.value

                  this.setState({
                    todolist_titles,
                  })
                }}
              ></input>
              <Link to={`/${todolist.id}`}><button type="button">Open</button></Link>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault()
                  this.delete_todolist(todolist.id)
                }}
              >
                Delete
              </button>
            </form>
          </div>
        ))}
        <form onSubmit={this.create_todolist}>
          <input
            value={this.state.new_todolist_title}
            onChange={this.handle_change}
            type="text"
            placeholder="New todolist title"
          />
          <button type="submit">+</button>
        </form>
      </div>
    )
  }
}
