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
import { getAppointmentSchema} from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { Doctors } from "@/constants"
import { SelectItem , Select , SelectContent , SelectTrigger } from "../ui/select"
import Image from "next/image"
import { createAppointment } from "@/lib/actions/appointment.actions"
 
export const AppointmentForm = ({userId , patientId , type} :{userId : string ;
    patientId:string; type:"create"|"cancel"|"schedule"
}) => {
    const router = useRouter();
 const [isLoading, setisLoading] = useState(false);
   const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:"",
      schedule: new Date(),
      reason:"",
      note:"",
      cancellationReason:""

    },
  })
 
  // 2. Define a submit handler.
 const onSubmit = async(values: z.infer<typeof AppointmentFormValidation>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true)
   let status;
   switch (type) {
    
    case 'cancel':
        status = 'Cancelled';
        break;
   
        break;
    default:
        status = 'pending'
        break;
   }
   try {
    if(type==='create' && patientId){
        const appointmentData = {
            userId,
            patient : patientId,
            primaryPhysician : values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason : values.reason!,
            note : values.note,
            status: status as Status
        }
        const appointment = await createAppointment(appointmentData);
        if(appointment){
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
    }
   } catch (error) {
    
   }
    setisLoading(false);
  }
  let buttonLabel;
  switch (type) {
    case 'cancel':
        buttonLabel = 'Cancel Appointment';
        break;
    case 'create':
        buttonLabel = 'Create Appointment';
        break;
    case 'schedule':
        buttonLabel = 'Schedule Appointment';
        break;

  
    default:
        break;
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1>New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
        </section>
      {type !== "cancel" &&(
        <>
         <CustomFormField
            fieldType={FormFiledType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
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
          <CustomFormField 
          fieldType={FormFiledType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:mm aa"
          />
          <div className="flex flex-col gap-6 xl:flex-roAppointmentFormValidation">
              <CustomFormField
            fieldType={FormFiledType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for appointment"
            placeholder="Enter reason for appointment"
            />
            <CustomFormField
            fieldType={FormFiledType.TEXTAREA}
            control={form.control}
            name="note"
            label="Notes"
            placeholder="Enter notes"
            />
          </div>
        </>
      )}
{type ==="cancel" && (
    <CustomFormField
            fieldType={FormFiledType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter the reason for cancellation"
            />
)}
        <SubmitButton isLoading = {isLoading} className={`${type==='cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`} >{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm