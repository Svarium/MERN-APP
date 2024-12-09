import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated){
     navigate("/tasks") 
    }  
  }, [isAuthenticated]);
   
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate("/tasks")
    }
},[isAuthenticated])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">   
         
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {registerErrors.map((error, i) => (
      <p key={i} className="bg-red-500 p-2 text-white m-2">{error}</p>
        ))}
        <h1 className="text-2xl font-bold">Register</h1>
        <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 roundedn-md my-2"
          placeholder="username"
        />
        {errors.username && <p className="text-red-500">username is required</p>}
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
        <button type="submit" className="bg-slate-500 rounded-md p-2 my-2">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between text-sm">already have an account? <Link className="text-sky-500" to="/login">Login</Link></p>
        </div>
     
    </div>
  );
}

export default RegisterPage;
