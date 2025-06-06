import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Shivanshu Pathak",
    position: "Student",
    institute: "MNNIT",
    title: "A Game-Changer for Hostel Issues!",
    review: "FixIt has made it super easy to report and track hostel complaints. No more running around to find the right person – I just log my issue, and authorities respond quickly. The chat feature is also a lifesaver!"
  },
  {
    name: "Saurabh Kumar Singh",
    position: "Student",
    institute: "MNNIT",
    title: "Saves So Much Time",
    review: "I don’t have to visit the hostel office again and again. Just submit a complaint online, and I get notified when it’s resolved. FixIt has made hostel management hassle-free."
  },
  {
    name: "Dr. Naresh Kumar",
    position: "Chief Warden",
    institute: "MNNIT",
    title: "Efficient Complaint Management",
    review: "FixIt has streamlined how we handle student complaints. Instead of tracking issues manually, everything is well-organized on a single platform. It helps us respond faster and maintain transparency."
  },
  {
    name: "Aniket Sharma",
    position: "Student",
    institute: "MNNIT",
    title:  "Finally, No More Ignored Complaints!",
    review: " Before FixIt, many complaints were just ignored or lost in paperwork. Now, there's proper tracking, and the response time has improved a lot. Every hostel should have this!"
  },
  {
    name: "Simran Kaur",
    position: "Student",
    institute: "MNNIT",
    title: "User-Friendly and Efficient",
    review: "The interface is very intuitive, and the response from authorities has improved. I no longer have to wonder if my complaint is being addressed – I get real-time updates!"
  },
  {
    name: "Manish Tiwari",
    position: "Warden",
    institute: "MNNIT",
    title: "Better Accountability and Record Keeping",
    review: "Since every complaint and resolution is recorded in FixIt, there's no scope for miscommunication. Students get timely responses, and we can easily track pending issues. It has made our work so much more manageable!"
  },
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerSlide]);

  const handleDotClick = (index) => {
    setCurrentIndex(index * itemsPerSlide);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide < 0 ? testimonials.length - itemsPerSlide : prevIndex - itemsPerSlide
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % testimonials.length);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start py-10 bg-badami5 gap-7 relative">
      {/* Left Arrow Button */}
      <div className="absolute left-0 xl:left-[7%] top-[40%] transform -translate-y-1/2 bg-black rounded-full z-10 p-4 flex justify-center items-center cursor-pointer"
        onClick={handlePrev}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
      </div>

      <div className="w-full max-w-5xl overflow-hidden px-2 bg-badami5">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full md:w-1/2 px-4 flex-shrink-0">
              <div className="bg-badami2 p-6 min-h-[440px] rounded-lg shadow-md">
                <div className="text-badamidark font-bold text-3xl p-2">{testimonial.title}</div>
                <div className="text-badami5 font-serif mt-2 p-2">{testimonial.review}</div>
                <div className="flex items-center mt-7">
                  <div>
                    <div className="font-bold px-2 text-md">{testimonial.name}</div>
                    <div className="text-badami5 font-serif text-sm px-2">{testimonial.position}, {testimonial.institute}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-0 xl:right-[7%] top-[40%] transform -translate-y-1/2 bg-black rounded-full z-10 p-4 cursor-pointer"
        onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>            
      </div>

      {/* Dots Navigation */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((dotIndex) => (
          <span key={dotIndex} className={`h-3 w-3 rounded-full cursor-pointer ${currentIndex / itemsPerSlide === dotIndex ? "bg-btnblue" : "bg-gray-100"}`}
           onClick={() => handleDotClick(dotIndex)}>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;