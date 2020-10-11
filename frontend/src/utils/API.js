import axios from "axios";

export default axios.create({
  baseURL: "https://randomuser.me/api/", //NOT SURE WHAT OUR BASEURL IS
  responseType: "json",
});
