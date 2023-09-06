import { useForm } from 'react-hook-form'

function RegisterPage() {

    const {register, handleSubmit} = useForm()
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <h1 className="text-5xl font-bold">RegisterPage</h1>
            <form onSubmit={handleSubmit((values) => {
                console.log(values)
            })}>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" placeholder='Username' {...register("username", {required: true})} />
                <input type="email" className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" placeholder='Email' {...register("email", {required: true})} />
                <input type="password" className="w-full bg-zinc-700 text-white px-4 rounded-md my-2" placeholder='Password' {...register("password", {required: true})} />
                <button type="submit" {...register("")}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage