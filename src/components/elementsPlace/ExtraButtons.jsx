import React, { useContext } from 'react';
import Button from '../UI/Button';
import DeleteElement from '../functions/DeleteElement';
import { BasketContext, ModeContext } from '../../context/context';
import { evaluate, round } from 'mathjs';

const ExtraButtons = React.forwardRef(({id, flag=true}, ref) => {
    const {basket, setBasket} = useContext(BasketContext);
    const {display, setDisplay} = useContext(BasketContext);
    const {setAnswerflag} = useContext(BasketContext);
    const {mode} = useContext(ModeContext);
    const {recalculation, setRecalculation} = useContext(BasketContext);
    const disabl = basket.includes(id);

    const solveEquation = () => {
        const numStr = '0123456789';
        const displayArr = display.split('');
        if (numStr.includes(displayArr[displayArr.length - 1])) {
            const answer = round(evaluate(display), 4);
            setDisplay(String(answer));
            setAnswerflag(true);
        };
    };
    const removeEl = () => {
        if (!flag && mode[1]) {
            DeleteElement(id,basket,setBasket)
            setRecalculation(!recalculation);
        };
    };

    return (
        <div 
            onClick={() => removeEl()} 
            className={"extra-buttons drag-place" + (flag && disabl ? ' drag-place--disabled' : '')} 
            ref={ref}
        >
            <Button onClick={()=>!flag&&mode[0]&&solveEquation()} className={'button--equal'}>=</Button>
        </div>
    );
});

export default ExtraButtons;