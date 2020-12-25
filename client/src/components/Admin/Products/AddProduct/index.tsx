import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [images, setImages] = useState([] as Array<ImageData>);
  const [selectedImages, setSelectedImages] = useState([] as Array<string>);

  const [title, titleInput] = useInput({ name: 'Title', type: 'text', placeholder: 'doge pic' });
  const [description, descriptionInput] = useInput({ name: 'Description', type: 'textarea', placeholder: '-limited edition doge pic' });
  
  const [price, priceInput] = useInput({ name: 'Price', type: 'text', placeholder: '0.00'});
  const [comparePrice, comparePriceInput] = useInput({ name: 'Compare price', type: 'text', placeholder: '0.00'});

  const onSave = () => {
    console.log({
      title,
      description,
      images,
      price,
      comparePrice
    })
  };

  return (
    <Container>

      <Header>
        <GoBack route='/admin/products'></GoBack>
        <p className='header'>Add product</p>
      </Header>

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
          <div className='price'>
            { comparePriceInput }
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