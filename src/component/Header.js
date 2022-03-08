import { useMediaQuery } from '@mui/material/';


export const Header = ({ price, volume, pair, platform }) => {
    const mobile = useMediaQuery('(max-width: 890px)')
    let logoUrl;
    if (platform === 'coinbase'){
        logoUrl = ''
    }
    if (platform === 'kraken'){
        logoUrl = 'https://docs.kraken.com/rest/kraken_logo_w.png'
    }
    if (platform === 'binance'){
        logoUrl = ''
    }
    
    if (mobile) {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', height: '9vh'}}>
                    <img src={logoUrl}/>
                    <div style={{fontSize: '35px', color: 'white'}}>X</div>
                </div>
                <div style={{ display: 'flex', height: '10vh', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{marginTop: '50px' ,color:'white', fontSize: '35px' }}>
                        {pair.replace('-', '/')}
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <div style={{ color: 'gray' }}>24h Haut</div>
                        <div style={{ color: 'white', fontSize: '20px' }}>42.654564</div>
                    </div>
                    <div style={{ marginRight: '10px' }}>
                        <div style={{ color: 'gray' }}>Volume 24h ({pair.replace('-USDT', '')})</div>
                        <div style={{ color: 'white', fontSize: '20px' }}>41,454.5</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ color: 'white', fontSize: '35px', marginTop: '15px' }}>{price}
                        </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{ color: 'green', marginRight: '20px' }}>48.13</div>
                                <div style={{ color: 'green' }}>+0.11%</div>
                            </div>
                    </div>
                    <div>
                        <div style={{ color: 'gray' }}>24h Bas</div>
                        <div style={{ color: 'white', fontSize: '20px' }}>42.654564</div>
                    </div>
                    <div>
                        <div style={{ color: 'gray' }}>Volume 24h (USDT)</div>
                        <div style={{ color: 'white', fontSize: '20px' }}>41,454.5</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <p style={{ color: 'gray' }}>24h Change</p>
                <p style={{ color: 'red' }}>0,00 %</p>
            </div>
            <h1 style={{ color: 'white' }}><span style={{ color: 'gray' }}>USDT</span>{price}</h1>
            <div>
                <p style={{ color: 'gray' }}>24h Volume</p>
                <p style={{ color: 'white' }}>{volume} USDT</p>
            </div>
        </div>
    )
}