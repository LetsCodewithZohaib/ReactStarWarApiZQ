import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ peopleData, planetData }) => {
    const [search,setSearch]=useState('');
    const [psearch,setPSearch]=useState('');
    const [ncounter,setnCounter]=useState(2);
    const [pcounter,setpCounter]=useState(2);
    const [npcounter,setnPCounter]=useState(2);
    const [ppcounter,setpPCounter]=useState(2);
   

    //used to copy peopleData to be used for searching purposes...
    const[peopleData2,setPeopleData2]=useState([]);
    const[planetData2,setPlanetData2]=useState([]);
    //perform search logic by setting result data to peopleData2 (similarly to App.js loadPeople())
    const handleSearch= async (e)=>{
        e.preventDefault();
        await axios.get(`https://swapi.dev/api/people/?search=${search}`)
          .then((response)=>{
            var peopleCopy = response.data.results;
            let promises = [];
            for(let person of peopleCopy){
              promises.push(
                //homeworld call
                axios.get(person.homeworld)
                  .then((response)=>{
                    person.homeworld = response.data.name;
                  }),
                //species call 
                person.species.length > 0 ?
                  axios.get(person.species[0])
                    .then((response)=>{
                      person.species = response.data.name;
                    })
                : person.species = 'Human'
              )
            }
            Promise.all(promises).then(() => {setPeopleData2(peopleCopy)});
          })
          .catch((error)=>{
            alert('error loading data')
          })
    }

    const handlePSearch= async ()=>{
        await axios.get(`https://swapi.dev/api/planets/?search=${psearch}`)
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
            Promise.all(promises).then(() => {setPlanetData2(planetCopy)});
          })
          .catch((error)=>{
            alert('error loading data')
          })
      }

    //perform next logic

    const nextPage= async (e)=>{
        e.preventDefault(); 
        setnCounter(ncounter+1);        
        setpCounter(ncounter+1);
        await axios.get(`https://swapi.dev/api/people/?page=${ncounter}`)
          .then((response)=>{
            var peopleCopy = response.data.results;
            let promises = [];
            for(let person of peopleCopy){
              promises.push(
                //homeworld call
                axios.get(person.homeworld)
                  .then((response)=>{
                    person.homeworld = response.data.name;
                  }),
                //species call 
                person.species.length > 0 ?
                  axios.get(person.species[0])
                    .then((response)=>{
                      person.species = response.data.name;
                    })
                : person.species = 'Human'
              )
            }
            Promise.all(promises).then(() => {setPeopleData2(peopleCopy)});
          })
          .catch((error)=>{
            alert('No More People Available')
            setnCounter(2);        
            setpCounter(2);
          })
    }

    const nextPPage= async (e)=>{
        e.preventDefault(); 
        setnPCounter(npcounter+1);        
        setpPCounter(npcounter+1);
        await axios.get(`https://swapi.dev/api/planets/?page=${npcounter}`)
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
            Promise.all(promises).then(() => {setPlanetData2(planetCopy)});
        })
          .catch((error)=>{
            alert('No More Planets Available')
            setnPCounter(2);        
            setpPCounter(2);
          })
    }

    const previousPage= async (e)=>{
        e.preventDefault();        
        setnCounter(pcounter-1);        
        setpCounter(pcounter-1);
        await axios.get(`https://swapi.dev/api/people/?page=${pcounter}`)
          .then((response)=>{
            var peopleCopy = response.data.results;
            let promises = [];
            for(let person of peopleCopy){
              promises.push(
                //homeworld call
                axios.get(person.homeworld)
                  .then((response)=>{
                    person.homeworld = response.data.name;
                  }),
                //species call 
                person.species.length > 0 ?
                  axios.get(person.species[0])
                    .then((response)=>{
                      person.species = response.data.name;
                    })
                : person.species = 'Human'
              )
            }
            Promise.all(promises).then(() => {setPeopleData2(peopleCopy)});
          })
          .catch((error)=>{
            setnCounter(2);        
            setpCounter(2);
          })
    }

    const previousPPage= async (e)=>{
        e.preventDefault(); 
        setnPCounter(ppcounter-1);        
        setpPCounter(ppcounter-1);
        await axios.get(`https://swapi.dev/api/planets/?page=${ppcounter}`)
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
            Promise.all(promises).then(() => {setPlanetData2(planetCopy)});
        })
          .catch((error)=>{
            alert('No More Planets Available')
            setnPCounter(2);        
            setpPCounter(2);
          })
    }
    
    //transfers peopleData content to peopleData2 for searching purposes in the homepage...
    useEffect(()=>{
        setPeopleData2(peopleData)
    },[peopleData]);
     useEffect(()=>{          
        setPlanetData2(planetData)     
    },[planetData]);
    
    return (
        <div style={{marginBottom:'80px'}}>            
            <p className='homepage-text'>People {'>'} <span className='header-text-span'>Select a People to see the details</span></p>

            <div className='main-search-box'>
                <form onSubmit={handleSearch}>
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search People' onChange={(e)=>setSearch(e.target.value)}/>
                        <img className='search-image' alt='icon' src={require('../resources/Interview Assets/Search.svg').default} onClick={handleSearch} height={16} width={16}/>
                    </div>
                </form>
            </div>

            <div className='main-Pagination'>               
                <div>
                    <input type="button" className='btn-primary' onClick={previousPage} value="Previous"/>       
                    <input type="button" className='btn-primary btnfloat' onClick={nextPage} value="Next"/>                                      
                </div>                              
            </div>

            <div className='main-card-box'>
                {/*GENERATING CARDS*/}
                {peopleData2.length>0 ?
                    peopleData2.map((person)=>(
                        <li key={person.name} style={{ listStyleType: "none" }}>
                            <div className='card-box'>
                                <div className='card-header'>
                                    {/*ICON TO GO TO CARD PAGE*/}
                                    <Link to={`/${person.name}`}><img class Name='card-header-icon' alt='icon' src={require('../resources/Interview Assets/Card.svg').default} height={16} width={16}/></Link>
                                    <p className='card-name-text'>{person.name}</p>
                                </div>
                                <div className='card-info'>
                                    <div className='card-info-header'>
                                        <p className='card-info-header-text'><img src={require('../resources/Interview Assets/Gender-Male.svg').default} alt='icon' height={16} width={16}/>{person.birth_year}</p>
                                        <p className='card-info-header-text'>{person.species}</p>
                                    </div>
                                    <div className='card-info-main'>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Homeworld.svg').default} alt='icon' height={16} width={16}/>HOMEWORLD</p>
                                            <p className='info-value-text'>{person.homeworld}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Vehicle.svg').default} alt='icon' height={16} width={16}/>VEHICLES</p>
                                            <p className='info-value-text'>{person.vehicles.length}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'><img src={require('../resources/Interview Assets/Starship.svg').default} alt='icon' height={16} width={16}/>STARSHIPS</p>
                                            <p className='info-value-text'>{person.starships.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    /*to inform user that data is loading/info is not available (if it takes too long to load)*/
                    <p className='load-text'>Loading data...<br/><br/>Or, info is not available.</p>
                }
            </div>

  
            {/* Planets data here*/}
            <p className='header-box'></p>
            <p className='homepage-text'>Planets {'>'} <span className='header-text-span'></span></p>

            <div className='main-search-box'>                
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search Planets' onChange={(e)=>setPSearch(e.target.value)}/>
                        <img className='search-image' alt='icon' src={require('../resources/Interview Assets/Search.svg').default} onClick={handlePSearch} height={16} width={16}/>
                    </div>               
            </div>

            <div className='main-Pagination'>               
                <div>
                    <input type="button" className='btn-primary' onClick={previousPPage} value="Previous"/>         
                    <input type="button" className='btn-primary btnfloat' onClick={nextPPage} value="Next"/>                                       
                </div>                         
            </div>

            <div className='main-card-box'>
                {/*GENERATING CARDS*/}
                {planetData2.length>0 ?
                    planetData2.map((planet)=>(
                        <li key={planet.name} style={{ listStyleType: "none" }}>
                            <div className='card-box'>
                                <div className='card-headerP'>
                                    {/*ICON TO GO TO CARD PAGE*/}
                                    
                                    <p className='card-name-text'>{planet.name}</p>
                                </div>
                                <div className='card-info'>
                                    <div className='card-info-header'>
                                        <p className='card-info-header-text'>Residents</p>
                                        <p className='card-info-header-text'>{planet.residents.length}</p>
                                    </div>
                                    <div className='card-info-main'>
                                        <div className='info-box'>
                                            <p className='info-header-text'>POPULATION</p>
                                            <p className='info-value-text'>{planet.population}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'>DIAMETER</p>
                                            <p className='info-value-text'>{planet.diameter}</p>
                                        </div>
                                        <div className='info-box'>
                                            <p className='info-header-text'>GRAVITY</p>
                                            <p className='info-value-text'>{planet.gravity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    /*to inform user that data is loading/info is not available (if it takes too long to load)*/
                    <p className='load-text'>Loading data...<br/><br/>Or, info is not available.</p>
                }
            </div>

        </div>

        
    )
}

export default HomePage