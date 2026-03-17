import API from "./axios";

type AuthPayload = {
  email: string;
  password: string;
  adminKey?: string;
};

type AuthResponse = {
  token?: string;
  message?: string;
};

export const loginUser = async (data: AuthPayload): Promise<AuthResponse> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (
  data: AuthPayload
): Promise<AuthResponse> => {
  const response = await API.post("/auth/register", data);
  return response.data;
};
