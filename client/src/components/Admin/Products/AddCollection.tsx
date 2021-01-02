import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks'
import { ADD_COLLECTION } from '../../../graphql/gql';
import { useInput } from '../../../hooks';
import { Image, Message } from '../../../types';

// Components
import { 
  ContentHeader,
  Notification,
  AddDescription,
  Button,
} from '../Core';
import { AddMedia } from '../Core';

const Container = styled.div`
  padding: 16px;
`;

const SaveBtn = styled.div`
  text-align: right;
  padding: 24px 0;
  border-top: 1px solid lightgrey;
`;

const CreateCollection = () => {
  const [addCollection] = useMutation(ADD_COLLECTION);
  const [message, setMessage] = useState({} as Message);

  const [images, setImages] = useState([] as Array<Image>);
  const [selectedImages, setSelectedImages] = useState([] as Array<number>);

  const [title, titleInput, clearTitle] = useInput({ name: 'Title', type: 'text', placeholder: 'doge pic' });
  const [description, descriptionInput, clearDescription] = useInput({ name: 'Description', type: 'textarea', placeholder: '-limited edition doge pic' });

  const resetState = () => {
    setImages([]);
    setSelectedImages([]);
    // @ts-ignore
    clearTitle();
    // @ts-ignore
    clearDescription();
  };

  const onSave = () => {
    if (!title) return setMessage({ error: 'Missing a collection title' });
    if (!description) return setMessage({ error: 'Missing a collection description' });
    if (!images.length) return setMessage({ error: 'Missing a collection image' });

    const collection = {
      name: title,
      description,
      image: images[0]
    };

    addCollection({
      variables: { collection }
    })
    .then(res => {
      resetState();
      setMessage({ success: `Created ${res.data.addCollection.name}` });
    })
    .catch(err => {
      setMessage({ error: err.message });
    });
  };

  return (
    <Container>
      <ContentHeader route={'/admin/collections'} text='Create collection'/>
      
      <Notification message={message}/>

      <AddDescription inputFields={[titleInput, descriptionInput]}/>

      <AddMedia 
        images={images}
        setImages={setImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        maxAmount={1}
        headerText={'Collection image'}
      />

      <SaveBtn onClick={onSave}>
        <Button text='Save' color='green'/>
      </SaveBtn>
    </Container>
  )
};

export default CreateCollection;