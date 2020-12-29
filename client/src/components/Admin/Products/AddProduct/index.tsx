import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks'
import { ADD_PRODUCT } from '../../../../graphql/gql';
import { colors } from '../../../../theme';
import { useInput } from '../../../../hooks';
import { ImageData } from '../../../../types';

// Components
import { ContainerRounded, GoBack, Button } from '../../Core';
import AddMedia from './AddMedia';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  .header {
    line-height: 0.1;
    margin-left: 16px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const Message = styled.div`
  border: 1px solid #02a302;
  background-color: #edf8ed;
  padding: 20px 42px 18px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;

  ion-icon {
    color: ${colors.BrandGreen};
    font-size: 28px;
    margin-right: 12px;
  }
`;

const Description = styled(ContainerRounded)`
  padding: 20px;

  .title {
    margin-bottom: 24px;
  }
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
  const [message, setMessage] = useState('');

  const [images, setImages] = useState([] as Array<ImageData>);
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
      // resetState();
      setMessage(`Added ${res.data.addProduct.name}`)
    })
    .catch(err => console.log(err.message))
  };

  return (
    <Container>
      <Header>
        <GoBack route='/admin/products'></GoBack>
        <p className='header'>Add product</p>
      </Header>
      
      {
        message &&
        <Message>
          {/* @ts-ignore */}
          <ion-icon name="checkmark-circle"></ion-icon>
          { message }
        </Message>
      }

      <Description>
        <div className='title'>
          { titleInput }
        </div>
        <div className='description'>
          { descriptionInput }
        </div>
      </Description>

      <AddMedia 
        images={images}
        setImages={setImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
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