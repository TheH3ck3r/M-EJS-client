import type { NextPage } from "next";
import dynamic from "next/dynamic";
const IndexPage = dynamic(() => import("../components/Journal"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <IndexPage></IndexPage>;
};

export default Home;
