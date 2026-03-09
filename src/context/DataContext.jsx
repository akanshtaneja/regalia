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
      // const res = await axios.get("http://localhost:10000/api/data");
      // const res = await axios.get("https://regalia-production-1618.up.railway.app/api/data");
      const res = await axios.get("https://regalia-backend-cibz.onrender.com/api/data");
      

      // console.log(res);
      const productsData = res.data;
      setData(productsData);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
  fetchAllProducts();
}, []);


 const getUniqueCategory = (data=[], property) => {
  let newVal = data?.flatMap((item) => {
    const value = item[property];
    return Array.isArray(value) ? value : [value];
  });

  newVal = ["All", ...new Set(newVal)];

  return newVal;
};

  const categoryOnlyData = getUniqueCategory(data, "category");



 const getUniqueMetalType = (data = []) => {
  return [...new Set(data.map(item => item.metalType))];
};

const metalTypes = getUniqueMetalType(data);


const getUniqueGoldKt  = (data = []) => {
  return [...new Set(data.map(item => item.goldKt))];
};

const goldKt = getUniqueGoldKt(data);


const getUniquePlatingTone  = (data = []) => {
  return [...new Set(data.map(item => item.platingTone))];
};
 
const platingTone = getUniquePlatingTone(data);

  
  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData, metalTypes, goldKt, platingTone}}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
