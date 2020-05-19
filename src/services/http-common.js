import axios from "axios";
import { api_base_url } from '../keys/index';
export default axios.create({
    api_base_url
});