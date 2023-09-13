import FilterBar from 'components/FilterBar';
import Graph from 'components/Graph';
import { useState } from 'react';

const Home = () => {
  const [selectedID, setSelectedID] = useState<string | null>(null);

  const handleSetSelectedID = (newValue: string) => {
    setSelectedID(newValue);
  };

  return (
    <>
      <FilterBar onSetSelectedID={handleSetSelectedID} />
      <Graph selectedID={selectedID} onSetSelectedID={handleSetSelectedID} />
    </>
  );
};

export default Home;
