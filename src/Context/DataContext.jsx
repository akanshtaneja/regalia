import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // fetching all products from api
  const fetchAllProducts = async () => {
    try {
      // const res = await axios.get('https://api.escuelajs.co/api/v1/products')
      // const res = await axios.get("https://fakestoreapi.com/products");
      const res = await axios.get("http://localhost:3001/data");
      console.log(res);
      const productsData = res.data;
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchAllProducts();
}, []);


 const getUniqueCategory = (data, property) => {
  let newVal = data?.flatMap((item) => {
    const value = item[property];
    return Array.isArray(value) ? value : [value];
  });

  newVal = ["All", ...new Set(newVal)];

  return newVal;
};

  const categoryOnlyData = getUniqueCategory(data, "category");
  
  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
