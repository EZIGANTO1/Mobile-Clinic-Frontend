import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | MediTech Mobile Clinic"}
        imageUrl={"/about.jpg"}
      />
      <Biography imageUrl={"/whoweare.jpg"} />
    </>
  );
};

export default AboutUs;