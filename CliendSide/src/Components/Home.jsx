import React from "react";

import { Hero } from "./Home/Hero/Hero";
import { Mission } from "./Home/Mission/Mission";
import { Departments } from "./Home/Departments/Departments";
import { HowItWorks } from "./Home/HowItWorks/HowItWorks";
import { Services } from "./Home/Services/Services";
import { LatestIssues } from "./Home/LatestIssues/LatestIssues";
import { ContactSection } from "./ContactSection";

export const Home = () => {
  return (
    <>
      <Hero />

      <Mission />

      <Departments />

      <HowItWorks />

      <Services />

      <LatestIssues />

      <ContactSection />
    </>
  );
};

export default Home;