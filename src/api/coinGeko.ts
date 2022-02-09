import axios from "axios";
import { API_URL } from "../utils";

export async function getCoins() {
    const data = await axios.get(`https://${API_URL}/coins/list?include_platform=false`);

    return data.data/* .slice(0, 10) */;
}