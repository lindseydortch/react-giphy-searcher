import './App.css';
import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  const searchOptions = {
    key: process.env.REACT_APP_GIPHY_KEY,
    limit: 25,
    rating: 'G',
    api: 'https://api.giphy.com/v1/gifs',
    endpoint: '/search'
  }

  const [images, setImages] = useState([])

  useEffect(() => {
    getImages()
  }, [])

  function getImages() {
    const searchString = 'minions';
    /* Build a URL from the searchOptions object */
    const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&q=${searchString}&limit=${searchOptions.limit}&offset=${searchOptions.offset}&rating=${searchOptions.rating}&lang=en`
  
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setImages(response.data);
      })
      .catch(console.error);
  }

  

  return (
    <div className="App">
      <h1>Giphy Search</h1>
      <SearchForm />
      <SearchResults images={images}/>
    </div>
  );
}

export default App;
