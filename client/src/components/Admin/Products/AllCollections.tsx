import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS_COLLECTIONS } from '../../../graphql/gql';
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

  .selector-all {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  .collection-image {
    width: 83px;
  }
  .collection-name {
    width: 200px;
    font-weight: 500;
    font-size: 14px;
  }
  .collection-price {
    width: 100px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const UserProduct = styled.div`
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
    cursor: pointer;

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
    }
    .collection-price {
      width: 100px;
    }
  }
`;

const Collections = () => {
  const [tab, setTab] = useState('all');
  const [selectedCollections, setSelectedCollections] = useState([] as Array<number>);

  const { data, loading, refetch } = useQuery(GET_USERS_COLLECTIONS);

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  },[]);

  if (loading) return null;

  const collections = data.getUsersCollections;

  const selectCollection = (collectionId: number) => {
    if (selectedCollections.includes(collectionId)) {
      setSelectedCollections(prev => {
        return prev.filter(currCollectionId => currCollectionId !== collectionId);
      })
    } else {
      setSelectedCollections(prev => {
        return [...prev, collectionId];
      })
    }
  };

  const selectAllCollections = () => {
    if (selectedCollections.length === collections.length) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(collections.map((collection: Collection) => collection.id));
    }
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
            <div className='selector-all' onClick={selectAllCollections}>
              <input type='checkbox' checked={selectedCollections.length === collections.length}/>
            </div>
            <span className='collection-image'/>
            <h4 className='collection-name'>Title</h4>
            <h4 className='collection-price'>Description</h4>
          </TableHeadings>
          {
            collections && collections.map((collection: Collection) => {
              return (
                <UserProduct key={collection.id}>
                  <div className='selector' onClick={() => selectCollection(collection.id)}>
                    <input type='checkbox' checked={selectedCollections.includes(collection.id)}/>
                  </div>
                  <img src={collection.image_url} alt={collection.name}/>
                  <div className='text'>
                    <h5 className='collection-name'>{ collection.name }</h5>
                    <h5 className='collection-description'>{ collection.description }</h5>
                  </div>
                </UserProduct>
              )
            })
          }
        </UsersCollections>
      </ContentContainer>

    </Container>
  )
};

export default Collections;