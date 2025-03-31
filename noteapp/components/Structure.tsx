import { Faq } from "@/components/Faq";
import { Cards } from "../components/Cards";
import { Hero } from "../components/Hero";
import { MidSection } from "../components/MidSection";
import { Slider } from "@/components/Slider";
import React from 'react';

export function Structure(){
    return(
            <>
                <Hero />
                <MidSection />
                <Cards />
                <p className="text-3xl w-[50%] text-center mx-auto my-[50px] sm:my-[70px]">FAQ</p>
                <Faq />
                <Slider />
            </>
    )
}