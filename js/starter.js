(async function () {

    let t1 = new classBasicTicker({
        
        boolSkip: true,
        functionExecute: function() { console.log(this.numberCountNow); },

    });

    await t1.functionBegin(); console.log("done");

})();

functionResolveConnect();