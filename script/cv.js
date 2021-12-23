"use strict";

const START_YEAR = 2014;
const NUM_YEAR = new Date().getFullYear();

class Coord{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Experience{
    constructor(index, color, dateBegin, dateEnd = null){
        this.index = index;
        this.color = color;
        this.dateBegin = dateBegin;
        this.dateEnd = dateEnd;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    /** Récupération des informations liées au canvas */
    let canvas = document.getElementById("cvs");
    let limite = document.getElementById("limit");

    const WIDTH = canvas.width = limite.offsetWidth;
    const HEIGHT = canvas.height = limite.offsetHeight;
    let ctx = canvas.getContext("2d");

    let size_year = WIDTH/(NUM_YEAR-START_YEAR+2);

    $(canvas).draggable({
        axis: 'x',
        drag: function(event, ui) {
          var left = ui.position.left,
              offsetWidth = ($(this).width() - $(this).parent().width()) * -1;
      
          if (left > 0) {
            ui.position.left = 0;
          }
          if (offsetWidth > left) {
            ui.position.left = offsetWidth;
          }
        }
    });

    let tab_exp = [];

    //Lycee: Sept 2014 -> Juin 2017
    tab_exp.push(new Experience(0, "blue", new Date(2014, 8), new Date(2017, 5)));

    //Universite: Sept 2017 -> Now
    tab_exp.push(new Experience(0, "purple", new Date(2017, 8), new Date()));

    //CSGO Team: Sept 2018 -> Avril 2019
    tab_exp.push(new Experience(1, "red", new Date(2018, 8), new Date(2019, 3)));
    
    //LesJosettes: Avril 2021 -> Now
    tab_exp.push(new Experience(1, "orange", new Date(2021, 3), new Date()));
    
    for(let i = 0; i < NUM_YEAR-START_YEAR+2; i++){
        let year = START_YEAR + i;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "2.4vh helvetica";
        let position = new Coord(size_year/2+size_year*i, 25);
        ctx.fillText(year, position.x, position.y);

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "3px";
        ctx.moveTo(position.x, position.y+10);
        ctx.lineTo(position.x, HEIGHT);
        ctx.stroke();
        ctx.closePath();
    }

    for(let event of tab_exp){
        let size = 50;

        let monthBegin = event.dateBegin.getMonth();
        let yearBegin = event.dateBegin.getFullYear();
        let positionBegin = new Coord(size_year/2 + (yearBegin - START_YEAR)*size_year + monthBegin/11*size_year, HEIGHT/2 + (size+20)*event.index);
        
        let monthEnd = event.dateEnd.getMonth();
        let yearEnd = event.dateEnd.getFullYear();
        let positionEnd = new Coord(size_year/2 + (yearEnd - START_YEAR)*size_year + monthEnd/11*size_year, HEIGHT/2 + (size+20)*event.index);

        if(event.dateEnd == Date()){
            positionEnd.x -=size/2;
            ctx.beginPath();
            ctx.fillStyle = event.color;

            ctx.moveTo(positionBegin.x, positionBegin.y+size/2);
            ctx.lineTo(positionEnd.x, positionEnd.y+size/2);
            ctx.lineTo(positionEnd.x+size/2, positionEnd.y);
            ctx.lineTo(positionEnd.x, positionEnd.y-size/2);
            ctx.lineTo(positionBegin.x, positionBegin.y-size/2);

            ctx.fill();            
        }else{
            ctx.beginPath();
            ctx.strokeStyle = event.color;
            ctx.lineWidth = size;

            ctx.moveTo(positionBegin.x, positionBegin.y);
            ctx.lineTo(positionEnd.x, positionEnd.y);
            
            ctx.stroke();
            ctx.closePath();
        }
    }

    let mail = document.createElement("a");
    mail.href = "mailto:viprey.pierre@gmail.com";
    mail.innerText = "viprey.pierre@gmail.com";
    document.getElementById("mail").insertAdjacentElement('beforeend', mail);
});