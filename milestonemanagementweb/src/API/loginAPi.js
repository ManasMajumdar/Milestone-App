import { myAxios } from "./helper";


export const loginUser = async (loginDetail) => {
  const response = await myAxios.post('/api/auth', loginDetail);
  return response.data;
}
