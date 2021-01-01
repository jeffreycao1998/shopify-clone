import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks'
import { ADD_PRODUCT } from '../../../graphql/gql';
import { useInput } from '../../../hooks';
import { Image, Message } from '../../../types';

// Components
import { 
  ContainerRounded,
  ContentHeader,
  Notification,
  AddDescription,
  Button,
} from '../Core';
import AddMedia from '../Core/AddMedia';

const Container = styled.div`
  padding: 16px;
`;

const Pricing = styled(ContainerRounded)`
  padding: 20px;

  .title {
    margin-bottom: 24px;
  }

  .cost {
    display: flex;
    justify-content: space-between;

    .price {
      width: 48%;
    }
  }
`;

const SaveBtn = styled.div`
  text-align: right;
  padding: 24px 0;
  border-top: 1px solid lightgrey;
`;

const AddProducts = () => {
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [message, setMessage] = useState({} as Message);

  const [images, setImages] = useState([] as Array<Image>);
  const [selectedImages, setSelectedImages] = useState([] as Array<string>);

  const [title, titleInput, clearTitle] = useInput({ name: 'Title', type: 'text', placeholder: 'doge pic' });
  const [description, descriptionInput, clearDescription] = useInput({ name: 'Description', type: 'textarea', placeholder: '-limited edition doge pic' });
  
  const [price, priceInput, clearPrice] = useInput({ name: 'Price', type: 'text', placeholder: '0.00'});

  const resetState = () => {
    setImages([]);
    setSelectedImages([]);
    // @ts-ignore
    clearTitle();
    // @ts-ignore
    clearDescription();
    // @ts-ignore
    clearPrice();
  };

  const onSave = () => {
    const product = {
      name: title,
      description,
      images,
      //@ts-ignore
      price: parseFloat(price).toFixed(2) * 100,
    }
    
    addProduct({
      variables: { product }
    })
    .then(res => {
      resetState();
      setMessage({ success: `Added ${res.data.addProduct.name}` });
    })
    .catch(err => console.log(err.message))
  };

  return (
    <Container>
      <ContentHeader route={'/admin/products'} text='Add product'/>
      
      <Notification message={message}/>

      <AddDescription inputFields={[titleInput, descriptionInput]}/>

      <AddMedia 
        images={images}
        setImages={setImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        maxAmount={20}
        headerText={'Media'}
      />

      <Pricing>
        <p className='title'>Pricing</p>
        <div className='cost'>
          <div className='price'>
            { priceInput }
          </div>
        </div>
      </Pricing>

      <SaveBtn onClick={onSave}>
        <Button text='Save' color='green'/>
      </SaveBtn>
    </Container>
  )
};

export default AddProducts;