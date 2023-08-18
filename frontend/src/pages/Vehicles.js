import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vehicle from '../components/Vehicle';
import styled from 'styled-components';
import { BsFillBagFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 20px 100px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
`;

const VehiclesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Set 3 columns per row */
    grid-gap: 20px;
`;

const BrandFilter = styled.select`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Icon = styled.div`
    cursor: pointer;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    background-color: #ccc; /* Grey color */
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 5px;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #999; /* Darker grey color on hover */
    }
`;


const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const brands = ['Volkswagen', 'Audi', 'Ford', 'Mercedes', 'BMW'];

    const getVehicles = (brand, page) => {
        let apiUrl = `http://157.245.61.32:7979/vehicles?_page=${page}&_limit=9`;
        if (brand) {
            apiUrl += `&details.brand=${brand}`;
        }

        axios.get(apiUrl)
        .then(res => {
            setVehicles(res.data);
            setTotalPages(Math.ceil(res.headers['x-total-count'] / 9));
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getVehicles(selectedBrand, currentPage);
    }, [selectedBrand, currentPage])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Container>
            <Top>
                <BrandFilter
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </BrandFilter>
                <Icon>
                    <Link to='../cart' style={{textDecoration: 'none', color: 'black'}}>
                        <BsFillBagFill />
                    </Link>
                </Icon>
            </Top>
            <VehiclesContainer>
                {vehicles.map((vehicle) => (
                    <Vehicle vehicle={vehicle} key={vehicle._id} />
                ))}
            </VehiclesContainer>
            <Pagination>
                <PageButton onClick={() => handlePageChange(currentPage - 1)}>
                    <FaChevronLeft />
                </PageButton>
                <PageButton onClick={() => handlePageChange(currentPage + 1)}>
                    <FaChevronRight />
                </PageButton>
            </Pagination>
        </Container>
    )
}

export default Vehicles;
