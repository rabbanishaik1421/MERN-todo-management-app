import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
                    <input type="text" className="form-control" name="title" id="title" />
                  </div>
                  <div className="form-group">
                    <button className='btn btn-sm btn-primary'>Save</button>
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
