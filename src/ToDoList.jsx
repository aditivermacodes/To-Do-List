import { func } from "prop-types";
import React,{useState} from "react";

function ToDoList() {
    const[task,setTask] = useState(["Breakfast","Gym"]);
    const[newtask, setnewTask] = useState("");

    function handlenewTask(event) {
        setnewTask(event.target.value);
    }

    function addnewtask() {
        if(newtask.trim() !== ""){
        setTask(t=> [...t,newtask]);
        setnewTask("");
        }
    }

    function removetask(index) {
        setTask(task.filter((_,i)=>i!==index));
    }

    function moveuptask(index) {
        if(index>0) {
        const updatedTask = [...task];
        [updatedTask[index],updatedTask[index-1]] = [updatedTask[index-1],updatedTask[index]];
        setTask(updatedTask);
        }
    }

    function movedowntask(index) {
        if(index< task.length-1) {
        const updatedTask = [...task];
        [updatedTask[index],updatedTask[index+1]] = [updatedTask[index+1],updatedTask[index]];
        setTask(updatedTask);
        } 
    }

    return(
        <div className="todolist">
            <h3>TO DO LIST</h3>
            <div >
            <input className="inp" type="text" placeholder="Enter a Task" value={newtask} onChange={handlenewTask} />
            <button className="inpbut" onClick={addnewtask}>Add</button>
            </div>
            <ol className="lis">
                {task.map((task,index)=> <li className="task-item" key={index}>{task} 
            <button className="rmbut" onClick={()=> removetask(index)}>👍</button>
            <button className="upbut" onClick={()=>moveuptask(index)}>👆</button>
            <button className="dnbut" onClick={()=>movedowntask(index)}>👇</button></li>)}
            </ol>
        </div>
    )
}
export default ToDoList