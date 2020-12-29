import React from 'react';
import styled from 'styled-components';
import { ContainerRounded } from '../Core';

const DescriptionContainer = styled(ContainerRounded)`
  padding: 20px;

  .field:not(:last-child) {
    margin-bottom: 24px;
  }
`;

type Props = {
  inputFields: Array<any>
}

const AddDescription = ({ inputFields }: Props) => {
  return (
    <DescriptionContainer>
      {
        inputFields.map((inputField, index) => {
          return <div key={index} className='field'>
            { inputField }
          </div>
        })
      }
    </DescriptionContainer>
  );
};

export default AddDescription;