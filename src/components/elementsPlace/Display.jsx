import React, { useContext } from 'react';
import DeleteElement from '../functions/DeleteElement';
import { BasketContext, ModeContext } from '../../context/context';

const Display = React.forwardRef(({id, flag=true}, ref) => {
    const {basket, setBasket} = useContext(BasketContext);
    const {display, setDisplay} = useContext(BasketContext);
    const {mode} = useContext(ModeContext);
    const {recalculation, setRecalculation} = useContext(BasketContext);
    const {setDotflag} = useContext(BasketContext);

    const disabl = basket.includes(id);
    const removeEl= () => {
        if (!flag && mode[1]) {
            DeleteElement(id,basket,setBasket)
            setRecalculation(!recalculation);
            setDisplay('0');
            setDotflag(true);
        }
    }
    
    return (
        <div 
            onClick={() => removeEl()} 
            className={"display drag-place" + (flag && disabl ? ' drag-place--disabled' : '')} 
            ref={ref}
        >
            <output className="display__output" htmlFor="display">{flag?'0':display}</output>
        </div>
    );
});

export default Display;