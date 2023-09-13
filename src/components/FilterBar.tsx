import styled from 'styled-components';
import Button from 'components/common/Button';
import { idData } from 'data/id';

interface Props {
  onSetSelectedID(newValue: string): void;
}

const FilterBar = ({ onSetSelectedID }: Props) => {
  return (
    <FilterBarContainer>
      {idData.map((item, idx) => (
        <Button onClick={() => onSetSelectedID(item)} key={idx}>
          {item}
        </Button>
      ))}
    </FilterBarContainer>
  );
};

export default FilterBar;

const FilterBarContainer = styled.div`
  border: 1px solid #d9d9d9;
  padding: 12px;

  & button {
    margin-right: 10px;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;
