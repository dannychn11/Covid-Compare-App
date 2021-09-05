import './App.css';
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Info from './Info'
import { makeStyles } from '@material-ui/core/styles';
import { countries, states } from './data.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }, 
  button: {
    width: '10ch',
    height: '6ch',
  },
}));

const {useState} = React;

function App() {

    const [country, setCountry] = useState('')
    const [cases, setCases] = useState('')
    const [OnCases, setOnCases] = useState('')
    const [OnDeaths, setOnDeaths] = useState('')
    const [OnTotalCases, setOnTotalCases] = useState('')
    const [type, setType] = useState('countries')
    const [temp, setTemp] = useState('')
    const [error, setError] = useState('')
    const [totalCases, setTotalCases] = useState('')
    const [deaths, setDeaths] = useState('')

    fetch('https://api.opencovid.ca/summary?stat=cases&loc=ON')
    .then(reponse => reponse.json())
      .then(data => {
        setOnCases(data.summary[0].cases)
        setOnTotalCases(data.summary[0].cumulative_cases)
        setOnDeaths(data.summary[0].cumulative_deaths)})

  
  const classes = useStyles();

  function handleErrors(res) {
    if (!res.ok) {
      setCases('')
      setError('e')
      throw new Error(res.error);
    }
    return res.json()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(temp)
    fetch('https://disease.sh/v3/covid-19/' + type + "/" + temp)
      .then(handleErrors)
        .then(data => {console.log(data)
                      setCases(Math.floor((data.todayCases * 14570000) / data.population))
                      setTotalCases(Math.floor((data.cases * 14570000) / data.population))
                      setDeaths(Math.floor((data.deaths * 14570000) / data.population))
                      setError('')})
        .catch(err => {console.log(err); setError('e')});
        setCountry(temp)
        console.log(cases)    
  }

  const handleChange = (e) => {
    setType(e.target.value)
  }

  const display = () => {
    if (error !== 'e' && (cases || deaths || totalCases)) {
      return < Info country={country} cases={cases} deaths={deaths} totalCases={totalCases}/>
    }
    else if (error) {
      return < Info country="Error" cases="N/A" deaths="N/A" totalCases="N/A"/>
    }
  }

  const displayOptions = (country, states) => {
    if (type === "countries") { 
      return country
    } 
    return states
  }
    return (
      <div><br></br>
      <h3 >How do other areas of the world compare to Ontario? </h3>
        <form onSubmit={handleSubmit}>
          <RadioGroup style={{marginLeft: '22%'}}class="container" value={type} onChange={handleChange} >
            <FormControlLabel color="primary" value="countries" control={<Radio color="primary"/>} label="Countries" />
            <FormControlLabel value="states" control={<Radio color="primary" />} label="US States" />
            </RadioGroup>
      <div class="container">
          <Autocomplete
            id="combo-box-demo"
            options={displayOptions(countries, states)}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onInputChange={(e, value) => { setTemp(value) }}
            renderInput={(params) => <TextField {...params} className={classes.root} />}
          />
          <Button className = {classes.button} type="submit" variant="contained" color="primary">Submit</Button>
      </div>
      </form>
      <div>
      {country && error !== 'e' && <p>This is what {country} would look like with Ontario's population.</p>}
      <div class="container">
      < Info country="Ontario" cases={OnCases} deaths={OnDeaths} totalCases={OnTotalCases}/>
      {display()}</div>
      </div>
      <div class="footer">
          <p>World data retrieved from: https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_states__states_</p>
          Canadian data retrieved from: https://opencovid.ca/api/
      </div>
    </div>
    );
}

export default App;
