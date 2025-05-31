import React, { useRef } from "react";
import Hero from "../components/Hero";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import Services from "../components/Services";
import Culture from "../components/Culture";
import Jobs from "../components/Jobs";
import Footer from "../components/Footer";

const HomePage = () => {
  const cultureRef = useRef(null);

  const handleLearnMore = () => {
    cultureRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-20">
      <Hero onLearnMore={handleLearnMore} />
      <Services ref={cultureRef} />
      <Culture />
      <Jobs isHome={true} />
      <Footer />
    </div>
  );
};

export default HomePage;
