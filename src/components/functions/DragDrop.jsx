import { useDrag, useDrop } from "react-dnd"


const DragDropHandler = (id) => {
    const [{ isDragging}, dragRef] = useDrag({
        type: 'pet',
        item: {id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })
    return dragRef
}


export default DragDropHandler;