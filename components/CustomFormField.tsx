"use client"
import React from 'react'
import { E164Number } from "libphonenumber-js/core";
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
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
import { FormFiledType } from './forms/PatientForm'
import Image from 'next/image'
interface CustomProps{
  control : Control<any>,
  fieldType : FormFiledType
  name : string,
  label?: string
  placeholder?: string,
  iconSrc?: string,
  iconAlt?:string,
   disabled?:boolean,
   dateFormat?:string,
  showTimeSelect?:boolean,
  children?:React.ReactNode,
  renderSkeleton?: (field : any) => React.ReactNode
}
const RenderField = ({field , props} :{field : any;          props:CustomProps}) =>{
  const {fieldType , iconSrc , iconAlt , placeholder} = props
  switch (props.fieldType) {
    case FormFiledType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
          <Image  
          src={iconSrc}
          alt= {iconAlt || 'icon'}
          height={24}
          width={24}
          className='ml-2'
          />
        )}
        <FormControl>
          <Input
          placeholder={placeholder}
          {...field}
          className='shad-input border-0'
          />
        </FormControl>
      
        </div>
      )
      case FormFiledType.PHONE_INPUT:
        return (
          <PhoneInput 
          defaultCountry='IN'
          placeholder ={placeholder}
          international
          withCountryCallingCode
          value ={field.value as E164Number | undefined}
          onChange={field.onChange}
          className='input-phone'
          />
        )
    default:
      break;
  }
}
const CustomFormField = (props:CustomProps) => {
  const {control , fieldType , name , label } = props
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
              {fieldType !== FormFiledType.CHECKBOX && label &&(
                <FormLabel>{label}</FormLabel>
              )}
              <RenderField  field={field}  props = {props}/>
              <FormMessage className='shad-error' />
            </FormItem>
          )}
        />
  )
}

export default CustomFormField