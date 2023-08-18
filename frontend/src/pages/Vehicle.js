import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import car from '../assets/car.jpg';
import { toast } from 'react-hot-toast';
import { BiddingsContext } from "../contexts/BiddingsContext";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    padding: 150px;
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 500px;
    height: 100%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
`;

const Price = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #007bff;
    margin-bottom: 10px;
`;

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
`;

const Color = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 15px 5px;
    background-color: ${props => props.color};
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const BiddingInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;
    margin-right: 10px;

    &:focus {
        outline: none;
        border-color: #007bff;
    }

    &::placeholder {
        color: #999;
    }
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    cursor: ${props => (props.enabled ? 'pointer' : 'not-allowed')};

    &:hover {
        background-color: #0056b3;
    }
`;

const formattedPrice = (price) => {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const Vehicle = () => {
    const { id } = useParams();
    const { cart, addToCart } = useContext(BiddingsContext);

    const [vehicle, setVehicle] = useState(null);
    const [biddingPrice, setBiddingPrice] = useState('');
    const [bidSubmitted, setBidSubmitted] = useState(false);

    const getVehicle = () => {
        axios.get(`http://157.245.61.32:7979/vehicles/${id}`)
            .then(res => {
                setVehicle(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to fetch vehicle data");
            });
    };

    useEffect(() => {
        getVehicle();
    }, [id]);

    const handleBidSubmit = () => {
        if (!vehicle) {
            toast.error("Vehicle data not loaded yet");
            return;
        }

        const numericPrice = parseFloat(biddingPrice);
        const vehiclePrice = vehicle.details.price;

        if (isNaN(numericPrice) || numericPrice <= 0) {
            toast.error("Please enter a valid bid amount");
            return;
        }

        if (numericPrice <= vehiclePrice) {
            toast.error("Your bid should be higher than the vehicle price");
            return;
        }

        addToCart(vehicle, numericPrice);

        toast.success("Bidding placed");
        setBiddingPrice('');
    };

    if (!vehicle) {
        return <div></div>; //Loading
    }

    return (
        <Container>
            <ImageContainer>
                <Image src={vehicle.details.image ? vehicle.details.image : car} />
            </ImageContainer>
            <InfoContainer>
                <Title>{vehicle.details.brand} {vehicle.name} {vehicle.details.manufactureYear}</Title>
                <Description>{vehicle.details.description}</Description>
                <Price>{formattedPrice(vehicle.details.price)}</Price>
                <ColorContainer>
                    Color:
                    <Color color={vehicle.details.color} />
                </ColorContainer>
                <InputContainer>
                    <BiddingInput
                        type='text'
                        placeholder='Bidding price in LKR'
                        value={biddingPrice}
                        onChange={(e) => setBiddingPrice(e.target.value)}
                        required
                    />
                    <Button
                        enabled={!!biddingPrice}
                        onClick={handleBidSubmit}
                        disabled={!biddingPrice || bidSubmitted}
                    >
                        Bid
                    </Button>
                </InputContainer>
            </InfoContainer>
        </Container>
    )
}

export default Vehicle;
