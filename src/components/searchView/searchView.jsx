import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function searchView() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [favorite, setFavorite] = useState('');
    const giphy = useSelector(store => store.giphy);

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

    const handleFavorite = (event) => {
        event.preventDefault();
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
            <button className="searchButton" type="submit">Submit</button>
        </form>

        
            {giphy.map((gif, i) => {
                return (
                <>
                <form className="favorite" onSubmit={handleFavorite}>
                    <img key={i} src={giphy.data.images.original.url}></img>
                    <button onClick={(event) => setFavorite(event.target.value)}>Add to Favorites</button>
                </form>
                </>
                )
            })}
        </>
    )
}

export default searchView;


// {giphy.data ?
//     (<img src={giphy.data.images.original.url}/>)
//     : ''
//   }

//from giphy api acitivity App.js had useEffect/getFunction for loading images to DOM
//useDispatch for dispatching action to reducer
//reducer specific store instance to access giphy from reducer
//getFunction including axios.get request at '/random' and dispatch action to reducer

