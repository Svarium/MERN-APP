import { createContext, useContext, useEffect, useState } from "react";
import { createTasksRequest, deleteTasksRequest, getOneTaskRequest, getTasksRequest, updateTasksRequest } from "../api/tasks";

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
  const [errors, setErrors] = useState([]);


  //OBTENER TODAS LAS TAREAS
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);

    }

  }

  //CREAR UNA TAREA NUEVA
  const createTask = async (task) => {
    try {
      const res = await createTasksRequest(task)
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  }

  //ELIMINAR UNA TAREA
  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.data.message === 'Task deleted!') {
        setTasks(tasks.filter(task => task._id !== id))
      }

    } catch (error) {
      console.log(error);
    }
  }

  //OBTENER UNA TAREA
  const getTask = async (id) => {
    try {
      const res = await getOneTaskRequest(id);
      return res.data

    } catch (error) {
      console.log(error);
    }
  }

  //ACTUALIZAR UNA TAREA
  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  }


  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask,
        getTasks,
        getTask,
        errors
      }}>
      {children}
    </TaskContext.Provider>
  )
}
