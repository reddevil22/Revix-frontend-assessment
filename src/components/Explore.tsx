import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet } from 'react-router-dom'
import { CoinCard } from '../components';
import { getCoins } from '../api'
import { CoinGekoCoinListResponse } from '../utils'
import { Loading } from './Loading';

const checkName = (name: string, str: string) => {
    var pattern = str.split("").map((x) => {
        return `(?=.*${x})`
    }).join(""); var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
}

export function Explore() {

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1)

    const { isLoading, isError, data, error, isPreviousData } = useQuery<CoinGekoCoinListResponse[], Error>(['coins', page], () => getCoins(page))

    const { data: ping } = useQuery('ping', async () => {
        const req = await axios.get('https://api.coingecko.com/api/v3/ping')
        return req.data
    })

    const filteredArr = data?.filter((x) => {
        var xSub = x.name.substring(0, 3).toLowerCase()
        return x.name.toLowerCase().includes(query) || checkName(xSub, query)
    }) ?? []

    return (
        <div className="w-5/6 m-0 m-auto">
            <h2>{ping ? `Server Status: ${ping.gecko_says}` : 'Loading'}</h2>

            <div>
                <div className="flex relative mx-auto w-1/4 max-w-md">
                    <input
                        className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
                        type="search"
                        name="search-form"
                        id="search-form"
                        placeholder="Search for coin"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="absolute right-2 top-3 mr-4">
                        <svg className="text-black h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
                {!isLoading && <>
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
                    <div className="flex flex-row justify-center">
                        {page !== 1 && <button
                            type="button"
                            className="bg-blue-400 text-black rounded-l-md border-r border-gray-100 py-2 hover:bg-sky-500 hover:text-white px-3"
                            onClick={() => setPage(old => Math.max(old - 1, 0))}>
                            <div className="flex flex-row align-middle">
                                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                                </svg>
                                <p className="ml-2">Previous Page</p>
                            </div>
                        </button>}
                        <button
                            type="button"
                            className="bg-blue-400 text-black rounded-r-md py-2 border-l border-gray-200 hover:bg-sky-500 hover:text-white px-3"
                            onClick={() => {
                                if (!isPreviousData && (data?.length ?? []) > 0) {
                                    setPage(old => old + 1)
                                }
                            }}
                            disabled={isPreviousData || !((data?.length ?? []) > 0)}>
                            <div className="flex flex-row align-middle">
                                <span className="mr-2">Next Page</span>
                                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </>}
            </div>
            {isLoading && <div className="flex justify-center mt-48">
                <Loading />
            </div>}
            <Outlet />
        </div>
    );
}