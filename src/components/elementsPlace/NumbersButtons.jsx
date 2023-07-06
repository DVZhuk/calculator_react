import React, { useContext } from 'react';
import Button from '../UI/Button';
import DeleteElement from '../functions/DeleteElement';
import { BasketContext, ModeContext } from '../../context/context';

const NumbersButtons = React.forwardRef(({id, flag=true}, ref) => {
    const {basket, setBasket} = useContext(BasketContext);
    const {display, setDisplay} = useContext(BasketContext);
    const {answerflag, setAnswerflag} = useContext(BasketContext);
    const {mode} = useContext(ModeContext);
    const {recalculation, setRecalculation} = useContext(BasketContext);
    const {dotflag, setDotflag} = useContext(BasketContext);

    const disabl = basket.includes(id);
    const nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const numberHandler = (index) => {
        const displayArr = display.split('');
        if ((displayArr[0] === '0' && displayArr.length === 1) || answerflag) {
            if (index === '.' && dotflag) {
                setDisplay('0' + String(index));
                setDotflag(false);
            } else {
                setDisplay(String(index));
            }
            setAnswerflag(false);
        } else if (index === '.') {
            if (dotflag) {
                setDisplay((display) => display + index);
                setDotflag(false);
            };
        } else {
            setDisplay((display) => display + index);
        }
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
            className={"numbers-buttons drag-place" + (flag && disabl ? ' drag-place--disabled' : '')} 
            ref={ref}
        >
            <Button onClick={()=> !flag&&mode[0]&&numberHandler('.')} className={'button--comma'}>,</Button>
            {nums.map((el, index) => {
                return <Button onClick={()=>!flag&&mode[0]&&numberHandler(index)} className={'button--' + el} key={index}>{index}</Button>
            })}
        </div>
    );
});

export default NumbersButtons;