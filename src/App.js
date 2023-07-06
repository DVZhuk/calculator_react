import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

import ElementsPlace from './components/elementsPlace/ElementsPlace';
import ModeChange from './components/ModeChange';
import ConstructorPlace from './components/constructorPlace/ConstructorPlace';
import { BasketContext, ModeContext } from './context/context';

function App() {
  const [basket, setBasket] = useState([]);
  const [mode, setMode] = useState([0, 1]);
  const [display, setDisplay] = useState('0');
  const [answerflag, setAnswerflag] = useState(false);
  const [recalculation, setRecalculation] = useState(false);
  const [dotflag, setDotflag] = useState(true);
  return (
    <main className="work-place">
      <ModeContext.Provider value={{
        mode,
        setMode
      }}>
        <ModeChange />

        <DndProvider backend={HTML5Backend}>

          <BasketContext.Provider value={{
            basket,
            setBasket,
            display,
            setDisplay,
            answerflag,
            setAnswerflag,
            recalculation,
            setRecalculation,
            dotflag,
            setDotflag
          }}>

            <ElementsPlace />
            <ConstructorPlace />

          </BasketContext.Provider>

        </DndProvider>

      </ModeContext.Provider>
      
    </main>
  );
}

export default App;
