import React from 'react';
import Square from './square';
import  { fillLinks, moveComp, compPositions} from './game';
import { ItemTypes } from './constants';
import { DropTarget } from 'react-dnd';
import  data  from './game';

const squareTarget = {
    drop(props) {
      
     var id = data.id

      if ((data.lastPlayed != null) && //ilk oynanansa
         (compPositions[data.lastPlayed].next == 999) && //nexti yok ise
         (data.lastPlayed != id) && //kendi kendine bağlanmasın
         (!compPositions[id].isPlayed)// && // bıraktığımız adam zaten oyundaysa onun nextini ellemeylim
        // (data.totalElements != compPositions.length) //son eleman havada kalsın
        ) {
           compPositions[data.lastPlayed].next = id
          };
         
          


          compPositions[id].isPlayed = 1;    //obje artık oynandığını biliyor

          //count sol taraftaki objeleri sayıyor
           var count = 0;
           for(let i = 0; i < compPositions.length; i++){
          if (compPositions[i].isPlayed)
            { count ++}
          }
         data.totalElements = count;


        
         
         //sol taraftaki obje saysına göre ne diyeceğimize karar veriyoruz
          if (count == 0 ){
            data.message = "please drag a component"
          } else if (count == 1) {
            data.message = "component " + id +" is added"
          } else if ( data.lastPlayed != id) {
            data.message = "component " + id + " is added after " + data.lastPlayed
          };
    
     /*
     bu for döngüsünü bir bug yüzünden koymam gerekti. componentleri bağlayan çizgilerin renderlanması dropları 1 hamle geriden takip ediyordu. 
     zaman kısıtlı olduğu için debug etmeye vaktim kalmadı, ben de bir "workaround" implement ettim
     */
      for (var i = 0; i<2; i++) { 
       fillLinks(); 
       moveComp( id, props.x, props.y);
      }
     
      if (data.lastPlayed != id) {data.lastPlayed =id}; // aynı componenti bikaç kere sürükleyince lastPlayed aynı component olmasın  
        



    },
    canDrop(props){
      if(props.children != null){return 0}// karenin içi doluysa oraya baska component koydurtmuyorum
      return props.isDroppable
    }

  };
  
  function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
  
  function BoardSquare({x,y, color, isDroppable, connectDropTarget, isOver, children }) {

    
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
       
      }}>
        <Square color={color}>
          {children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
  
  
  export default DropTarget(ItemTypes.COMP, squareTarget, collect)(BoardSquare);