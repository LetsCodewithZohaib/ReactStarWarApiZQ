import './App.css';
import Header from "./components/Header";
import './components/Header.css';
import HomePage from './components/HomePage';
import './components/HomePage.css';
import CardPage from './components/CardPage';
import './components/CardPage.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  //api data for all the cards
  const [peopleData,setPeopleData] = useState([]);
  const [planetData,setPlanetData] = useState([]);

  const loadAllPeople= async ()=>{
    await axios.get('https://swapi.dev/api/people')
      .then((response)=>{
        var peopleCopy = response.data.results;
        let promises = [];
        for(let person of peopleCopy){
          promises.push(
            //homeworld call (get the names from given api call)
            axios.get(person.homeworld)
              .then((response)=>{
                person.homeworld = response.data.name;
              }),
            //species call (get the names from given api call)
            person.species.length > 0 ?
              axios.get(person.species[0])
                .then((response)=>{
                  person.species = response.data.name;
                })
            : person.species = 'Human'
          )
        }
        //waits until all http requests have been loaded properly one by one
        Promise.all(promises).then(() => {setPeopleData(peopleCopy)});
      })
      .catch((error)=>{
        alert('error loading data')
      })
  }

  const loadAllPlanets= async ()=>{
    await axios.get('https://swapi.dev/api/planets')
      .then((response)=>{
        var planetCopy = response.data.results;
        let promises = [];
        for(let planet of planetCopy){
          promises.push(            
            //residents call (get the names from given api call)
            planet.residents.length > 0 ?
              axios.get(planet.residents[0])
                .then((response)=>{
                  planet.residents = response.data.name;
                })
            : planet.residents = 'No Residents'
          )
        }
        //waits until all http requests have been loaded properly one by one
        Promise.all(promises).then(() => {setPlanetData(planetCopy)});
      })
      .catch((error)=>{
        alert('error loading data')
      })
  }

  //loads the card data when app is launched and updates the homeworld and species names then set the data to peopleData state
  useEffect(()=>{
    loadAllPeople();
    loadAllPlanets();
  },[]);
  
  return (
    <BrowserRouter>
      <div className='page-body'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage peopleData={peopleData} planetData={planetData}/>}/>
          <Route path="/:id" element={<CardPage peopleData={peopleData}/>} />
        </Routes>   
      </div> 
    </BrowserRouter>
  );
}

export default App;
