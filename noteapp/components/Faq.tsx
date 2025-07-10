
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
   
  export function Faq() {
    return (
        
      <Accordion type="single" collapsible className=" shadow-2xl w-[95%] sm:max-w-[85%] md:w-[65%] mx-auto  rounded-[20px] px-4 py-5">
        <AccordionItem value="item-1">
          <AccordionTrigger  className=" text-md pl-4 sm:pl-4 md:text-[19px] hover:no-underline hover:text-green-300 lg:pl-7 hover:scale-x-95 transition-all duration-500">NoteVault Is Free Or Not?</AccordionTrigger>
          <AccordionContent className="md:text-lg pl-6 lg:pl-9">
            -Yes. It Is absolutly Free .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-md pl-4 sm:pl-4 md:text-[19px] hover:no-underline hover:text-green-300 lg:pl-7 hover:scale-x-95 transition-all duration-500">Is Is secure?</AccordionTrigger>
          <AccordionContent className="md:text-lg pl-6 lg:pl-9">
            -Yes. it is secure and your data is protected by NoteVault
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className=" text-md pl-4 sm:pl-4 md:text-[19px] hover:no-underline hover:text-green-300 lg:pl-7 hover:scale-x-95 transition-all duration-500">Can i share with friends ?</AccordionTrigger>
          <AccordionContent className="md:text-lg pl-6 lg:pl-9">
            -Yes u can, share the link.  
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }