import styled from 'styled-components';
import { useState } from 'react';

export const MenuDropdown = () => {
  const [clicked, setClicked] = useState(false);

  const toggleMenu = () => setClicked(prev => !prev);

  return (
    <StyledWrapper>
      <div className={`nav_bar ${clicked ? "clicked" : ""}`} onClick={toggleMenu}>
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3_h" />
        <div className="bar4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .nav_bar {
    background-color: #969FEE;
    position: relative;
    display: none;
    transition: 0.4s;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 10px;
    width: 45px;
    height: 45px;
  }

  @media (max-width: 768px) {
    .nav_bar {
      display: flex;
      margin-left: 20px;
    }
  }

  .bar1,
  .bar2,
  .bar3_h,
  .bar4 {
    border-radius: 30px;
    background-color: #FFFFFF;
    width: 25px;  /* Reduced from 50px */
    height: 3px;  /* Reduced from 5px */
    transition: 0.4s;
  }

  .bar1 {
    margin-bottom: 6px; /* Adjusted spacing */
  }

  .bar4 {
    margin-top: 6px;
  }

  .bar2 {
    position: absolute;
  }

  /* When clicked */
  .nav_bar.clicked {
    border-radius: 50px;
  }

  .nav_bar.clicked .bar3_h {
    transform: rotate(-45deg);
  }

  .nav_bar.clicked .bar2 {
    transform: rotate(45deg);
  }

  .nav_bar.clicked .bar1,
  .nav_bar.clicked .bar4 {
    opacity: 0;
    width: 15px; /* Smaller for collapse animation */
  }
`;