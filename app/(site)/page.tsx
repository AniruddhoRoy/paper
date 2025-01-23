import Image from "next/image"
import { AuthForm } from "./components/AuthForm";

export default function Home() {
  return (
   <div className="flex min-h-full justify-center flex-col sm:flex-row py-12 2xl:flex-col sm:px-6 lg:px-8 bg-gray-100">
    <div className="flex justify-center items-center flex-col sm:mx-auto sm:w-full sm:max-w-md">
      <Image src="/Images/logo.png" alt="Logo" height="90" width="90" className="mx-auto w-auto"/>
      <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">Welcome To Paper</h2>
    </div>
    <AuthForm/>
   </div>
  );
}
