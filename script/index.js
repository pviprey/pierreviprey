"use strict";

class Coord{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    /** Récupération des informations liées au canvas */
    let canvas = document.getElementById("cvs");
    let limite = document.getElementById("limit");
    console.log(limite);
    console.log(canvas);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    let ctx = canvas.getContext("2d");

    let size_year = WIDTH/9;

    /*
    jQuery(document).ready(function() {
        jQuery(canvas).draggable(); 
    });
    */

    for(let i = 0; i < 9; i++){
        let year = 2014+i;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "10px helvetica";
        console.log(size_year/2+size_year*i);
        let position = new Coord(size_year/2+size_year*i, 10);
        ctx.fillText(year, position.x, position.y);

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2px";
        ctx.moveTo(position.x, position.y+10);
        ctx.lineTo(position.x, HEIGHT);
        ctx.stroke();
        ctx.closePath();
    }
});