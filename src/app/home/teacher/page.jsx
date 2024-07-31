"use client";
import { Container } from "./styles";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import roles from "@/lib/roles";

const HomeTeacher = () => {
  const { user, getAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        router.push("/signin");
        return;
      }
      const authUser = await getAuthUser();
      if (authUser.role !== roles.TEACHER) {
        router.push("/");
      }
    };

    fetchUserRole();
  }, [user]);
  
  return (
    <Container>
      <Header/>
      <h1>HomeTeacher</h1>
    </Container>
  );
};

export default HomeTeacher;
