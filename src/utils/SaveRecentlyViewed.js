export const SaveRecentlyViewed = (product) => {
  if (!product?.id) {
    return;
  }

  let list = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  list = list.filter((item) => item.id !== product.id);

  list.unshift(product);

  localStorage.setItem("recentlyViewed", JSON.stringify(list));
};

export const GetRecentlyViewed = () => {
  const data = localStorage.getItem("recentlyViewed");

  if (!data || data === "undefined") {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};
