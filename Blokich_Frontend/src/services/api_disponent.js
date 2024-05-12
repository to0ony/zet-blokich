import axios from "axios";

const BASE_URL = "https://localhost:44308/api/Disponent";

const getVozac = async (brojVozaca) => {
  try {
    const response = await axios.get(`${BASE_URL}?brojVozac=${brojVozaca}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getVozac };
