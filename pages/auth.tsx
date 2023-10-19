import { NextPage } from "next";
import dynamic from "next/dynamic";

const AuthPage = dynamic(() => import("components/AuthPage/AuthPage"), {
  ssr: false,
});

const Auth: NextPage = () => {
  return <AuthPage></AuthPage>;
};

export default Auth;
