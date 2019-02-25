import React from 'react';
import Comp from './comp';
import withDragDropContext from './withDragDropContext';
import BoardSquare from './boardsquare'
import data from './game';

function Board({compPositions}) {

  

  function renderTSquare(key,color,compPositions) { // componentleri bırakabileceğimiz kareleri hazırlayan fonksiyon

    function renderPiece(x, y, positions) {
      for(let i = 0; i< positions.length; i++)
      {
        if ( x == positions[i].x && y==positions[i].y) {
 
          return (
       <div className={positions[i].id}>
              <Comp  id={positions[i].id}/>
         </div>            
          );
        }
      }
    }
   //keyi koordinata çeviriyoruz
    const x = key % 8;  
    const y = Math.floor(key / 8);

    return (
      
        <div key={key}
            style={{ width: '12.5%', height: '60px' }}>
          <BoardSquare x={x}  y={y}  color={color} isDroppable={1}>
            {renderPiece(x, y, compPositions)}
          </BoardSquare>
        </div>
      
    );
  }

  function renderSSquare(key,color,compPositions) { //componentlerin kaynağını renderlayan fonksiyon
  
        function renderPiece(x, y, positions) {
          for(let i = 0; i< positions.length; i++)
          {
            if ( x == positions[i].x-10 && y==positions[i].y-10) {
             
            return (
              <Comp  id={positions[i].id}/>
          );
            }
          }
        }
       
        const x = key % 8;
        const y = Math.floor(key / 8);

      
        return (
          
            <div key={key}
                style={{ width: '20%', height: '60px' }}>
              <BoardSquare x={x}  y={y}  color={color} isDroppable={0}>
                {renderPiece(x, y, compPositions)}
              </BoardSquare>
            </div>
          
        );
      }


  
  const tsquares = [];
  const ssquares = [];


    for (let i = 0; i < 64; i++) {//target squares
      tsquares.push(renderTSquare(i,'white', compPositions));
    }

 
    for (let i = 0; i<compPositions.length; i++) {//source squares
      if(compPositions[i].x > 7 || compPositions[i].y > 7 ){
        
        ssquares.push(renderSSquare(i,'white', compPositions))}
    }
 


    return (

      <div style={{width: '100%', height: '100%',display: 'flex',flexWrap: 'wrap'}}>
        <div style={{position: 'absolute'}}>
          {data.links}
        </div>

          <div style={{
            width: '70%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
            border: '1px inset blue',
          }}>
          {tsquares}
          </div>

          
            <div style={{
              width: '29%',
              height: '480px',
              display: 'flex',
              flexWrap: 'wrap',
              border: '2px inset black',
              borderRadius : '5px'
            }}>
            
            {ssquares}
            </div>
            <div>
              {data.message}
            </div>
      </div>  
     
     
    );
  }

 export default withDragDropContext(Board);