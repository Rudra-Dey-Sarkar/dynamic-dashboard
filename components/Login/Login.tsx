"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { login } from "../../lib/authentication";
import toast from "react-hot-toast";


type CredentialsDataType = {
    email: string,
    password: string
}
// Controlling login feature
const controlLogin = (router: AppRouterInstance, data: CredentialsDataType) => {
    const token = login(data?.email, data?.password);
    if (token) {
        toast.success("Login successful");
        router.push("/dashboard");
    } else {
        toast.error("Invalid credentials");
    }
};

const Login = () => {
    const router = useRouter();
    const form = useForm<CredentialsDataType>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <div className="pt-12">
            <p className="text-[2rem] font-semibold text-center">Explore All <strong className="text-green-500">Features📲</strong></p>
            <p className="text-center text-[0.9rem]">Explore all features in Dashboard, please login to access the dashboard</p>

            <div className="flex flex-col items-center justify-center mt-[10vh]">
                <p className="mb-4 text-[1.2rem] font-semibold">Please Login 👇🏻</p>
                <form
                    className="grid w-fit"
                    onSubmit={handleSubmit((data) => controlLogin(router, data))}>
                    {/* Field to enter email */}
                    <label
                        htmlFor="Email"
                        className="text-[15px] font-semibold">Enter Your Email :-</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format",
                            },
                        })}
                        placeholder="example@gmail.com"
                        className="border p-2 mb-2"
                    />
                    {errors?.email && <p className="text-red-500 text-[15px]">{errors.email.message}</p>}
                    {/* Field to enter password */}
                    <label
                        htmlFor="password"
                        className="text-[15px] font-semibold">Enter Your Password :-</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        placeholder="Enter your password"
                        className="border p-2 mb-2"
                    />
                    {errors?.password && <p className="text-red-500 text-[15px]">{errors.password.message}</p>}

                    {/* Button to submit the credentials */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 hover:cursor-pointer" >Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
