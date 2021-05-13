import React from 'react';
import {useSelector } from 'react-redux';

function favoriteView() {

    const favoriteReducer = useSelector(store => store.favoriteReducer);

    return (
        <>
            <div>
                {favoriteReducer.map((gif, i) => {
                    return (
                        <img key={i} src={gif.url}>{gif.category}</img>
                    )
                })}
            </div>
        </>
    )
}

export default favoriteView;