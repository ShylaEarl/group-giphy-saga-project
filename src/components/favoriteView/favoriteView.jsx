import React from 'react';
import {useSelector } from 'react-redux';

function favoriteView() {

    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const favorite = useSelector(store => store.favorite);
    dispatch( {type: 'SET_CATEGORY', payload: category});


    return (
       
            <div>
                {favorite.map((gif, i) => {
                    return (
                        <>
                            <img key={i} src={giphy.data.images.original.url}></img>
                            <select className="category" placeholder="Choose Category" 
                                onChange={(event) => setCategory(event.target.value)}>
                                <option value="funny">Funny</option>
                                <option value="cohort">Cohort</option>
                                <option value="cartoon">Cartoon</option>
                                <option value="nsfw">NSFW</option>
                                <option value="meme">Meme</option>
                            </select>
                        </>
                    )
                })}
            </ div>
    )
}

export default favoriteView;