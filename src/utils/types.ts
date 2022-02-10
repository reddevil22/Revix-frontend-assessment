export interface CoinGekoCoinListResponse {
    id: string;
    symbol: string;
    name: string;
}

export interface CoinGekoCoinResponse extends CoinGekoCoinListResponse {
    asset_platform_id: string,
    platforms: {},
    block_time_in_minutes: number,
    hashing_algorithm: string,
    categories: string[],
    public_notice: null,
    additional_notices: [],
    localization: {
        en: string,
        de: string,
        es: string,
        fr: string,
        it: string,
        pl: string,
        ro: string,
        hu: string,
        nl: string,
        pt: string,
        sv: string,
        vi: string,
        tr: string,
        ru: string,
        ja: string,
        zh: string,
        "zh-tw": string,
        ko: string,
        ar: string,
        th: string,
        id: string
    },
    description: {
        en: string,
        de: string,
        es: string,
        fr: string,
        it: string,
        pl: string,
        ro: string,
        hu: string,
        nl: string,
        pt: string,
        sv: string,
        vi: string,
        tr: string,
        ru: string,
        ja: string,
        zh: string,
        "zh-tw": string,
        ko: string,
        ar: string,
        th: string,
        id: string
    },
    links: {
        homepage: string[],
        blockchain_site: string[],
        official_forum_url: string[],
        chat_url: string[],
        announcement_url: string[],
        twitter_screen_name: string,
        facebook_username: string,
        bitcointalk_thread_identifier: null,
        telegram_channel_identifier: string,
        subreddit_url: string,
        repos_url: {
            github: string[],
            bitbucket: string[]
        }
    },
    image: {
        thumb: string,
        small: string,
        large: string
    },
    country_origin: "",
    genesis_date: string,
    sentiment_votes_up_percentage: number,
    sentiment_votes_down_percentage: number,
    market_cap_rank: number,
    coingecko_rank: number,
    coingecko_score: number,
    developer_score: number,
    community_score: number,
    liquidity_score: number,
    public_interest_score: number,
    market_data: {
        current_price: {
            [key: string]: number,
        },
        market_cap: {
            [key: string]: number,
        },
        fully_diluted_valuation: {
            [key: string]: number,
        },
        total_volume: {
            [key: string]: number,
        },
        high_24h: {
            [key: string]: number,
        },
        low_24h: {
            [key: string]: number,
        },
        price_change_24h: number,
        price_change_percentage_24h: number,
        price_change_percentage_7d: number,
        price_change_percentage_14d: number,
        price_change_percentage_30d: number,
        price_change_percentage_60d: number,
        price_change_percentage_200d: number,
        price_change_percentage_1y: number,
        market_cap_change_24h: number,
        market_cap_change_percentage_24h: number,
        total_supply: number,
        max_supply: number,
        circulating_supply: number,
        last_updated: string
    }
}

export interface CoinGekoCoinChartData {
    market_caps: [number, number][],
    prices: [number, number][],
    total_volumes: [number, number][],
}