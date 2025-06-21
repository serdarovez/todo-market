import axios from "axios";

const baseUrl = `http://o-complex.com:1337/`;

export const getReviews = async () => {
  const res = await axios.get(`${baseUrl}reviews`);
  return res.data;
};

export const getProducts = async (page = 1, page_size = 20) => {
  const res = await axios.get(
    `${baseUrl}products?page=${page}&page_size=${page_size}`
  );
  return res.data;
};

export const postOrder = async (
  phone: string,
  cart: { id: number; quantity: number }[]
) => {
  const res = await axios.post(
    `${baseUrl}order`,
    { phone, cart },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
