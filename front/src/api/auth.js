// eslint-disable-next-line no-unused-vars
import { LOGIN_URL, ME_URL } from "@/api/endpoints";
import api from "@/api/api";

export const authService = {
  token: "",
  // eslint-disable-next-line no-unused-vars
  async login(data) {
    // const authRes = await api.post(LOGIN_URL, data);
    const authRes = { token: "xxx-token-xxx" };
    const token = authRes.token;
    api.setToken(token);
    return authRes;
  },
  async me(token) {
    if (!token) {
      throw new Error("not set token in authService.me()");
    }
    return await api.get(ME_URL, { token });
  },
};
