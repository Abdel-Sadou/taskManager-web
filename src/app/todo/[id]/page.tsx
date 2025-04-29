'use client';
import { useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getTaskById} from "@/lib/todoService";
import {Task} from "@/model/model";


export default function TodoPage (){

    const   [todo, setTodo] = useState<Task>()
  const   id  = parseInt(useParams().id as string) ;
    const router = useRouter();

    useEffect(() => {
        console.log("id", id)
        getTaskById(id).then(value => {
            if (value ){
                setTodo(value)
            }
        }).catch(error => {
            console.log("create todo error ", error)
        })

    }, [id, router]);

    return (
        <div>
            <h1>{todo?.id}</h1>
            <h2>{todo?.title}</h2>
            <p>{todo?.description}</p>
        </div>
    )
}