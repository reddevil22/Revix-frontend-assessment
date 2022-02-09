import axios from "axios";
import { useQuery } from "react-query";
import { getCoins } from "../api";
import { CoinGekoCoinListResponse } from "../utils";

export function Home() {

    const { isLoading, isError, data, error } = useQuery<CoinGekoCoinListResponse[], Error>('coins', getCoins)

    const { data: ping, isLoading: pingIsLoading, isError: pingError } = useQuery('ping', async () => {
        const req = await axios.get('https://api.coingecko.com/api/v3/ping')
        return req.data
    })

    if (isLoading) {

        return <span>Loading...</span>
    
      }
    
    
    
      if (isError && error) {
    
        return <span>Error: {error.message}</span>
    
      }

    return (
        <div>
            <h2>{ping ? ping.gecko_says : 'Loading'}</h2>

            <div>
                <ul>
                    {
                        data && data.map(coin => {
                            return <li key={coin.id}>{coin.name}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}