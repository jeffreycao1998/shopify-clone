import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS_COLLECTIONS, UPDATE_ACTIVE_COLLECTION } from '../../../graphql/gql';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';
import { Collection } from '../../../types';

// Components
import { ContainerRounded, Button } from '../Core';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 32px 0;

  .header {
    font-size: 20px;
    font-weight: 500;
  }
`;

const ContentContainer = styled(ContainerRounded)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const Tabs = styled.ul`
  display: flex;
  padding: 1px 8px 0 8px;
  height: 52px;
  border-bottom: 1px solid lightgrey;
`;

type TabProps = {
  selected: boolean
}

const Tab = styled.li`
  height: 100%;
  padding: 8px 16px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${({selected}: TabProps) => selected ? colors.BrandGreen : 'transparent'};
  color: ${({selected}: TabProps) => selected ? colors.Ink : 'grey'};
  font-size: 14px;
  user-select: none;
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid ${({selected}: TabProps) => selected ? colors.BrandGreen : 'darkgrey'};
    color: ${colors.Ink};
  }
`;

const UsersCollections = styled.div`

`;

const TableHeadings = styled.div`
  height: 56px;
  padding: 10px 0;
  display: flex;
  align-items: center;

  .open-space {
    width: 58px;
    height: 100%;
  }

  .collection-image {
    width: 83px;
  }
  .collection-name {
    width: 200px;
    font-weight: 500;
    font-size: 14px;
  }
  .collection-description {
    font-weight: 500;
    font-size: 14px;
  }
`;

type UserCollectionProps = {
  activeCollection: boolean
}

const UserCollection = styled.div`
  width: 100%;
  height: 88px;
  padding: 12px 0;
  border-top: 1px solid lightgrey;
  display: flex;

  .selector {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 60px;
    cursor: ${({activeCollection}: UserCollectionProps) => activeCollection ? 'default' : 'pointer'};

    input {
      height: 18px;
      width: 18px;
      cursor: pointer;
    }
  }

  img {
    width: 63px;
    height: 63px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 0 2px;
  }

  .text {
    display: flex;
    padding: 4px 0;

    .collection-name {
      width: 200px;

      h5 {
        font-weight: 500;
        font-size: 14px;
      }

      .tag {
        display: inline-block;
        padding: 3px 8px;
        font-size: 12px;
        font-weight: 500;
        background-color: #bbe5b3;
        border-radius: 10px;
        margin-top: 8px;
      }
    }
    .collection-description {
      font-size: 14px;
    }
  }
`;

const Collections = () => {
  const [tab, setTab] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState(-1);

  const { data, loading, refetch: refetchCollections } = useQuery(GET_USERS_COLLECTIONS);
  const [updateActiveCollection] = useMutation(UPDATE_ACTIVE_COLLECTION);

  // useEffect(() => {
  //   if (refetch) {
  //     refetch();
  //   }
  // },[]);

  if (loading) return null;

  const collections = data && data.getUsersCollections;

  const selectCollection = (collectionId: number) => {
    if (selectedCollection === collectionId) {
      setSelectedCollection(-1);
    } else {
      setSelectedCollection(collectionId);
    }
  };

  const setActiveCollection = () => {
    updateActiveCollection({
      variables: { collectionId: selectedCollection }
    })
    .then(res => {
      console.log(res);
      refetchCollections();
    })
    .catch(err => console.log(err));
  };
  
  return (
    <Container>

      <Header>
        <p className='header'>Collections</p>
        <Link to='/admin/collections/new'><Button text='Create collection' color='green' /></Link>
      </Header>

      <ContentContainer>
        <Tabs>
          <Tab selected={tab === 'all'} onClick={() => setTab('all')}>All</Tab>
        </Tabs>

        <UsersCollections>
          <TableHeadings>
            <div className='open-space'></div>
            {
              selectedCollection === -1
              ? <> 
                  <span className='collection-image'/>
                  <h4 className='collection-name'>Title</h4>
                  <h4 className='collection-description'>Description</h4>
                </>
              : <Button text='Make active' color='white' onClick={setActiveCollection}/>
            }
          </TableHeadings>
          {
            collections && collections.map((collection: Collection) => {
              return (
                <UserCollection key={collection.id} activeCollection={collection.active}>
                  <div className='selector' onClick={() => selectCollection(collection.id)}>
                    {
                      !collection.active &&
                      <input type='checkbox' checked={selectedCollection === collection.id}/>
                    }
                  </div>
                  <img src={collection.imageUrl} alt={collection.name}/>
                  <div className='text'>
                    <div className='collection-name'>
                      <h5 className='collection-name'>{ collection.name }</h5>
                      {
                        collection.active &&
                        <span className='tag'>Active</span>
                      }
                    </div>
                    <p className='collection-description'>{ collection.description }</p>
                  </div>
                </UserCollection>
              )
            })
          }
        </UsersCollections>
      </ContentContainer>

    </Container>
  )
};

export default Collections;