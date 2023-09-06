import { useForm } from 'react-hook-form'
import { registerRequest } from '../api/auth';


function RegisterPage() {

    const { register, handleSubmit } = useForm();

    const onSubmit = () => {
        handleSubmit(async (values) => {
            const res = await registerRequest(values)
            console.log(res)
         })
    }

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <h1 className="text-3xl font-bold">RegisterPage</h1>
            <form onSubmit={onSubmit}>
                <input type="text" 
                {...register("username", { required: true })} 
                className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" 
                placeholder='Username' 
                />
                <input type="email"  
                {...register("email", { required: true })} 
                className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" 
                placeholder='Email' 
                />
                <input type="password"  
                {...register("password", { required: true })} 
                className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" 
                placeholder='Password' 
                />
                <button type="submit" 
                className='text-xs font-bold border-spacing-1 rounded-md'>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;