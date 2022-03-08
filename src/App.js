import './App.css';
import { Paper } from '@mui/material';
import { useEffect, useState, useRef, memo } from 'react'
import { formatData } from './utils';
import { useGetCoinbasePrices } from './hooks';
import LineChart from './component/chart';
import { CircularProgress } from '@mui/material';
import { Currencies } from './component/Currency'
import { Header } from './component/Header'
import { Link } from './component/Link'
import { useMediaQuery } from '@mui/material/'


function App() {
  const url = "https://api.pro.coinbase.com"

  // params
  const [pair, setpair] = useState("BTC-USD");
  const [granularity, setGranularity] = useState("");

  // header data
  const [volume, setVolume] = useState("0.00")
  const [price, setPrice] = useState("0.00");

  // responsive
  const [open, setOpen] = useState(false);


  const [currencies, setcurrencies] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [pastData, setpastData] = useState(false);
  const [done, setdone] = useState(false);

  let ws = useRef(null)
  const handleChangePlatform = (platform) => {
    ws.current.close()
    setPlatform(platform)
  }
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });


      setcurrencies(filtered);
      setdone(true);
    };

    apiCall();
  }, [platform]);

  const { BTC, BCH, LINK, ETH, DASH, LTC, XTZ } = useGetCoinbasePrices(done, ws, pair, setVolume, setPrice)

  useEffect(() => {
    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      setpastData(formattedData);
    };
    console.log(pastData)
    fetchHistoricalData();
  }, [])

  const mobile = useMediaQuery('(max-width: 890px)')
  return (
    <div style={{ display: 'flex' }}>

      {mobile ?
        open ? '' : <div style={{ width: mobile ? open ? '0vw' : '100vw' : '30vw', height: '100vh' }}>
          <Link setPlatform={handleChangePlatform} open={open} />
          <Paper
            sx={{
              width: '100%',
              height: '89vh',
              backgroundColor: '#1a2027',
              borderRadius: '0px',
            }}>
            <Currencies
              setOpen={setOpen}
              setpair={setpair}
              BTC={BTC}
              BCH={BCH}
              LINK={LINK}
              ETH={ETH}
              DASH={DASH}
              LTC={LTC}
              XTZ={XTZ}
            />
          </Paper>
        </div>
        : <div style={{ width: mobile ? open ? '0vw' : '100vw' : '30vw', height: '100vh' }}>
          <Link setPlatform={handleChangePlatform} open={open} />
          <Paper
            sx={{
              width: '100%',
              height: '89vh',
              backgroundColor: '#1a2027',
              borderRadius: '0px',
            }}>
            <Currencies
              setOpen={setOpen}
              setpair={setpair}
              BTC={BTC}
              BCH={BCH}
              LINK={LINK}
              ETH={ETH}
              DASH={DASH}
              LTC={LTC}
              XTZ={XTZ}
            />
          </Paper>
        </div>
      }
      {mobile ?
        open ? <div style={{ width: mobile ? open ? '100vw' : '0vw' : '70vw' }}>
          <Paper sx={{ width: '100%', height: mobile ? '25vh' : '11vh', backgroundColor: '#1a2027', borderRadius: '0px' }}>
            <Header volume={volume} price={price} pair={pair} />
          </Paper>
          <Paper sx={{ width: '100%', height: '75vh', backgroundColor: '#1a2027', borderRadius: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {pastData ?
              <LineChart
                data={pastData}
                granularity={granularity}
                setGranularity={setGranularity} />
              :
              <CircularProgress />
            }
          </Paper>
        </div> : ''
        : <div style={{ width: mobile ? open ? '100vw' : '0vw' : '70vw' }}>
          <Paper sx={{ width: '100%', height: mobile ? '25vh' : '11vh', backgroundColor: '#1a2027', borderRadius: '0px' }}>
            <Header volume={volume} price={price} pair={pair} />
          </Paper>
          <Paper sx={{ width: '100%', height: '75vh', backgroundColor: '#1a2027', borderRadius: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {pastData ?
              <LineChart
                data={pastData}
                granularity={granularity}
                setGranularity={setGranularity} />
              :
              <CircularProgress />
            }
          </Paper>
        </div>
      }
    </div >
  );
}

export default App;
