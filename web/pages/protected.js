import { useContext } from "react";
import { AuthContext } from "@/provider/Authprovider";
import Loading from "./loading";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const Page = () => {
  const { isLoading, currentUser } = useContext(AuthContext);
  const router = useRouter();

  if (isLoading) return <Loading />;

  if (!currentUser.authenticated) {
    router.push("/login");
  }

  return <div>protected page</div>;
};

export default Page;
