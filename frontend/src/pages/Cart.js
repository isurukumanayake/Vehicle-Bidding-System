import React, { useContext } from 'react';
import styled from 'styled-components';
import { BiddingsContext } from "../contexts/BiddingsContext";
import car from '../assets/car.jpg';

const BidProductsContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
    margin-bottom: 20px;
    font-weight: bold;
    color: #007bff;
    font-size: 1.8rem;
    text-align: center;
    text-transform: uppercase;
`;

const BidProduct = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const VehicleImage = styled.img`
    width: 200px;
    height: 120px;
    margin-right: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VehicleDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const VehicleTitle = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    margin-bottom: 8px;
`;

const BidPrice = styled.p`
    font-size: 1.2rem;
    color: #777;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
`;

const TotalPrice = styled.div`
    margin-left: 240px;
    margin-right: 10px;
    margin-top: 30px;
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    display: flex;
    justify-content: space-between;
`;

const PriceLabel = styled.span`

`;

const formattedPrice = (price) => {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const Cart = () => {
    const { cart } = useContext(BiddingsContext);

    return (
        <BidProductsContainer>
            <Heading>Biddings</Heading>
            
            {cart.items.length === 0 ? (
                <p>No biddings</p>
            ) : (
                <>
                    {cart.items.map((item) => (
                        <BidProduct key={item.vehicle.id}>
                            <VehicleImage src={item.vehicle.details.image ? item.vehicle.details.image : car} alt={item.vehicle.name} />
                            <VehicleDetails>
                                <VehicleTitle>{item.vehicle.details.brand} {item.vehicle.name} {item.vehicle.details.manufactureYear}</VehicleTitle>
                                <BidPrice>
                                    <PriceLabel>Bid Price:  </PriceLabel>
                                    {formattedPrice(item.biddingPrice)}
                                </BidPrice>
                            </VehicleDetails>
                        </BidProduct>
                    ))}
                    <TotalPrice>
                        <PriceLabel>Total Price: </PriceLabel>
                        {formattedPrice(cart.total)}  
                    </TotalPrice>
                </>
            )}
        </BidProductsContainer>
    );
};

export default Cart;
