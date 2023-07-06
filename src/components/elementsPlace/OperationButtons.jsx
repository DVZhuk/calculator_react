import React, { useContext } from 'react';
import Button from '../UI/Button';
import DeleteElement from '../functions/DeleteElement';
import { BasketContext, ModeContext } from '../../context/context';

const OperationButtons = React.forwardRef(({id, flag=true}, ref) => {
    const {basket, setBasket} = useContext(BasketContext);
    const {display, setDisplay} = useContext(BasketContext);
    const {setAnswerflag} = useContext(BasketContext);
    const {mode} = useContext(ModeContext);
    const {recalculation, setRecalculation} = useContext(BasketContext);
    const {setDotflag} = useContext(BasketContext);

    const disabl = basket.includes(id);
    const operations = [['divide', '/'], ['multiply', '*'], ['minus', '-'], ['plus', '+']];
    const operationHandler = (el) => {
        const numStr = '0123456789';
        const displayArr = display.split('');
        if (numStr.includes(displayArr[displayArr.length-1])) {
            setDisplay((display) => display + el)
        } else {
            displayArr.pop();
            setDisplay(displayArr.join([]) + el)
        };
        setDotflag(true);
        setAnswerflag(false);
    };
    const removeEl= () => {
        if (!flag && mode[1]) {
            DeleteElement(id,basket,setBasket)
            setRecalculation(!recalculation);
        }
    }

    return (
        <div 
            onClick={() => removeEl()} 
            className={"operation-buttons drag-place" + (flag && disabl ? ' drag-place--disabled' : '')} 
            ref={ref}
        >
            {operations.map((el)=>{
                return <Button onClick={() => !flag&&mode[0]&&operationHandler(el[1])} className={el[0]} key={el[1]}>{el[1] === '*'?'x':el[1]}</Button>
            })}
        </div>
    );
});

export default OperationButtons;