'use client';
import {Task} from "@/model/model";

interface chilprops {
    todo :Task,
    toggleTodo: (id:number)=> void,
    deleteTodo: (id:number)=> void,
    key : number,
}
export default function TodoListItem(p:chilprops){
    return (
        <li key={p.todo.id} className="flex justify-between items-center mb-2">
                            <span onClick={() => p.toggleTodo(p.todo.id!)}
                                  className={`cursor-pointer ${p.todo.completed ? 'line-through' : ''}`}>
                                    {p.todo.description}
                            </span>
            <button onClick={() => p.deleteTodo(p.todo.id!)} className="text-red-500">Supprimer</button>
        </li>
    )
}