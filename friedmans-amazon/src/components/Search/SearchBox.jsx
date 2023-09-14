import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getFilterUrl } from '../../Services/getFilterUrl';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { search, pathname } = useLocation();

    useEffect(() => {
        if (pathname !== '/search' && !query) { return; }

        const link = getFilterUrl(search, {
            query: query || 'all'
        })

        navigate(link);

    }, [query])

    const submitHandler = (e) => {
        e.preventDefault();
        const link = getFilterUrl(search, {
            query: query || 'all'
        })

        navigate(link);
    }



    return (
        <div className='searchbox'>
            <form onSubmit={submitHandler}>
                <input type='text'
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder='Search'>

                </input>
                <button type='submit' id='button-search'>
                    <i className='fas fa-search'></i>
                </button>
            </form>
        </div>
    )
};

export default SearchBox;