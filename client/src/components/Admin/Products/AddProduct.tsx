import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useInput } from '../../../hooks';
import { ImageData } from '../../../types';

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

type MediaProps = {
  imageShown: boolean
}

const Media = styled(ContainerRounded)`
  padding: 20px;

  .header-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .select-all {
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      
      input {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        cursor: pointer;
      }
    }

    .delete-images {
      font-size: 14px;
      color: rgb(216, 44, 13);
      padding: 8px;
      margin-right: -8px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .upload-container {
    border-radius: 3px;
    border: ${({imageShown}: MediaProps) => imageShown ? 'none' : '2px dashed grey'};
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

  .images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
    padding: ${({imageShown}: MediaProps) => imageShown ? 'none' : '20px'};
    border: ${({imageShown}: MediaProps) => imageShown ? 'none' : '2px dashed grey'};
    border-radius: 3px;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;

    .upload-more {
      width: 100%;
      height: 149px;
      border-radius: 3px;
      border: 2px dashed grey;
      cursor: pointer;
      
      &:hover {
        background-color:rgba(241, 242, 243, 1);
      }

      .text-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          color: #006fbb;
          text-align: center;
          font-size: 14px;
          margin-bottom: 8px;

          &:hover {
            text-decoration: underline;
          }
        }

        .subtitle {
          text-align: center;
          font-size: 11px;
        }
      }
    }
  }
`;

type ImageContainerProps = {
  imageSelected: boolean
  showOverlay: boolean
}

const ImageContainer = styled.div`
  width: 100%;
  height: 149px;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  &:hover {
    .overlay {
      display: ${({showOverlay}: ImageContainerProps) => showOverlay ? 'block' : 'none'};
    }
    input {
      display: block;
    }
  }

  .overlay {
    display: none;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(0,0,0,0.3), transparent);
    position: absolute;
  }

  input {
    display: ${({imageSelected}: {imageSelected: boolean}) => imageSelected ? 'block' : 'none'};
    position: absolute;
    top: 12px;
    left: 12px;
    width: 18px;
    height: 18px;
  }

  img {
    height: 100%;
    width: 100%;
    user-select: none;
  }
`;

const AddProducts = () => {
  const [images, setImages] = useState([] as Array<ImageData>);
  const [selectedImages, setSelectedImages] = useState([] as Array<string>);
  const [title, titleInput] = useInput({ name: 'Title', type: 'text' });
  const [description, descriptionInput] = useInput({ name: 'Description', type: 'textarea' });
  const {
    acceptedFiles,
    getRootProps, 
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    accept: 'immage/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach(file => {
        let reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
          const image = {
            url: reader.result as string,
            name: file.name,
            size: file.size,
            id: `${file.lastModified}${file.name}`,
          }
          // await setSelectedImages([]);
          await setImages(prev => [...prev, image])
        }
      });
    }
  });

  const selectImage = (e: any, imageId: string) => {
    e.stopPropagation();
    if (selectedImages.includes(imageId)) {
      setSelectedImages(prev => {
        return prev.filter(currImageId => currImageId !== imageId);
      });
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const selectAllImages = async () => {
    if (selectedImages.length === images.length) {
      setSelectedImages(prev => [...[]]);
    } else {
      const newSelectedImages = images.map(image => image.id);
      setSelectedImages(newSelectedImages);
    }
  };

  const renderImages = images.map((imageData: ImageData, index: number) => {
    return (
      <ImageContainer 
        key={`${index}${imageData.name}`}
        imageSelected={selectedImages.length > 0}
        showOverlay={!selectedImages.includes(imageData.id)}
        onClick={e => selectImage(e, imageData.id)}
      >
        <div className='overlay'></div>
        <input 
          type='checkbox' 
          checked={selectedImages.includes(imageData.id)}
        />
        <img  
          src={imageData.url}
          alt={imageData.name}
        />
      </ImageContainer>
    )
  });

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

      <Media imageShown={images.length > 0}>
        <div className='header-container'>
          {
            selectedImages.length === 0
            ? <p className='header-title'>Media</p>
            : <>
                <div 
                  onClick={selectAllImages}
                  className='select-all'
                >
                  <input type='checkbox' checked={selectedImages.length === images.length}/>
                  <p className='header-title'>{selectedImages.length} images selected</p>
                </div>
                <p className='delete-images'>Delete images</p>
              </>
          }
        </div>
        { 
          acceptedFiles.length === 0
          ? <div {...getRootProps({className: 'dropzone upload-container'})}>
              <input {...getInputProps()} />
              {/* @ts-ignore */}
              <ion-icon name="arrow-up-circle"></ion-icon>
              <Button text='Add file' color='white'></Button>
              <p className='instructions'>or drop files to upload</p>
            </div>
          // : <div className='images' {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
          : <div className='images' {...getRootProps()}>
              <input {...getInputProps()} />
              { renderImages }
              <div className='upload-more'>
                <div className='text-container'>
                  <p className='title'>Add media</p>
                  <p className='subtitle'>or drop files to upload</p>
                </div>
              </div>
            </div>
        }
      </Media>
    </Container>
  )
};

export default AddProducts;