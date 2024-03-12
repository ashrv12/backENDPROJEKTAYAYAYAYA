import { useContext } from "react";
import { AuthContext } from "@/provider/Authprovider";
import Loading from "./loading";
import { useRouter } from "next/router";

const Page = () => {
  const { isLoading, currentUser } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  return <div>protected page</div>;
};

export default Page;
