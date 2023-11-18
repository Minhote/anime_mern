import axios, { AxiosResponse, isAxiosError } from "axios";

export default async function fetchAnime(url: string, text: string) {
  try {
    const { data }: AxiosResponse = await axios.get(`${url}${text}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
}
