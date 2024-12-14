import Image from "next/image";
import { Button  } from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
export default function Home() {
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
      <PatientForm/>
      <div className="text-14-regular mt-20 flex justify-between">
        <p className="justify-items-end text-dark-600 xl:text-left">  © 2025 CarePulse</p>
        <Link
        href="/?admin=true" 
        className="text-green-500" 
         >Admin</Link>
      </div>
    
    </div>
   </section>
   <Image
   src="/assets/images/onboarding-img.png"
   height={1000}
   width={1000}
   alt=""
   className="side-img max-w-[50%]"
   />
   </div>
  );
}
