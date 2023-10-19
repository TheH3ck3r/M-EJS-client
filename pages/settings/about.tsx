import dynamic from "next/dynamic";
const About = dynamic(() => import("components/Settings/About"), {
  ssr: false,
});

const AboutPage = () => {
  return <About></About>;
};

export default AboutPage;
