"use client"
import Image from "next/image";

import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { useState } from "react";
export default async function NewAppointment({params :{userId}} : SearchParamProps) {
const patient = await getPatient(userId);
const [open, setopen] = useState(false)
  return (
   <div className="flex h-screen max-h-screen">
    {/* TODO : OTP  */}
   <section className="remove-scrollbar container my-auto">
    <div className="sub-container max-w-[860px] flex-1 justify-between">
      <Image 
      src="/assets/icons/logo-full.svg"
      width={1000}
      height={1000}
      alt="logo"
      className="mb-12 h-10 w-fit"
      />
     < AppointmentForm 
     type="create"
     userId = {userId}
     patientId = {patient.$id}
     
     />
     
        <p className="copyright mt-10 py-12">  © 2025 CarePulse</p>
       
    
    </div>
   </section>
  
   </div>
  );
}
