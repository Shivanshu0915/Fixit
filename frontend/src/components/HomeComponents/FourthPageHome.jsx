import TestimonialsSlider from "./Testimonials";

export function Testimonials(){
    return(
        <div id="testimonials" className='w-full h-auto bg-badami5 p-6 pb-10'>
            <div className='text-badami2 font-bold text-4xl md:text-5xl py-10 flex justify-center'>
                Testimonials
            </div>
            <TestimonialsSlider></TestimonialsSlider>
        </div>
    )
}