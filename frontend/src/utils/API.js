import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api", //NOT SURE WHAT OUR BASEURL IS
  responseType: "json",
});
