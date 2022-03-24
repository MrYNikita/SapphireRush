(async function () {

    let t = new classBasicWalker({
        
        functionExecute: function() {

            console.clear();
            console.log(this.arrayNumberPointNow);
            console.log(this.arrayNumberPointNext);
            console.log(this.arrayNumberPointBias);

        },
        boolSmooth: true,
        numberSpeed: 250,
        arrayNumberPoint: [[0,0],[5,1],[2,-2],[7,8]],
    
    });

    console.log(t);

    await t.functionBegin();

    console.log("done");

})();

functionResolveConnect();