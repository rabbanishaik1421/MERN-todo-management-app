import Todo from "../models/Todo.js";

export const createTodo = async (req, res)=>{
    const todo = new Todo(req.body);
    await todo.save();

    res.send(todo);
}

export const getTodos = async (req, res)=>{
    const todo = await Todo.find();
    console.log("todos are fetched")
    res.json(todo);
}