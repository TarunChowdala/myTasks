import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './Components/TagItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    tagSelected: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    tagSelected: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    tagSelected: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    tagSelected: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    tagSelected: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    tagSelected: false,
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    actualTaskList: [],
    taskName: '',
    tagName: tagsList[0].optionId,
    activeTagId: '',
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  onChangeDropDown = event => {
    this.setState({tagName: event.target.value})
  }

  onSubmitForm = event => {
    const {taskName, tagName} = this.state
    event.preventDefault()
    const newTask = {name: taskName, tag: tagName, id: uuidv4()}
    this.setState(prevState => ({tasksList: [...prevState.tasksList, newTask]}))
    this.setState(prevState => ({
      actualTaskList: [...prevState.actualTaskList, newTask],
    }))
    this.setState({taskName: '', tagName: 'HEALTH'})
  }

  onSelectTag = tag => {
    const {actualTaskList, activeTagId} = this.state

    if (tag.optionId !== activeTagId) {
      const filteredList = actualTaskList.filter(
        eachItem => eachItem.tag === tag.optionId,
      )
      this.setState({tasksList: filteredList})
      return this.setState({activeTagId: tag.optionId})
    }
    return this.setState({activeTagId: '', tasksList: actualTaskList})
  }

  render() {
    const {tasksList, taskName, tagName, activeTagId} = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Create a task!</h1>
              <label htmlFor="input-1" className="label">
                Task
              </label>
              <br />
              <input
                value={taskName}
                type="text"
                id="input-1"
                className="input-element"
                placeholder="Enter the task here"
                onChange={this.onChangeTaskName}
              />
              <br />
              <label htmlFor="input-2" className="label">
                Tags
              </label>
              <br />
              <select
                id="input-2"
                className="drop-down-element"
                value={tagName}
                onChange={this.onChangeDropDown}
              >
                {tagsList.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Add Task
                </button>
              </div>
            </form>
          </div>

          <div className="data-container">
            <h1 className="tags-text">Tags</h1>
            <ul className="tags-list">
              {tagsList.map(eachItem => (
                <TagItem
                  onSelectTag={this.onSelectTag}
                  key={eachItem.optionId}
                  eachItem={eachItem}
                  activeTagId={activeTagId}
                />
              ))}
            </ul>
            <h1 className="tags-text">Tasks</h1>
            {tasksList.length === 0 ? (
              <p className="no-tasks-text">No Tasks Added Yet</p>
            ) : (
              <ul className="tasks-list">
                {tasksList.map(eachItem => (
                  <li key={eachItem.id} className="task-item">
                    <p className="task-name-para">{eachItem.name}</p>
                    <button type="button" className="btn">
                      {eachItem.tag}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
