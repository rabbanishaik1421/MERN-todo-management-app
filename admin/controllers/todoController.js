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

export const updateTodo = async (req, res)=>{
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(todo);
}

export const deleteTodo = async (req, res)=>{
    try {
        const todo = await Todo.findOneAndDelete(
            req.params.id
        );

        if(!todo){
            res.status(404).json({message:"To do not found"})
        }

        res.status(200).json({message:"To do deleted successfully"});    
    } catch (error) {
        res.status(500).json({message:"Something went wrong, please try again."+error.message})
    }    
}