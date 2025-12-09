import React from "react";
import { toast } from "react-toastify";

export const errorMessage = (message) => {
  toast.error(message, { position: "top-center", autoClose: 3000 });
};

export const successMessage = (message) => {
  toast.success(message, { position: "bottom-center", autoClose: 1500 });
};
