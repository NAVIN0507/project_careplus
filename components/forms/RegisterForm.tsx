"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
 
} from "@/components/ui/form"


import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation" 
import { useRouter } from "next/navigation"
import {  registerPatient } from "@/lib/actions/patient.actions"
import { FormFiledType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"

 import {
 
  SelectItem,
  
} from "@/components/ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

export const RegisterForm = ({user} :{user :User}) => {
    const router = useRouter();
 const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name:"",
      email:"",
      phone:""
    },
  })
 
  // 2. Define a submit handler.
 const onSubmit = async(values: z.infer<typeof PatientFormValidation>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true)
    let formData;
    if(values.identificationDocument && values.identificationDocument.length >0){
      const blobFile = new Blob([values.identificationDocument[0]] , {
        type:values.identificationDocument[0].type,

      });
      formData = new FormData();
      formData.append('blobFile' , blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }
    try {
       const patientData ={
        ...values,
        userId:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument: formData
       }
       
       const patient = await registerPatient(patientData);
       if(patient){
        router.push(`/patients/${user.$id}/new-appointment`)
       }
      }catch (error) {
        console.log(error)
    }
    setisLoading(false);
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1>Welcome👋</h1>
            <p className="text-dark-700">Let us Know more about yourself.</p>
        </section>
        <section className="space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc = "/assets/icons/user.svg"
        iconAlt = "user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
    
    <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.DATE_PICKER}
        name="birthDate"
        label="Date of Birth"
        
        />
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.SKELETON}
        name="gender"
        label="Gender"
       renderSkeleton={(field)=>(
        <FormControl>
            <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                {GenderOptions.map((option)=>
                <div key={option} className="radio-group">
                    <RadioGroupItem value={option} id={option}/>
                    <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                </div>
                )}
            </RadioGroup>
        </FormControl>
       )}
        
        />
    </div>
   

     <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="address"
        label="Address"
        placeholder="Anna Salai, Periyapet, Saidapet Chennai"
        
        />
          <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="occupation"
        label="Occupation"
        placeholder="Software Engineer"
       
        />
    </div>
    
     <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="emergencyContactName"
        label="Emergency Contact Name"
        placeholder="Guardian's name"
       
        />
        <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.PHONE_INPUT}
        name="emergencyContactNumber"
        label="Emergency Contact Number"
        placeholder="+91 1234567890"
        
        />
    </div> 
 <section className="space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>
        <CustomFormField
            fieldType={FormFiledType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p className="cursor-pointer">{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

    <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="insuranceProvider"
        label="Insurance Provider"
        placeholder="PolicyBazaar ICICI"
        
        />
          <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.INPUT}
        name="insurancePolicyNumber"
        label="Insurance Policy Number"
        placeholder="ABC123456789"
       
        />
    </div>
      <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.TEXTAREA}
        name="allergies"
        label="Allergies (if any)"
        placeholder="Peanuts  , Dust , Smoke"
        
        />
          <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.TEXTAREA}
        name="currentMedication"
        label="Curren Medication (if any)"
        placeholder="Pressure Tablet Paracetamol 500mg"
       
        />
    </div>
    <div className="flex flex-col gap-6 xl:flex-row">
         <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.TEXTAREA}
        name="familyMedicalHistory"
        label="Family Medical History (if available)"
        placeholder="Father Had Eye operation"
        
        />
          <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.TEXTAREA}
        name="pastMedicalHistory"
        label="Past Medical History"
        placeholder="ex: Surgery in the left leg"
       
        />
    </div>
     <section className="space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section>
  <CustomFormField
            fieldType={FormFiledType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type} className="cursor-pointer">
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField 
          fieldType={FormFiledType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="ABC123456789"
          />
           <CustomFormField 
        control={form.control}
        fieldType = {FormFiledType.SKELETON}
        name="identificationDocument"
        label="Identification Document"
       renderSkeleton={(field)=>(
       <FormControl>
        <FileUploader files={field.value} onChange={field.onChange}/>
       </FormControl>
       )}
        
        />
         <section className="space-y-6">
            <div className="space-y-1 mb-9">
                <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>
        <CustomFormField
        fieldType={FormFiledType.CHECKBOX}
        control={form.control}
        name="treatmentConsent"
        label="I consent to treatment"
        />
          <CustomFormField
        fieldType={FormFiledType.CHECKBOX}
        control={form.control}
        name="disclosureConsent"
        label="I consent to disclosure information"
        />  
        <CustomFormField
        fieldType={FormFiledType.CHECKBOX}
        control={form.control}
        name="privacyConsent"
        label="I consent to privacy policy"
        />
        <SubmitButton isLoading = {isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm