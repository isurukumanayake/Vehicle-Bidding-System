import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import car from '../assets/car.jpg';
import { toast } from 'react-hot-toast';
import { BiddingsContext } from "../contexts/BiddingsContext";
import { Link } from 'react-router-dom';

const Container = styled.div`
    margin: 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    box-shadow: 0 0 0 0.5px lightgrey;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 300px;
    max-height: 180px;
`;

const InfoContainer = styled.div`
    padding: 0 20px 20px 20px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

const Price = styled.p`

`;


const Color = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 8px 0;
    background-color: ${props => props.color};
    margin-right: 10px; /* Adjust spacing as needed */
`;

const InputContainer = styled.div`

`;

const BiddingInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #007bff;
    }

    &::placeholder {
        color: #999;
    }
`;

const Button = styled.button`
    margin-left: 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    cursor: ${(props) => (props.enabled ? 'pointer' : 'not-allowed')};

    &:hover {
        background-color: #0056b3; /* Change to a darker shade for hover effect */
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


const Vehicle = ({ vehicle }) => {

    const { cart, addToCart } = useContext(BiddingsContext);


    const [biddingPrice, setBiddingPrice] = useState('')
    const [bidSubmitted, setBidSubmitted] = useState(false)

    const handleBidSubmit = () => {
        const numericPrice = parseFloat(biddingPrice);
        const vehiclePrice = vehicle.details.price;
    
        if (isNaN(numericPrice) || numericPrice <= 0) {
            toast.error("Please enter a valid bid amount")
            return;
        }
    
        if (numericPrice <= vehiclePrice) {
            toast.error("Your bid should be higher than the vehicle price")
            return;
        }
    
        // Call addToCart with the product and biddingPrice
        addToCart(vehicle, numericPrice);

        toast.success("Bidding placed")
        console.log(cart)
    
        // Reset the biddingPrice state
        setBiddingPrice('');
    };


    return (
        <div>
        <Container>
            <ImageContainer>
                <Link to={`/vehicle/${vehicle.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Image src={vehicle.details.image ? vehicle.details.image : car} />
                </Link>
            </ImageContainer>

            <InfoContainer>
                <Link to={`/vehicle/${vehicle.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Title>{vehicle.details.brand} {vehicle.name} {vehicle.details.manufactureYear}</Title>
                </Link>
                <Price>{formattedPrice(vehicle.details.price)}</Price>

                <Color color={vehicle.details.color} />

                <InputContainer>
                    <BiddingInput type='text' placeholder='Bidding price in LKR' value={biddingPrice} onChange={(e) => setBiddingPrice(e.target.value)} required/>
                    <Button
                        enabled={!!biddingPrice} // Enable the button only if biddingPrice has a value
                        onClick={handleBidSubmit}
                        disabled={!biddingPrice || bidSubmitted} // Disable button if no price or bid submitted
                    >
                        Bid
                    </Button>
                </InputContainer>

            </InfoContainer>


        </Container>

        </div>
    )
}

export default Vehicle