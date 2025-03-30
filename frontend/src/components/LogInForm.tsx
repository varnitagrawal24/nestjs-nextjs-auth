import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { login } from "@/services/auth.service";

const logInSchema = z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(1, { message: 'Required'} )
})

type logInData = z.infer<typeof logInSchema>;

export default function LogInForm(){

    const router = useRouter();

    const loginForm = useForm<logInData>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: logInData) => {
        console.log("🚀 ~ onSumbit ~ data:", data)

        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if (res?.ok) {
            router.push("/");
          } else {
            alert("Invalid credentials");
          }
    }

    return<>
    <Form {...loginForm}>
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit">
                Log In
            </Button>
        </form>
    </Form>
    </>
}