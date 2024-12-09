import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {

const {register, handleSubmit, formState:{errors}} = useForm();
const {signin, errors: signinErrors, isAuthenticated} = useAuth();
const navigate = useNavigate()

const onSubmit = handleSubmit((data => {
  console.log(data); 
  signin(data);
}));

useEffect(() => {
    if(isAuthenticated){
      navigate("/tasks")
    }
},[isAuthenticated])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">   

    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
    {signinErrors.map((error, i) => (
     <p key={i} className="bg-red-500 p-2 text-white m-2">{error}</p>      ))}
    <h1 className="text-2xl font-bold">Login</h1>
    <form action="" onSubmit={onSubmit}>     
       <input
         type="email"
         {...register("email", { required: true })}
         className="w-full bg-zinc-700 text-white px-4 py-2 roundedn-md my-2"
         placeholder="email"
       />
      {errors.email && <p className="text-red-500">email is required</p>}
       <input
         type="password"
         {...register("password", { required: true })}
         className="w-full bg-zinc-700 text-white px-4 py-2 roundedn-md my-2"
         placeholder="password"
       />
        {errors.password && <p className="text-red-500">password is required</p>}
       <button type="submit" className="bg-slate-400 rounded-md p-2 my-2">Login</button>
     </form>
     <p className="flex gap-x-2 justify-between text-sm">Don´t have an account? <Link className="text-sky-500" to="/register">Sign up</Link></p>
    </div>
   </div>
  )
}

export default LoginPage