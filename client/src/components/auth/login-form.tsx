"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "../ui/password-input";
 
const formSchema = z.object({
  email: z.string().trim().email().min(1),
  password: z.string().trim().min(8).max(100)
})


const LoginForm = () => {
  const { toast } = useToast();

  async function performLogin(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    const response = await fetch('https://localhost:5000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message
      }
    }

    return {
      success: true
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "eslam@mail.com",
      password: "Admin123!",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success } = await performLogin(values.email, values.password);

    if (!success) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Login successful"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm