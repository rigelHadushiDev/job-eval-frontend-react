import axios from "../api/axios";
import useAuth from "./useAuth";
import decodeJwtPayload from "../utils/decodeJwtPayload";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );

    const newAccessToken = response?.data?.accessToken;

    const payload = decodeJwtPayload(newAccessToken);
    console.log("Decoded JWT payload:", payload);
    setAuth((prev) => ({
      ...prev,
      accessToken: newAccessToken,
      role: payload?.role ?? prev.role,
      userId: payload?.userId ?? prev.userId,
      username: payload?.sub ?? prev.username,
    }));

    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
