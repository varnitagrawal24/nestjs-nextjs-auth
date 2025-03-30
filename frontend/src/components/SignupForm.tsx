import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signup } from "@/services/auth.service";
import { useSession } from "next-auth/react";

const signupSchema = z.object({
    username: z.string().min(3, { message: 'Username must be 3 character long' }),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(5, { message: 'Password must be 5 character long' })
})

type signupData = z.infer<typeof signupSchema>;

export default function SignUpForm(){

    const session = useSession()
    console.log("🚀 ~ SignUpForm ~ session:", session)

    const signupForm = useForm<signupData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            password: '',
            email: ''
        }
    })

    const onSubmit = async (data: signupData) => {
        console.log("🚀 ~ onSubmit ~ data:", data)

        const res = await signup(data);
        console.log("🚀 ~ onSubmit ~ res:", res)

    }

    return <>
    <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your username" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
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
              control={signupForm.control}
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
                Sign Up
            </Button>
        </form>
    </Form>
    </>
}