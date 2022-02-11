import axios from "axios";
import { API_URL } from "../utils";

export async function getCoins() {
    const data = await axios.get(`https://${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);

    return data.data/* .slice(0, 10) */;
}

export async function getCoinByID(id: string) {
    const data = await axios.get(`https://${API_URL}/coins/${id}`);

    return data.data;
}

export async function getCoinChartData(id: string, timeInterval: string) {
    const data = await axios.get(`https://${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${timeInterval}`);

    return data.data;
}