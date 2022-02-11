import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet } from 'react-router-dom'
import { CoinCard } from '../components';
import { getCoins } from '../api'
import { CoinGekoCoinListResponse } from '../utils'

const checkName = (name: string, str: string) => {
    var pattern = str.split("").map((x) => {
        return `(?=.*${x})`
    }).join(""); var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
}

export function Explore() {

    const [query, setQuery] = useState("");

    const { isLoading, isError, data, error } = useQuery<CoinGekoCoinListResponse[], Error>('coins', getCoins)

    const { data: ping } = useQuery('ping', async () => {
        const req = await axios.get('https://api.coingecko.com/api/v3/ping')
        return req.data
    })

    const filteredArr = data?.filter((x) => {
        var xSub = x.name.substring(0, 3).toLowerCase()
        return x.name.toLowerCase().includes(query) || checkName(xSub, query)
    }) ?? []

    if (isLoading) {

        return <div className="loading">Loading</div>

    }

    if (isError && error) {

        return <span>Error: {error.message}</span>

    }

    return (
        <div>
            <h2>{ping ? ping.gecko_says : 'Loading'}</h2>

            <div>
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for..."
                    value={query}
                    /*
                    // set the value of our useState q
                    //  anytime the user types in the search box
                    */
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex flex-col">
                    {
                        filteredArr.map(coin => {
                            return <Link to={`/explore/${coin.id}`} className="m-8">
                                <CoinCard
                                    symbol={coin.symbol}
                                    current_price={coin.current_price}
                                    price_change_24h={coin.price_change_24h}
                                    price_change_percentage_24h={coin.price_change_percentage_24h}
                                    image={coin.image} />
                            </Link>
                        })
                    }
                </div>
            </div>
            <Outlet />
        </div>
    );
}