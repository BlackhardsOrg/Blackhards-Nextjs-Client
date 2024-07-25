import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useRouter().push;

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  return user;
};

export default useAuth;
