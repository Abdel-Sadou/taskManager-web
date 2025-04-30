import {createStore} from "zustand/vanilla";
import {Task} from "@/model/model";
type todoType ={
    todo : Task,
    setTodo: (todo:Task)=>void
}

export const todoStore = createStore<todoType>(
    state => ({
        todo : {completed : false , title : '',description :'', id:null, user : {id:0}},
        setTodo : (todo)=> state({todo})
    })
)