import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { getCoinByID, getCoinChartData } from "../api";
import { CoinGekoCoinChartData, CoinGekoCoinResponse, ITimeInterval } from "../utils";
import { useState } from "react";
import { Loading } from "./Loading";
import { Tabs } from ".";

const timeIntervals: ITimeInterval[] = [
    {
        label: '1D',
        interval: '1'
    },
    {
        label: '1W',
        interval: '7'
    },
    {
        label: '1M',
        interval: '30'
    },
    {
        label: '3M',
        interval: '90'
    },
    {
        label: '6M',
        interval: '120'
    },
    {
        label: '1Y',
        interval: '365'
    },
]

export function CoinDisplay() {

    const params = useParams();
    const coinId = params.coinId ?? '';

    const [timeInterval, setTimeInterval] = useState('1');

    const { isLoading, isError, data, error } = useQuery<CoinGekoCoinResponse, Error>(['coin', coinId], () => getCoinByID(coinId), { enabled: !!coinId, })

    const { isLoading: chartIsLoading, data: chartData } = useQuery<CoinGekoCoinChartData, Error>(['coinChartData', timeInterval], () => getCoinChartData(coinId, timeInterval), { enabled: !!coinId, })

    const options: Highcharts.Options = {
        title: {
            text: `${data?.name} to USD Chart`
        },
        series: [
            {
                type: 'line',
                name: 'Price',
                data: chartData?.prices ?? []
            },/* 
            {
                type: 'line',
                name: 'Market Cap',
                data: chartData?.market_caps
            },
            {
                type: 'line',
                name: 'Total Volume',
                data: chartData?.total_volumes
            }, */
        ],
        xAxis: {
            type: 'datetime',
        }
    };

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("🚀 ~ file: CoinDisplay.tsx ~ line 77 ~ radioHandler ~ event", event.target.value)
        setTimeInterval(event.target.value);
    };

    if (isLoading) {

        return <div className="flex justify-center mt-48">
            <Loading />
        </div>

    }



    if (isError && error) {

        return <span>Error: {error.message}</span>

    }

    if (data) {
        return (
            <div className="bg-white rounded-3xl border shadow-xl p-8 m-16">
                <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r rounded-full">
                        <img src={data?.image.small} alt={`${data?.symbol}`} />
                    </div>
                    <span className="pl-4 flex items-center text-xl font-bold">{data?.name}</span>
                </div>

                <div className="flex p-4">
                    <div className="pr-4">Price</div>
                    <div>${data?.market_data.current_price.usd}</div>
                </div>

                <div className="p-4">
                    <span className="pr-4">Price change</span>
                    <span className={`font-bold text-${data?.market_data.price_change_24h > 0 ? 'green' : 'red'}-400`}>${data?.market_data.price_change_24h.toFixed(2)} ({data?.market_data.price_change_percentage_24h.toFixed(2)}%)</span>
                </div>

                <div className="p-4">
                    <div className="low">24h low: ${data?.market_data.low_24h.usd}</div>
                    <div className="low">24h high: ${data?.market_data.high_24h.usd}</div>
                </div>

                <div className="p-4" dangerouslySetInnerHTML={{ __html: data?.description.en ?? '' }}></div>

                {chartIsLoading ? <div className="flex justify-center mt-24">
                    <Loading />
                </div> : <div className="chart">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>}
                <Tabs intervals={timeIntervals} onChange={radioHandler} />
                <br />
                <Link to="/explore">
                    <div className="flex flex-row align-middle">
                        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                        </svg>
                        <p className="ml-2">Back</p>
                    </div>
                </Link>


            </div>
        );
    }

    return null;
}