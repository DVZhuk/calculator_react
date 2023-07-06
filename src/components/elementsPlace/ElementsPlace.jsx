import React, { useContext } from 'react';
import DragDropHandler from '../functions/DragDrop';
import Display from './Display';
import ExtraButtons from './ExtraButtons';
import NumbersButtons from './NumbersButtons';
import OperationButtons from './OperationButtons';
import { ModeContext } from '../../context/context';

const ElementsPlace = () => {
    const elementsArr = [1, 2, 3, 4];
    const {mode} = useContext(ModeContext);
    
    return (
        <section className="elements-place">
            {elementsArr.map((el) => {
                const dragRef = DragDropHandler(el)
                switch (el) {
                    case 0:
                        return <div className='drop-here-line' key={0}></div>
                    case 1:
                        return <Display key={el} id={el} ref={mode[1]?dragRef:null} />
                    case 2:
                        return <OperationButtons key={el} id={el} ref={mode[1]?dragRef:null}/>
                    case 3:
                        return <NumbersButtons key={el} id={el} ref={mode[1]?dragRef:null}/>
                    case 4:
                        return <ExtraButtons key={el} id={el} ref={mode[1]?dragRef:null}/>
                    default:
                        break;
                }
                return null
            })}
        </section>
    );
};

export default ElementsPlace;