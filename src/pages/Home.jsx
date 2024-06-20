
import logo from '../assets/podcast logo.png'
import styled from 'styled-components';



const HomeContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header>
        <Logo src={logo} alt="Logo" />
      </Header>
      
    </HomeContainer>
  );
};

export default Home;