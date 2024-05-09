import axios from "axios";

const BASE_URL = "https://localhost:44308/api/VozaciLinije";

const getVozaciLinije = async (brojLinije, danVoznje) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?brojLinije=${brojLinije}&danVoznje=${danVoznje}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getVozaciLinije };
