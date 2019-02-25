import React from 'react'
import { DragSource } from 'react-dnd';
import { ItemTypes } from './constants';
import data from './game'

const compSource = {
    beginDrag(props) {
      data.id = props.id;
      return {};
    }
  };
  
  function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
  
  function Comp({id, connectDragSource, isDragging }) {
      
    
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px dotted blue',
      }}>
      <div>
        {id}
      </div>
        <div>
           ↦
        </div>
      </div>
    );
  }
  
  export default DragSource(ItemTypes.COMP, compSource, collect)(Comp);