import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to MediTech Mobile Clinic | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.jpg"}
      />
      <Biography imageUrl={"/about.jpg"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;