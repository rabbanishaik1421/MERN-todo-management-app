import { useEffect, useState } from 'react';
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

//import './App.css'

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
    const res = await axios.post("http://localhost:3000/api/todos", {
      title:title,
      completed:false
    });

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

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
    <div className="container p-5">
      <div className="row">
        <div className="col-sm-12">
          <h4 className='text-center mb-5'>Todo App</h4>
        </div>
      </div>
      
      <div className="row">
        <div className="col-sm-4">
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Add To do</h6>
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
          <div className="card w-100">
            <div className="card-header">
              <div className="card-title">To do list</div>        
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
                      <td>{todo.completed?"Yes":"No"}</td>                      
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
