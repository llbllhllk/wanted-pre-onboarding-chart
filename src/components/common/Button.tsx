import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClick?(): void;
}

const Button = ({ children, onClick, ...props }: Props) => {
  return (
    <ButtonContainer type="button" onClick={onClick} {...props}>
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button`
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 18px;
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: aquamarine;
  }

  &:focus {
    background-color: aquamarine;
  }
`;
