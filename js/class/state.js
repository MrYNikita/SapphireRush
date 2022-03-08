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

        stringName             : "",
        functionState          : async function() {},
        jectAnimaSequenceIntro : new classAnimaSequence(),
        jectAnimaSequenceFinish: new classAnimaSequence(),

    }) {

        super(jectTransmit);

        const {

            functionState,
            jectAnimaSequenceIntro,
            jectAnimaSequenceFinish,

        } = jectTransmit;

        this.functionState           = functionState ?? async function() {};
        this.jectAnimaSequenceIntro  = jectAnimaSequenceIntro;
        this.jectAnimaSequenceFinish = jectAnimaSequenceFinish;

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

    constructor(

        jectTransmit = {

            stringName             : "",
            stringText             : "",
            jectAnimaClick         : new classAnima(),
            functionExecute        : async function() {},
            jectAnimaSequenceIntro : new classAnimaSequence(),
            jectAnimaSequenceFinish: new classAnimaSequence(),

        },

    ) {

        jectTransmit.functionState = async function() {

            const [domButton,styleButton] = functionDomElementCreate({
                
                stringParms   : "button domButton x divBackground session",
                jectParamStyle: {

                    top      : "-100px",
                    left     : "50%",
                    width    : "10%",
                    position : "absolute",
                    transform: "translateX(-50%)"

                },
            
            });

            this.jectAnimaSequenceIntro.domElement = domButton;

            if (this.jectAnimaSequenceIntro) {
                
                await this.jectAnimaSequenceIntro.functionExecute();
            
            };
            
        };

        super(jectTransmit);

        const {

            stringText,
            jectAnimaClick,
            functionExecute,

        } = jectTransmit;

        this.stringText      = stringText;
        this.jectAnimaClick  = jectAnimaClick;
        this.functionExecute = functionExecute; 

    };

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

            new classStateButton({

                jectAnimaSequenceIntro: new classAnimaSequence({

                    arrayJectAnima: [

                        new classAnimaTeamwise({

                            arrayJectAnima: [
    
                                functionArrayGetByName({
    
                                    stringName    : "gradientWaveLinearTonTwo",
                                    arrayJectParse: jectSession.arrayJectAnima,
            
                                }).functionCreate({ numberIterate: 200, }),
                                new classAnimaDomMove({

                                    jectParam: new classAnimaParam({}),
                                    stringName: "moveClassic",


                                }).functionCreate({ numberIterate: 200, }),
    
                            ],
    
                        }),

                    ],

                }),

            }),

        ],

    });

}

functionResolveConnect();