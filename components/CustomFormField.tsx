"use client"
import React from 'react'
import { E164Number } from "libphonenumber-js/core";

import { Control} from "react-hook-form"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
 
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFiledType } from './forms/PatientForm'
import Image from 'next/image'
import { Select } from './ui/select';
import { SelectContent, SelectTrigger, SelectValue } from './ui/select';

import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
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
  switch (props.fieldType) {
    case FormFiledType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {props.iconSrc && (
          <Image  
          src={props.iconSrc}
          alt= {props.iconAlt || 'icon'}
          height={24}
          width={24}
          className='ml-2'
          />
        )}
        <FormControl>
          <Input
          placeholder={props.placeholder}
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
          placeholder ={props.placeholder}
          international
          withCountryCallingCode
          value ={field.value as E164Number | undefined}
          onChange={field.onChange}
          className='input-phone'
          />
        )
      case FormFiledType.DATE_PICKER:
        return(
          <div className='flex rounded-md border border-dark-500 bg-dark-400'>
            <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt='calendars'
            className='ml-2 '
            />
            <FormControl>
               <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} 
                dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                showTimeSelect={props.showTimeSelect ?? false}
                timeInputLabel='Time:'
                wrapperClassName='date-picker'
                />
            </FormControl>
          </div>
        )
        case FormFiledType.SKELETON:
          return(
           props.renderSkeleton ? props.renderSkeleton(field) :null
          )
        case FormFiledType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
      case FormFiledType.TEXTAREA:
        return(
          <FormControl>
           <Textarea placeholder={props.placeholder} {...field} className='shad-textArea' disabled={props.disabled}/>
          </FormControl>
        )
    case FormFiledType.CHECKBOX:
      return(
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            />
            <Label htmlFor={props.name} className='checkbox-label'>{props.label}</Label>
          </div>
        </FormControl>
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