import bitcoin from '../images/bitcoin.png';
import bitcoinCash from '../images/bitcoin_cash.png';
import chainlink from '../images/chainlink.png';
import eth from '../images/eth.png';
import litecoin from '../images/litecoin.png';
import tezos from '../images/tezos.jfif';
import dash from '../images/dash.png';
import { Box, useMediaQuery } from '@mui/material';
import { memo } from 'react'


export const Courency = memo(({ setOpen, setpair, image, name, short, price, percentage }) => {
    const mobile = useMediaQuery('(max-width: 890px)')
    const updatePair = () => {
        setpair(`${short}-USDT`)
        if (mobile) {
            setOpen(true)
        }
    }
    return (
        <Box onClick={() => updatePair()} sx={{
            '&:hover': { backgroundColor: '#000' }, cursor: 'pointer',
            width: '95%', height: '45px', padding: '20px 0px 20px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ marginRight: '20px', borderRadius: '100%', backgroundColor: '#fff', width: '40px', height: '40px' }} src={image} />
                <div>
                    <p style={{ marginBottom: '-10px', color: 'gray' }}>{name}</p>
                    <p style={{ color: 'gray' }}>{short}</p>
                </div>
            </div>
            <div>
                <p style={{ marginBottom: '-10px', color: 'gray' }}>{price}$</p>
                <p style={{ color: percentage > 0 ? 'green' : 'red' }}>{percentage}</p>
            </div>
        </Box>
    )
})

export const Currencies = memo(({ setOpen, setpair, BTC, BCH, LINK, ETH, DASH, LTC, XTZ }) => {
    return (
        <>
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={bitcoin}
                name="Bitcoin"
                short="BTC"
                percentage="20%"
                price={BTC} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={bitcoinCash}
                name="Bitcoin Cash"
                short="BCH"
                percentage="20%"
                price={BCH} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={chainlink}
                name="Chainlink"
                short="LINK"
                percentage="20%"
                price={LINK} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={eth}
                name="Ethereum"
                short="ETH"
                percentage="20%"
                price={ETH} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={dash}
                name="Dsh"
                short="DASH"
                percentage="20%"
                price={DASH} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={litecoin}
                name="Litecoin"
                short="LTC"
                percentage="20%"
                price={LTC} />
            <Courency
                setpair={setpair}
                setOpen={setOpen}
                image={tezos}
                name="Tezos"
                short="XTZ"
                percentage="20%"
                price={XTZ} />
        </>
    )
})