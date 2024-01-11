import React,{useEffect} from 'react'

import { useDispatch,useSelector } from 'react-redux'

import { loadTasks,removeOneTask } from '../store/task'

const Tasks = () => {
  const {tasks,loading} = useSelector(state => state.Tasks)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadTasks())
  },[])
    
  return (
  <>
    {loading ? <p>Loading...</p> : <div>{tasks.map((task) => <p key={task.id}>{task.task} <button onClick={() => {dispatch(removeOneTask({id:task.id}))}} > Delete </button></p>)}</div>}
  </>
  )
}

export default Tasks