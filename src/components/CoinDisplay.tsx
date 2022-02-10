import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { getCoinByID, getCoinChartData } from "../api";
import { CoinGekoCoinChartData, CoinGekoCoinResponse } from "../utils";
import { useState } from "react";

interface ITimeInterval {
    label: string,
    interval: string,
}

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

    const { isLoading: chartIsLoading, isError: chartisError, data: chartData, error: chartError } = useQuery<CoinGekoCoinChartData, Error>(['coinChartData', timeInterval], () => getCoinChartData(coinId, timeInterval), { enabled: !!coinId, })

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

    if (isLoading) {

        return <div className="loading">Loading</div>

    }



    if (isError && error) {

        return <span>Error: {error.message}</span>

    }

    return (
        <div className="coin-page">
            <div className="name">
                <h3>{data?.name}</h3>
            </div>

            <div className="price">
                <h4>${data?.market_data.current_price.usd}</h4>
            </div>

            <div className="percent_change">
                <h6>{data?.market_data.price_change_percentage_24h}</h6>
            </div>

            <div className="low_high">
                <div className="low">24h low: {data?.market_data.low_24h.usd}</div>
                <div className="low">24h high: {data?.market_data.high_24h.usd}</div>
            </div>

            <div className="description" dangerouslySetInnerHTML={{ __html: data?.description.en ?? '' }}></div>

            <div className="intervalbuttons">
                {
                    timeIntervals.map(time => {
                        return <button onClick={() => setTimeInterval(time.interval)}>{time.label}</button>
                    })
                }
            </div>
            {chartIsLoading ? <div className="loading">Loading</div> : <div className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>}
            <Link to="/explore"><button>Back</button></Link>
        </div>
    );
}