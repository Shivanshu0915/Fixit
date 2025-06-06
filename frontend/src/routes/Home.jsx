import React, { useRef } from 'react';

import { HomeNavbar } from '../components/HomeComponents/HomeNavbar';
import { MidContent } from '../components/HomeComponents/FirstPageHome';
import { SecondPage } from '../components/HomeComponents/SecondPageHome';
import { ThirdPage } from '../components/HomeComponents/ThirdPageHome';
import { Testimonials } from '../components/HomeComponents/FourthPageHome';
import { Footer } from '../components/HomeComponents/FooterHome';

const Home = ()=>{
    return (
        <>
            <HomeNavbar></HomeNavbar>
            <MidContent></MidContent>
            <SecondPage></SecondPage>
            <ThirdPage></ThirdPage>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </>
    )
}
export default Home;