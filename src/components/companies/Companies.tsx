import { useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { RootState, FetchDataDispatch } from "../../types";
import { fetchData, searchCompany } from "../../features/companiesSlice";
import SortCompanies from './SortCompanies';

const Companies = () => {
    const { items, loading, error, searchTerm } = useSelector((state: RootState) => state.companies);
    const dispatch: FetchDataDispatch = useDispatch();

    useEffect (() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return <p>Loading the data...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        let searchTerm = event.target.value;
        dispatch(searchCompany(searchTerm));
    };

    const filteredCompanies = searchTerm ? items.filter((company) => 
    company.login.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : items;
    
    return (
    <div className='portal-container'>
        <h1>Companies Portal</h1>

        <div className='actions'>
            <div className='search-div'>
                <label htmlFor='search-input'>Search by company name:</label>
                <input type='text' id='search-input' onChange={handleSearch} value={searchTerm}/>
            </div>
            <SortCompanies />
        </div>

        <section className='companies'>
            {filteredCompanies.length > 0 &&
            filteredCompanies.map((company) => {
                const { id, avatar_url, login, description, url } = company;
                return (
                    <article className='company' key={id}>
                        <Link to={`/${id}`}>
                            <img src={avatar_url} alt={login} />
                        </Link>
                        <div className='company-info'>
                            <p><b>Name:</b> {login}</p>
                            <p><b>Id:</b> {id}</p>
                            <p><b>Description:</b> {description}</p>
                        </div>
                    </article>

                );
            })
            }
        </section>
    </div>
  );
};

export default Companies;