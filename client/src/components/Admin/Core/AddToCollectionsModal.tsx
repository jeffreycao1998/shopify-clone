import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GET_USERS_COLLECTIONS,
  ADD_PRODUCTS_TO_COLLECTION
} from '../../../graphql/gql';
import { Collection, Message } from '../../../types/types';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  background-color: white;
  border-radius: 5px;

  .header {
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    border-bottom: 1px solid lightgrey;

    ion-icon {
      font-size: 32px;
      padding: 8px;
      cursor: pointer;
    }
  }

  .collections {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid lightgrey;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
`;

const CollectionImage = styled.div`
  position: relative;
  margin: 0 16px 8px 0;
  width: 100px;

  &:hover {
    ion-icon {
      display: block;
    }
  }

  img {
    width: 100%;
    height: 100px;
    border-radius: 4px;
    cursor: pointer;
  }

  p {
    text-align: center;
  }

  ion-icon {
    display: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 4px;
    left: 4px;
    cursor: pointer;
  }
`;

type Props = {
  selectedProducts: Array<number>
  setShowAddToCollectionsModal: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<Message>>
}

const AddToCollectionsModal = ({ selectedProducts, setShowAddToCollectionsModal, setMessage }: Props) => {
  const { data } = useQuery(GET_USERS_COLLECTIONS);
  const [addProductsToCollection] = useMutation(ADD_PRODUCTS_TO_COLLECTION);

  const handleAddToCollection = (collectionId: number) => {
    addProductsToCollection({
      variables: {
        productIds: selectedProducts,
        collectionId,
      }
    })
    .then(res => {
      setMessage({ success: `Added ${res.data.addProductsToCollection.amount} product(s) to collection` });
      setShowAddToCollectionsModal(false);
    })
    .catch(err => {
      setMessage({ error: err.message });
      setShowAddToCollectionsModal(false);
    });
  };

  return (
    <Container>
      <Modal>

        <div className='header'>
          <p>Add {selectedProducts.length} {selectedProducts.length > 1 ? 'products' : 'product'} to collection</p>
          {/* @ts-ignore */}
          <ion-icon name="close-outline" onClick={() => setShowAddToCollectionsModal(false)}></ion-icon>
        </div>

        <div className='collections'>
          {
            data && data.getUsersCollections.length &&
            data.getUsersCollections.map((collection: Collection) => {
              return (
                <CollectionImage key={collection.id}>
                  <img src={collection.imageUrl} alt={collection.name} onClick={() => handleAddToCollection(collection.id)}/>
                  <p>{ collection.name }</p>
                  {/* @ts-ignore */}
                  <ion-icon name="add-circle-outline"></ion-icon>
                </CollectionImage>
              )
            })
          }
        </div>

      </Modal>
    </Container>
  );
};

export default AddToCollectionsModal;