import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
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
        <div>SearchBox
            <Form onSubmit={submitHandler}>
                <InputGroup >
                <FormControl area-aria-describedby='button-search' type='text'
                    onChange={(e) => setQuery(e.target.value)} placeholder='Search'>

                </FormControl>
                <Button type='submit' id='button-search'>
                    <i className='fas fa-search'></i>
                </Button>
                </InputGroup>
            </Form>
        </div>
    )
};

export default SearchBox;