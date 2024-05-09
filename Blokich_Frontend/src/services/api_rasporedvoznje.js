import axios from "axios";

const BASE_URL = "https://localhost:44308/api/RasporedVoznje";

const getRasporedVoznje = async (brojVozaca) => {
  try {
    const response = await axios.get(`${BASE_URL}?brojVozaca=${brojVozaca}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getRasporedVoznje };
