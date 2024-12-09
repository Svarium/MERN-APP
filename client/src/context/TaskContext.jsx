import { createContext, useContext, useState } from "react";
import { createTasksRequest, deleteTasksRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
    
const [tasks, setTasks] = useState([]);

    //OBTENER TODAS LAS TAREAS
    const getTasks = async() => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);   
        } catch (error) {
            console.log(error);            
        }
               
    }

    //CREAR UNA TAREA NUEVA
    const createTask = async(task) => { 
      const res =  await createTasksRequest(task)
      console.log(res);  
    }

    //ELIMINAR UNA TAREA
    const deleteTask = async(id) => {
      try {
        const res = await deleteTasksRequest(id);
        if(res.data.message === 'Task deleted!'){
          setTasks(tasks.filter(task => task._id !== id))
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }


  return (
        <TaskContext.Provider 
        value={{
            tasks,
            createTask,
            deleteTask,
            getTasks
        }}>
                    {children}
            </TaskContext.Provider>
    )
}
