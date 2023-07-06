import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import Display from '../elementsPlace/Display';
import ExtraButtons from '../elementsPlace/ExtraButtons';
import NumbersButtons from '../elementsPlace/NumbersButtons';
import OperationButtons from '../elementsPlace/OperationButtons';
import Placeholder from '../UI/Placeholder';
import { BasketContext, ModeContext } from '../../context/context';

const ConstructorPlace = () => {
    const {basket, setBasket} = useContext(BasketContext);
    const {recalculation, setRecalculation} = useContext(BasketContext);
    const {mode} = useContext(ModeContext);

    const objMidData = {
        1: 30,
        2: 28,
        3: 112,
        4: 36
    };
    const [objMid, setObjMid] = useState([]);
    
    const [flag, setFlag] = useState(true);
    const [ref, setRef] = useState([]);
    const indexPosition = useRef(null)

    const [{ isOver }, dropRef] = useDrop({
        accept: 'pet',
        hover: (item, monitor) => {
            const hoverActualY = monitor.getClientOffset().y;
            if (!basket.includes(0)) {
                for (let i = 0; i < objMid.length; i++) {
                    if (hoverActualY < objMid[i]) {
                        setBasket(()=>{
                            const newBasket = [...basket];
                            newBasket.splice(i, 0, 0)
                            return newBasket
                        })
                        break
                    };
                };
                if (hoverActualY >= objMid[objMid.length - 1]) {
                    setBasket(()=>{
                        return [...basket, 0]
                    })
                };
                
            }
            objMid.forEach((el, i) => {
                if (hoverActualY <= el && basket[i+1] === 0 && basket[i]) {
                    setBasket((basket) => {
                        const newBasket = [...basket];
                        newBasket[i] = basket[i+1];
                        newBasket[i+1] = basket[i]
                        return newBasket
                    }) 
                } else if (hoverActualY > el && basket[i] === 0 && basket[i+1] !== undefined) {
                    setBasket((basket) => {
                        const newBasket = [...basket];
                        newBasket[i] = basket[i+1];
                        newBasket[i+1] = basket[i]
                        return newBasket
                    }) 
                }
            })
        },                  
        drop: (item) => {      
            setFlag(false);
            setRef([...ref, React.createRef()])
            setBasket((basket) => {
                if (!basket.includes(item.id)) {
                    const i = basket.indexOf(0);
                    indexPosition.current = i;
                    const newBasket = [...basket];
                    newBasket.splice(i, 1, item.id)
                    return newBasket
                } else {
                    return basket;
                }
            });
            setRecalculation(!recalculation);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    useEffect(()=> {
        if (flag && basket.includes(0)) {
            setBasket((basket) => {
                const i = basket.indexOf(0);
                const newBasket = [...basket];
                newBasket.splice(i, 1);
                return newBasket;
            });
        };
        setFlag(true); 
    }, [isOver])
    
    
    useEffect(()=>{
        setObjMid(() => {
            const newObjMid = basket.map((el, i) => {
                return ref[i]?.current?.getBoundingClientRect().top + objMidData[el];
            })
            return newObjMid
        })
        
    }, [recalculation]);

    
    return (
        <section className={'constructor-place' + (basket.length > 0 ? ' constructor-place--no-empty ' : '') +
         (isOver && basket.length === 0 ? ' constructor-place--active' : '') + (mode[0] ? ' constructor-place--runtime': '')} ref={dropRef}>
            {basket.length > 0 ? basket.map((el, index) => {
                switch (el) {
                    case 0:
                        return <div className='drop-here-line' key={el} ></div> 
                    case 1:          
                        return <Display key={el} id={el} flag={false} ref={ref[index]} />
                    case 2:
                        return <OperationButtons key={el} id={el} flag={false} ref={ref[index]} />
                    case 3:
                        return <NumbersButtons key={el} id={el} flag={false} ref={ref[index]}/>
                    case 4:
                        return <ExtraButtons key={el} id={el} flag={false} ref={ref[index]}/>
                    default:
                        break;
                };
                return null
            }) : <Placeholder />}
        </section>
    );
};

export default ConstructorPlace;