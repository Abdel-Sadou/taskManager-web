'use client';

import {useCallback, useEffect, useState} from "react";
import TodoItem from "@/app/todoItem";
import TodoListItem from "@/app/todoListItem";
import {Task} from "@/model/model";
import Header from "@/app/header";
import {createTodo, deleteTask, getTodoByUser} from "@/lib/todoService";
import ProtectedPage from "@/app/protectedPage";
import {useStore} from "zustand/react";
import AuthStore from "@/app/AuthStore";
import {SessionProvider} from "next-auth/react";


export default function Home() {
    const [todos, setTodos] = useState<Task[]>([]);
    const auhtStore = useStore(AuthStore);

    const addTodo = (todo: Task) => {
        todo.user.id = auhtStore?.user?.id as number;
        if (todo) {
            createTodo(todo).then(value => {
                console.log(value)
                alert(value)
                getTodo()
            }).catch(error => {
                console.log("create todo error ", error)
            })
        } else {
            alert("veuillez saisir un todo")
        }
    }
     const  getTodo = useCallback(  ()=>{
         if ( auhtStore?.user){
             console.log("getTodo auhtStore  ////////////////",auhtStore?.user?.id)
             getTodoByUser( auhtStore?.user?.id as number).then(value => {
                 console.log(value)
                 if (value) setTodos(value)
             }).catch(error => {
                 console.log("get todo error ", error)
             })
         }

    }, [auhtStore?.user])

    const toggleTodo = (id: number) => {
        setTodos(prevState =>
            prevState.map(Task =>
                Task.id === id ? {...Task, completed: !Task.completed} : Task
            )
        )
    }
    const deleteTodo = (id: number) => {
        console.log("DELETE TASK", id)
        deleteTask(id).then(value => {
            console.log(value)
            alert(value);
            getTodo();
        }).catch(err => {
            console.log(err);
        })

    }


    useEffect(() => {
        getTodo();
    }, [getTodo]);

    return (
        <main className="p-6">
            <SessionProvider>
                <ProtectedPage>
                    <Header></Header>
                    <h1 className="text-2xl mb-4 text-center p-6">Task App</h1>
                    <div className=" flex items-center justify-center">

                        <div>

                            <TodoItem addTodo={ addTodo}/>
                            {
                                todos.map(task => (
                                    <TodoListItem deleteTodo={deleteTodo} toggleTodo={toggleTodo} key={task.id!} todo={task}/>
                                ))
                            }
                        </div>

                    </div>
                </ProtectedPage>
            </SessionProvider>

        </main>
    );
}
