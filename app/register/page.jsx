import RegisterUserForm from "../components/RegisterUserForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const RegisterPage = () => {
  const session = getServerSession(authOptions);

  if (session) redirect("/");

  return <RegisterUserForm />;
};

export default RegisterPage;
