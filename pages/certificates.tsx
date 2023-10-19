import { NextPage } from "next";
import dynamic from "next/dynamic";
const CertificatesPage = dynamic(
  () => import("../components/CertificatesPage"),
  {
    ssr: false,
  }
);

const Certificates: NextPage = () => {
  return <CertificatesPage></CertificatesPage>;
};

export default Certificates;
