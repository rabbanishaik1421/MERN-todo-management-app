import { useEffect, useState } from 'react';
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId]=useState(null);
  const [completed, setCompleted] = useState(false);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/api/todos");
    console.log(res.data);
    setTodos(res.data);
  };

  const addTodo = async()=>{
    if(editId){
      const res = await axios.put(`http://localhost:3000/api/todos/${editId}`, {
        title:title
      });
      setEditId(null);
    }
    else{
      const res = await axios.post("http://localhost:3000/api/todos", {
        title:title,
        completed:false
      });
    }

    setTitle("");
    fetchTodos();
  }

  const editTodo = async(todo)=>{
    setTitle(todo.title);
    setEditId(todo._id);
  }

  const cancelTodo = async()=>{
    setTitle("");
    setEditId(null);
  }

  const deleteTodo=async(id)=>{
    const confirmDelete = window.confirm("Are you sure, you want to delete this record!")
    
    if(!confirmDelete) return;

    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    fetchTodos();
  }

  const updateCompleted=async(id, completed)=>{
    await axios.put(`http://localhost:3000/api/todos/${id}`,{
      completed:completed
    });
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-sm-12">
          <h4 className='mb-5 text-center text-uppercase bg-info p-2'>Todo App</h4>
        </div>
      </div>
      
      <div className="row">
        <div className="col-sm-4">
          <div className="">
            <div className="card border-primary">
              <div className="card-header bg-info">
                <h6 className="card-title">{editId?"Edit":"Add"} To do</h6>
              </div>
              <div className="card-body">
                <form action="">
                  <div className="form-group mb-3">
                    <label htmlFor="">Enter Title</label>
                    <input type="text" className="form-control" name="title" id="title" value={title} onChange={(e)=>{
                      setTitle(e.target.value)
                    }} />
                  </div>
                  <div className="form-group">
                    <button type='button' onClick={addTodo} className='btn btn-sm btn-primary mr-2'>{editId?'Update':'Save'}</button>
                    &nbsp; &nbsp;<button type='button' onClick={cancelTodo} className='btn btn-sm btn-info ml-2'>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card border-primary w-100">
            <div className="card-header bg-info">
              <h6 className="card-title">To do list</h6>        
            </div>
            <div className="card-body">
              <table className="table table-bordered table-hover table-responsive">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => {
                  return (
                    <tr key={todo._id || index}>
                      <td>{index + 1}</td>
                      <td>{todo.title}</td>
                      <td>
                        <select className='form-control w-50' value={todo.completed?'yes':'no'} name="" id="" onChange={(e)=>{
                          updateCompleted(todo._id, e.target.value === 'yes')
                        }}>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>                      
                      <td><a href='#' className='text-primary' onClick={()=>editTodo(todo)} ><FaEdit /></a> </td>
                      <td><a href='#' className='text-danger' onClick={()=>deleteTodo(todo._id)} ><FaTrash /></a> </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
