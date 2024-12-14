"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Appointment } from '@/types/appwrite.types';
import AppointmentForm from './forms/AppointmentForm';

const AppointmentModel = ({type , patientId , userId , appointment}:{
    type : 'schedule'|'cancel',
    patientId:string,
    userId:string
    appointment?:Appointment
}) => {
    const [open, setOpen] = useState(false);
  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button
    variant="ghost" className={`capitalize ${type==='schedule'&&'text-green-500'}`}>
        {type}
    </Button>
  </DialogTrigger>
  <DialogContent className='shad-dialog sm:max-w-md'>
    <DialogHeader className='mb-4 space-y-3'>
      <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
      <DialogDescription>
       Please fill in the following details to {type} an appointment
      </DialogDescription>
    </DialogHeader>
    <AppointmentForm 
    userId={userId}
    patientId={patientId}
    type={type}
    appointment={appointment}
    setOpen={setOpen}
    />
  </DialogContent>
</Dialog>

  )
}

export default AppointmentModel