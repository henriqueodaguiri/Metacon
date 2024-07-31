"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import roles from "@/lib/roles";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { user, getAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        router.push("/signin");
        return;
      }
      const authUser = await getAuthUser();
      if (authUser.role === roles.TEACHER) {
        router.push("/home/teacher");
      } else {
        router.push("/home/student");
      }
    };

    fetchUserRole();
  }, [user]);

  return (
    <>
      <Spinner/>
    </>
  );
}