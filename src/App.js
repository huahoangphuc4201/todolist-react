import './App.css';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function App() {

  const storedTasks = JSON.parse(localStorage.getItem('tasks'))
  const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'))

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(storedTasks ?? [])
  const [completedTasks, setCompletedTasks] = useState(storedCompletedTasks ?? [])

  const handleAddTask = () => {
    setTasks(prev =>{
      if(task.length === 0)
        return prev;
      const data = [...prev, task]
      localStorage.setItem('tasks', JSON.stringify(data))
      return data
    })
    setTask('')
  }

  const handelRemoveTask = (itemIndex, item) => {
    setTasks(prev => {
      const data = prev.filter((_, index) => index !== itemIndex)
      localStorage.setItem('tasks', JSON.stringify(data))
      return data
    })
    setCompletedTasks(prev => {
      const completedTask = { name : item, time : new Date().toLocaleTimeString()}
      const data = [...prev, completedTask]
      localStorage.setItem('completedTasks', JSON.stringify(data))
      return data
    })
  }

  const handleClean = () => {
    localStorage.setItem('completedTasks', null)
    setCompletedTasks([])
  }

  return (
    <div>
      <div className='title'>Todo List</div>
      <div className='completed-container'>
        <div className='completed-label'>Done</div>
        <ul className='completed-tasks'>
          { completedTasks.map((item, index) => (
            <li key={index} className='completed-task'>
              <div className='completed-task-name'>{item.name}</div>
              <div className='done-time'>{item.time}</div>
            </li>
          )) }
        </ul>
        <button className='btn-clean' onClick={() => handleClean()}>Clean</button>
      </div>
      <div className='container'>
        <div id='new-task-container'>
          <input id='task' placeholder='New task here...'
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button id='btn-add' onClick={handleAddTask}>Add</button>
        </div>
        <ul id='task-list'>
          { tasks.map((item, index) => (
              <li key={index} className='content'>
                <div className='task-name'>
                  <label >{item}</label>
                </div>
                <button className='btn-done' onClick={() => { handelRemoveTask(index, item) }}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </li>
          )) }
        </ul>
      </div>
    </div>
  );
}

export default App;