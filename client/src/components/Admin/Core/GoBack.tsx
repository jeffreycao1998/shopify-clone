import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GoBackContainer = styled.div`
  height: 36px;
  width: 34px;
  border-radius: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 5px;

  ion-icon {
    font-size: 20px;
  }
`;

type Props = {
  route: string
}

const GoBack = ({ route }: Props) => {
  return (
    <Link to={route}>
      <GoBackContainer>
        {/* @ts-ignore */}
        <ion-icon name="arrow-back-outline"></ion-icon>
      </GoBackContainer>
    </Link>
  );
};

export default GoBack;