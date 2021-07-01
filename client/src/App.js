import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import useFirstRender from './Hooks/useFirstRender'

function App() {
  
  let [wishList, setWishList] = useState([]);
  let [itemToAdd, setItemToAdd] = useState(' ');

  const firstRender = useFirstRender();
  
  const handleClick = () => {
    setItemToAdd(document.querySelector('#name').value)
  }
  
  useEffect(() => {
    async function fetchData(){
      const url = 'http://localhost:3001/wishlist'
      await fetch(url)
      .then((response) => response.json())
      .then((response) => setWishList(response.map((item) => {
        return (<li>{ item.name }</li>)
      })))
    }
      fetchData(); 
  }, [itemToAdd])
  
  useEffect(() => {
      let dataToSend = {name : itemToAdd}
      
      async function fetchData(){ 
        
        if(!firstRender) {
            const url ='http://localhost:3001/wishlist'
            await fetch(url, {
                method: "POST", 
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            })
        }
    }
      
    fetchData()
    
    }, [itemToAdd])
  
  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Wish List</h1>
        </header>
        <form>
          <input type="text" id="name" name="WishList Item"></input>
          <button type="button" onClick={handleClick}>Add Item</button>
        </form>
        <ol>
          { wishList }
        </ol>
    </div>
  );
}

export default App;
