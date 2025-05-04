import { useState,useEffect } from 'react';
import './App.css';
import useSWR from 'swr';

const fetcher=(...args)=>fetch(...args).then((Response)=>Response.json())

function App() {

  const [gameTitle,setGameTitle]=useState("")
  const [searchedGame,setSearchedGame]=useState([])

  //https://apidocs.cheapshark.com/  => we have used this API for fetch game data

  const {data,error}=useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3',fetcher)

  const searchGame=()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)  //We want to filter by the title and return only 3 items
    .then((Response)=>Response.json())
    .then((data)=>{
      setSearchedGame(data);
      console.log(data);
    })
  }

  return (
    <div className="App">
      <div className='searchSection'>
        <h2>Search for a game...</h2>
        <input type='text' onChange={(event)=>{setGameTitle(event.target.value)}} placeholder='Minecraft...'></input>
        <button onClick={searchGame}>Search Game Title</button>
        <div className="games">
          {searchedGame.map((game,key)=>{
              return(
              <div className="game" key={key}>
                {game.external}
                <img src={game.thumb}/>
                {game.cheapest}
              </div>
              )
          })}
        </div>
      </div>
      <div className='dealSection'></div>
        <h3>Game Deals</h3>
        <div className="games">
        {data && data.map((game,key)=>{
          return(
            <div className="game" key={key} id='deals'>
              <h5>{game.title}</h5>
              <p>Normal Price: {game.normalPrice}</p>
              <p>Sale Price: {game.salePrice}</p>
              <h4>YOU SAVE {game.savings.substr(0,2)}%</h4>
            </div>
            )
        })}
      </div>
      </div>
      
  
  );
}

export default App;

