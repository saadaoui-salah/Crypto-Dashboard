import { Select, Paper } from '@mui/material';
import { useMediaQuery } from '@mui/material/'

export const Link = ({ setPlatform, open }) => {
    const mobile = useMediaQuery('(max-width: 890px)')
    return (
        <Paper sx={{ width: mobile ? (open ? '0vw' : '100vw') : '30vw', height: '11vh', backgroundColor: '#1a2027', borderRadius: '0px' }}>
            <div style={{ padding: '20px' }}>
                <Select onChange={e => setPlatform(e.target.value)} sx={{ width: '100%', backgroundColor: '#0af', border: 'none', color: '#fff' }} native defaultValue={1} id="grouped-native-select" label="Grouping">
                    <option style={{ height: '60px', backgroundColor: '#0af', color: '#fff' }} value={'BINANCE'}>BINANCE</option>
                    <option style={{ height: '60px', backgroundColor: '#0af', color: '#fff' }} value={'COINBASE'}>COINBASE</option>
                    <option style={{ height: '60px', backgroundColor: '#0af', color: '#fff' }} value={'KRAKEN'}>KRAKEN</option>
                </Select>
            </div>
        </Paper>
    )
}