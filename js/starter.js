(async function() {

    // jectSession.jectControllerState.functionStateAdd([

    //     functionArrayGetByName({

    //         stringName: "introdaction",
    //         arrayJectParse: jectSession.arrayJectStateClaster,

    //     }),

    // ]);
    
    // await jectSession.jectControllerState.functionStateSequenceRedefinite();

    let timer = new classBasicTimerConditionalRegressive({

        numberSpeed    : 100,
        stringName     : "timer_test",
        boolСondition  : true,
        functionExecute: function() { console.log(this.numberIterateNow); },

    });
    
    timer.functionBegin({ boolСondition: true, });

    setTimeout(() => { timer.functionUpdate({ boolСondition: false, }); },3000);

    setTimeout(() => { timer.functionUpdate({ boolСondition: true, }); },5000);

})();

functionResolveConnect();