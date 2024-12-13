"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export enum FormFiledType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'

}
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

 
export const PatientForm = () => {
    const router = useRouter();
 const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name:"",
      email:"",
      phone:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit({name , email , phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true)
    try {
        // const userData  ={
        //     name,
        //     email,
        //     phone
        // }
        // const user = await createUser(userData);
        // if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
        console.log(error)
    }
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1>Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc = "/assets/icons/user.svg"
        iconAlt = "user"
        />
       <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "email"
        />
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="+91 1234567890"
        
        />
        <SubmitButton isLoading = {isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm