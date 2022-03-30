(async function () {

    let t1 = new classBasicRepeater({
        
        boolSkip: false,
        numberSpeed: 25,
        arrayNumberCount: [[10],[20]],
        functionExecute: function() { console.log(this.arrayNumberCountNow); },

    });

    await t1.functionBegin(); console.log("done");

})();

functionResolveConnect();