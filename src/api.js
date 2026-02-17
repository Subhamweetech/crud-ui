import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api" || "https://crud-api-1.onrender.com/api",
});