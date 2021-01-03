import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { Image } from '../../../types/types';
import { ContainerRounded, Button } from '.';

type MediaProps = {
  imageShown: boolean
}

const Media = styled(ContainerRounded)`
  padding: 20px;

  .header-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .header-title {
      font-weight: 500;
    }

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
  anImageSelected: boolean
  thisImageSelected: boolean
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
      display: ${({thisImageSelected}: ImageContainerProps) => !thisImageSelected ? 'block' : 'none'};
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
    display: ${({anImageSelected}: ImageContainerProps) => anImageSelected ? 'block' : 'none'};
    position: absolute;
    top: 12px;
    left: 12px;
    width: 18px;
    height: 18px;
    z-index: 1;
  }

  img {
    height: 100%;
    width: 100%;
    user-select: none;
    opacity: ${({thisImageSelected}: ImageContainerProps) => thisImageSelected ? 0.5 : 1};
  }
`;

type Props = {
  images: Array<Image>
  selectedImages: Array<number>
  setImages: React.Dispatch<React.SetStateAction<Array<Image>>>
  setSelectedImages: React.Dispatch<React.SetStateAction<Array<number>>>
  maxAmount: number
  headerText: string
}

const AddMedia = ({ images, selectedImages, setImages, setSelectedImages, maxAmount, headerText }: Props) => {
  const {
    acceptedFiles,
    getRootProps, 
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    accept: 'image/jpeg, image/png',
    disabled: images.length >= maxAmount,
    onDrop: (acceptedFiles: Array<File>) => {
      acceptedFiles.forEach((file: File) => {

        let reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
          const image = {
            dataUrl: reader.result as string,
            name: file.name,
            size: file.size,
            id: (new Date().getSeconds() + file.lastModified) % 10000000,
          }
          await setSelectedImages([]);
          await setImages((prev: Array<Image>) => {
            if (prev.length >= maxAmount) return [...prev];
            return [...prev, image];
          })
        }
      });
    },
  });

  const selectImage = (e: React.MouseEvent<HTMLElement>, imageId: number) => {
    e.stopPropagation();
    if (selectedImages.includes(imageId)) {
      setSelectedImages(prev => {
        return prev.filter(currImageId => currImageId !== imageId);
      });
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const selectAllImages = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map(image => image.id));
    }
  };

  const handleDeleteImages = () => {
    setImages(prev => {
      const newImages = prev.filter(image => !selectedImages.includes(image.id));
      return [...newImages];
    });
    setSelectedImages([]);
  };

  const renderImages = images.map((imageData: Image, index: number) => {
    return (
      <ImageContainer 
        key={`${imageData.id}`}
        anImageSelected={selectedImages.length > 0}
        thisImageSelected={selectedImages.includes(imageData.id)}
        onClick={e => selectImage(e, imageData.id)}
      >
        <div className='overlay'></div>
        <input 
          type='checkbox' 
          checked={selectedImages.includes(imageData.id)}
        />
        <img  
          src={imageData.dataUrl}
          alt={imageData.name}
        />
      </ImageContainer>
    )
  });

  return (
    <Media imageShown={images.length > 0}>
      <div className='header-container'>
        {
          selectedImages.length === 0
          ? <p className='header-title'>{ headerText }</p>
          : <>
              <div 
                onClick={selectAllImages}
                className='select-all'
              >
                <input type='checkbox' checked={selectedImages.length === images.length}/>
                <p className='header-title'>{selectedImages.length} images selected</p>
              </div>
              <p className='delete-images' onClick={handleDeleteImages}>Delete images</p>
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
        // : <div className='images' {...getRootProps({isDragActive, isDragAccept, isDragReject})}> <<< this is how you get different on drag styling
        : <div className='images' {...getRootProps()}>
            <input {...getInputProps()} />
            { renderImages }
            {
              images.length < maxAmount &&
              <div className='upload-more'>
                <div className='text-container'>
                  <p className='title'>Add media</p>
                  <p className='subtitle'>or drop files to upload</p>
                </div>
              </div>
            }
          </div>
      }
    </Media>
  );
};

export default AddMedia;