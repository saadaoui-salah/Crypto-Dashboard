import { useEffect, useState } from 'react'

let pairs = ["BTC-USD", "BCH-USD", "LINK-USD", "ETH-USD", "DASH-USD", "LTC-USD", "XTZ-USD"]

export const useGetCoinbasePrices = (done, ws, pair, setVolume, setPrice) => {
    const [BTC, setBTC] = useState('0')
    const [BCH, setBCH] = useState('0')
    const [LINK, setLINK] = useState('0')
    const [ETH, setETH] = useState('0')
    const [DASH, setDASH] = useState('0')
    const [LTC, setLTC] = useState('0')
    const [XTZ, setXTZ] = useState('0')

    const updatePair = (data, currency, setCurrency) => {
        if (data.product_id === currency) {
            setCurrency(data.price)
        }
    }

    useEffect(() => {
        if (!done && ws == undefined) {
            return;
        }

        let msg = {
            type: "subscribe",
            product_ids: pairs,
            channels: ["ticker"]
        };

        let jsonMsg = JSON.stringify(msg);
        ws.current.onopen = () => ws.current.send(jsonMsg);

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data.type !== "ticker") {
                return;
            }
            if (data.product_id === pair){
                setVolume(data.volume_24h)
                setPrice(data.price)
            }
            updatePair(data, "BTC-USD", setBTC)
            updatePair(data, "BCH-USD", setBCH)
            updatePair(data, "LINK-USD", setLINK)
            updatePair(data, "ETH-USD", setETH)
            updatePair(data, "DASH-USD", setDASH)
            updatePair(data, "LTC-USD", setLTC)
            updatePair(data, "XTZ-USD", setXTZ)
        };
    }, [done]);
    return { BTC, BCH, LINK, ETH, DASH, LTC, XTZ }
}