
const DeleteElement = (id, basket, setBasket) => {
    
    const index = basket.indexOf(id);
    const newBasket = [...basket];
    newBasket.splice(index, 1);
    
    return setBasket(newBasket)

};

export default DeleteElement;


