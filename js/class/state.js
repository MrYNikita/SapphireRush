class classStateModule {

    constructor(jectState) {

        if (jectState instanceof classState) { this.jectState = jectState; };

    };

};
class classStateCatalogModule {

    constructor(jectStateCatalog) {

        if (jectStateCatalog instanceof classStateCatalog) {

            this.jectStateCatalog = jectStateCatalog;

        };

    };

};

class classState extends classBasic {

    constructor(jectTransmit = {

        stringName   : "",
        functionState: async function() {},

    }) {

        super(jectTransmit);

        const {

            functionState,

        } = jectTransmit;

        this.functionState = functionState ?? async function() {};

    };

};
class classStateGame extends classState {

    constructor(

        jectTransmit = {

            stringName: "",

        },

    ) {

        super(jectTransmit);

    };

};
class classStateInput extends classState {

    constructor(

        jectTransmit = {

            stringName: "",

        },

    ) {

        super(jectTransmit);

    };

};
class classStateVideo extends classState {

    constructor(

        jectTransmit = {

            stringName: "",

        },

    ) {

        super(jectTransmit);

    };

};
class classStateButton extends classState {

    

};
class classStateChoice extends classState {

    constructor(

        jectTransmit = {

            stringName: "",

        },

    ) {

        super(jectTransmit);

    };

};

class classStateCatalog extends classBasic {

    constructor(

        jectTransmit = {

            stringName: "",
            arrayJectState: [new classState(),new classStateCatalog()],

        },

    ) {

        super(jectTransmit);

        const {

            arrayJectState,

        } = jectTransmit;   

        this.arrayJectState = (arrayJectState instanceof Array) ? arrayJectState.filter((jectStateNow) => {

            if (
                
                jectStateNow instanceof classState ||
                jectStateNow instanceof classStateCatalog
                
            ) { return true; }

            jectSession.arrayStringError.push(`SR.classStateCatalog.arrayJectState - коллекция содержит элемент отличный от classStateCatalog и classState;`);

        }).reverse() : [];

    };

};
class classStatePlot extends classStateCatalog {

    constructor(

        jectTransmit = {

            stringName    : "",
            stringStyle   : "",
            arrayJectState: [new classState(),new classStateClaster()],

        },

    ) {

        super(jectTransmit);

        const {

            stringStyle,

        } = jectTransmit;

        this.stringStyle = (typeof(stringStyle) === "string") ? stringStyle : "";

        functionStyleProcess({ styleElement: jectSession.stylePlot, });

        jectSession.arrayJectStatePlot.push(this);

    };

};
class classStateClaster extends classStateCatalog {

    constructor(

        jectTransmit = {

            stringName    : "",
            arrayJectState: [new classState(),new classStateClaster()],

        },

    ) {

        super(jectTransmit);

        jectSession.arrayJectStateClaster.push(this);
        
    };

};

{ // Сюжеты;



}
{ // Кластеры;

    new classStateClaster({

        stringName    : "introdaction",
        arrayJectState: [

            new classState({

                functionState: async function() {

                    await functionArrayGetByName({

                        stringName    : "gradientWaveLinearTonTwo",
                        arrayJectParse: jectSession.arrayJectAnima,

                    }).functionExecute().functionBegin();

                },

            }),
            new classState({

                functionState: async function() {

                    console.log("GG");

                },

            }),

        ],

    });

}

functionResolveConnect();