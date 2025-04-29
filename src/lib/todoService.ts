import {Task} from "@/model/model";
import getAuthHeader from "@/lib/authService";

const BASE_URL = "http://localhost:8080";


export async function getTodoByUser(id : number): Promise<Task[]> {
    console.log("ID********************* ", id)
    const res = await fetch(`${BASE_URL}/task/getTaskByUser/${id}`, {
        method: "GET",
        headers : getAuthHeader()
    })

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.json();

}
export async function getTaskById(id : number): Promise<Task> {
    console.log("ID*********************", id)
    const res = await fetch(`${BASE_URL}/task/getTaskById/${id}`, {
        method: "GET",
        headers : getAuthHeader()
    })

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.json();

}
export async function createTodo(todo : Task) {
    console.warn("Header", getAuthHeader()?.Authorization)

    const res = await fetch(`${BASE_URL}/task/addTask`, {
        method: "POST",
        body : JSON.stringify(todo),
        headers : getAuthHeader()
    })

    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.text();

}
export async function deleteTask(idTask : number): Promise<string> {
    const res = await fetch(`${BASE_URL}/task/deleteTask/${idTask}`, {
        method: "DELETE",
        headers : getAuthHeader()
    })
    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.text();
}

export async function updateTask(task : Task): Promise<string> {
    const res = await fetch(`${BASE_URL}/task/updateTask/${task.id}`, {
        method: "PUT",
        body : JSON.stringify(task),
        headers : getAuthHeader()
    })
    if (!res.ok) throw new Error("Une erreur s'est produite !!!!");
    return res.text();
}