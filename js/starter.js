(async function () {

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    
    canvas.style.marginTop = "100px";
    canvas.width = 500;
    canvas.height = 500;

    document.body.appendChild(canvas);

    context.beginPath();

    let t1 = new classBasicWalker({
        
        functionExecute: function() {

            const [x,y] = this.arrayNumberPointNow;

            console.clear();
            console.log(`
            смещения: ${this.arrayNumberPointBias};
            точки: ${this.arrayNumberPoint};
            текущая точка: ${this.arrayNumberPointNow};
            следующая точка: ${this.arrayNumberPointNext};
            кол-во итераций: ${this.numberCountNow};
            `);
            context.lineTo(x,y);
            context.strokeStyle = "red";
            context.stroke();
            context.fill();

        },
        boolSync: true,
        boolInstant: false,
        boolDefenite: true,
        boolCentripetal: false,
        numberSpeed: 15,
        arrayNumberPoint: [
            [250,250],[225,250],
            [250,200],[275,250],
            [350,250],[290,275],
            [325,350],[250,300],
            [175,350],[210,275],
            [150,250],[250,250]
        ],
    
    });

    await t1.functionBegin();

    console.log("done");

})();

functionResolveConnect();