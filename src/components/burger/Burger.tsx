import React from "react";
import styled from "@emotion/styled";
import burgerStyles from "../../styles/hamburgers";

const Button = styled.button``;

const Burger: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick, ...rest }) => {
  return (
    <div css={burgerStyles}>
      <Button
        onClick={onClick}
        className={`hamburger hamburger--squeeze ${isActive ? "is-active" : ""}`}
        aria-label="Burger Button, opens the main menu"
        name="main-menu"
        type="button"
        {...rest}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </Button>
    </div>
  );
};

export default Burger;
