import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function searchView() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [favorite, setFavorite] = useState('');
    const searchReducer = useSelector(store => store.searchReducer);

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Clicked search', event, search);
        if (search === '') {
            alert('Please enter a search before continuing!')
        } else {
        dispatch( {type: 'ADD_SEARCH', payload: search});
        setSearch('');
        }
     }

    const handleFavorite = () => {
        console.log('Clicked favorite', favorite);
        dispatch( {type: 'ADD_FAVORITE', payload: favorite});
        setFavorite('');
    }
    

    return (
        <>
        <form className="search" onSubmit={handleSearch}>
            <h2>Search for gifs!</h2>
            <input className="input" type="text" placeholder="Search Here" value={search} 
                    onChange={(event) => setSearch(event.target.value)}/>
            <button className="searchButton" type="submit">Search</button>
        </form>

        <form className="favorite" onSubmit={handleFavorite}>
            {searchReducer.map((gif, i) => {
                return (
                <>
                    <img key={i}>{gif.url}</img>
                    <select className="category" placeholder="Choose Category" 
                        onChange={(event) => setFavorite(event.target.value)}>
                        <option value="funny">Funny</option>
                        <option value="cohort">Cohort</option>
                        <option value="cartoon">Cartoon</option>
                        <option value="nsfw">NSFW</option>
                        <option value="meme">Meme</option>
                    </select>
                </>
                )
            })}
        </form>
    </>
    )
}

export default searchView;

//from giphy api acitivity App.js had useEffect/getFunction for loading images to DOM
//useDispatch for dispatching action to reducer
//reducer specific store instance to access giphy from reducer
//getFunction including axios.get request at '/random' and dispatch action to reducer