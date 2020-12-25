import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDropzone } from 'react-dropzone';
import { useInput } from '../../../hooks';

// Components
import { ContainerRounded, GoBack, Button } from '../Core';

const Container = styled.div`
  padding: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  .header {
    line-height: 0.1;
    margin-left: 16px;
    font-size: 20px;
  }
`;

const Description = styled(ContainerRounded)`
  padding: 20px;

  .title {
    margin-bottom: 24px;
  }
`;

const Media = styled(ContainerRounded)`
  padding: 20px;

  .header {
    font-weight: 500;
    margin-bottom: 24px;
  }

  .upload-container {
    border-radius: 3px;
    border: 2px dashed grey;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    cursor: pointer;
    outline: none;
    
    &:hover {
      background-color:rgba(241, 242, 243, 1);
    }

    ion-icon {
      font-size: 50px;
      color:rgb(100, 105, 110);
    }

    .instructions {
      color: grey;
      font-size: 14px;
      margin-top: 8px;
    }
  }
`;

const AddProducts = () => {
  const [title, titleInput] = useInput({ name: 'Title', type: 'text' });
  const [description, descriptionInput] = useInput({ name: 'Description', type: 'textarea' });
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [images, setImages] = useState([] as Array<Element | JSX.Element>);

  useEffect(() => {
    acceptedFiles.map(file => {
      let reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        const image = <img width='100' height='100' src={reader.result as string} alt={file.name}/>
        setImages([...images, image])
        console.log('loaded');
      }
    });
  },[acceptedFiles])
  

  return (
    <Container>
      <Title>
        <GoBack route='/admin/products'></GoBack>
        <p className='header'>Add product</p>
      </Title>

      <Description>
        <div className='title'>
          { titleInput }
        </div>
        <div className='description'>
          { descriptionInput }
        </div>
      </Description>

      <Media>
        <h4 className='header'>Media</h4>
        <div {...getRootProps({className: 'dropzone upload-container'})}>
            <input {...getInputProps()} />
            {
              acceptedFiles.length === 0
              ? <>
                  {/* @ts-ignore */}
                  <ion-icon name="arrow-up-circle"></ion-icon>
                  <Button text='Add file' color='white'></Button>
                  <p className='instructions'>or drop files to upload</p>
                </>
              : images
            }
            
        </div>
      </Media>
    </Container>
  )
};

export default AddProducts;