const api = {
  token: localStorage.token,
  headers: {},
  setToken(token) {
    if (!token) return;
    this.token = token;
    localStorage.token = token;
    this.headers.Authorization = token;
  },
  deleteToken() {
    this.token = "";
    localStorage.removeItem("token");
    delete this.headers.Authorization;
  },
  async get(endpoint, params = {}) {
    const paramString = Object.entries(params)
      .map((param) => {
        return param[0] + "=" + param[1];
      })
      .join("&");
    const resultString = paramString ? "?" + paramString : "";
    const url = endpoint + resultString;
    return await fetch(url, {
      headers: this.headers,
    }).then((res) => res.json());
  },
  async post(endpoint, data = {}) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};
const token = localStorage.token;
api.setToken(token);
export default api;
