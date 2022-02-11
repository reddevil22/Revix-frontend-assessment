interface ICoinCard {
    symbol: string;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    image: string
}

export function CoinCard({ symbol, current_price, price_change_24h, price_change_percentage_24h, image }: ICoinCard) {
    return (
        <div className="bg-white rounded-3xl border shadow-xl p-8">
            <div className="flex justify-between items-center mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r rounded-full">
                    <img src={image} alt={`${symbol}`} />
                </div>
                <div className={`font-bold text-${price_change_24h > 0 ? 'green' : 'red'}-400`}>
                    <span>${price_change_24h.toFixed(2)} ({price_change_percentage_24h.toFixed(2)}%)</span><br />
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-sm text-gray-400">{symbol}</h3>
                <h1 className="font-semibold text-xl text-gray-700">${current_price}</h1>
            </div>
        </div>
    );
}