import { useQuery, useQueryClient } from 'react-query';
import { getCoins } from './api'
import { CoinGekoCoinListResponse } from './utils'
import './App.css';
import axios from 'axios';

function App() {

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery<CoinGekoCoinListResponse[], Error>('coins', getCoins)

  const {data: ping, isLoading: pingIsLoading, isError: pingError} = useQuery('ping', async () => {
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
    <div className="App">
      <h2>{ping.gecko_says}</h2>

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

export default App;
