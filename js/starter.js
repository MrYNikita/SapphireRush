(async function () {

    let c1 = new classAnimaTeamwise({

        stringName: "animaCatalogTest",
        jectParam: { },
        arrayJectAnima: [

            new classAnima({

                numberSpeed: 25,
                classExecutor: classBasicRepeater,
                functionAnima: function(jectTransmit) { console.log(`1.${this.arrayNumberCountNow[0]}`); }

            }),
            new classAnima({

                numberSpeed: 50,
                classExecutor: classBasicRepeater,
                functionAnima: function(jectTransmit) { console.log(`2.${this.arrayNumberCountNow[0]}`); }

            }),

        ],

    });

    await c1.functionExecute();

    console.log("done");

})();

functionResolveConnect();