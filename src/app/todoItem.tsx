
'use client';
import {Task} from "@/model/model";
import { useState} from "react";
import {useStore} from "zustand/react";
import {todoStore} from "@/app/todoStore";

export default function TodoItem (props: { addTodo :()=>void}){

   // const  [todo, setTodo] = useState<Task>({completed : false , title : '',description :'', id:null, user : {id:0}})

    const {todo, setTodo} = useStore(todoStore);
    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text" value={todo.title}
                onChange={e => setTodo({...todo, title: e.target.value })}
                className="border p-2 rounded"
                placeholder="title"
            /><input
                type="text" value={todo.description}
                onChange={e => setTodo({...todo, description: e.target.value })}
                className="border p-2 rounded"
                placeholder="Ajouter une tâche"
            />
            <button onClick={()=> props.addTodo()} className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
        </div>
    );
}