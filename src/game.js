import React from 'react';
import LineTo from 'react-lineto'; //these imports are for filllinks function

//burası yiğidin harman olduğu yer

var items = 0
//objelerimiz burada depolanıyor, 
export var compPositions = [];


if (items == 0  ) {
items = prompt("Please enter the number of components you want( between 1-40 )", "3");

    if ( items <1 || items > 40 ) { alert("Please pick a reasonable number"); 
                                    window.location.reload()} else{
    for(var i = 0; i < items; i++) {
        compPositions.push({id: i, x: (i % 8) + 10 , y: Math.floor(i / 8) + 10, next: 999, isPlayed: 0}) //x ve y nin değerleri 7 den büyük ise, source'da renderlanıyorlar
    }}

}

//global dataları burada saklıyorum

const data = {
    lastPlayed : null,
    id: 0,
    totalElements: 0,
    links : [],
    message: "please drag a component"
};

export default data;

//componentler arasındaki çizgileri çeken fonksiyon
export function fillLinks() {
    var links = []
    for (let i = 0; i < compPositions.length; i++) {
        if (compPositions[i].isPlayed){
        links.push(
          <LineTo key={i} from={compPositions[i].id.toString()} 
                            to={compPositions[i].next.toString()} 
                    fromAnchor="right"
                      toAnchor="left" 
                    borderWidth= {3}
                                  />
        );
      }
      }
      data.links = links;
}



/* buradan index.js e compPositions u prop olarak yolluyoruz*/

let observer = null;


function emitChange() {
    observer(compPositions)
}



export function observe(a) {
   if (observer) {
       throw new Error('multple observers not implemented')
   }
   observer = a;
   emitChange();
}

export function moveComp(id,toX, toY) {
    
    compPositions[id].x = toX;
    compPositions[id].y = toY; 
    emitChange();

}
