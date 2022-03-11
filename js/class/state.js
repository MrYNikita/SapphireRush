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
            jectStyleButton        : document.createElement("sr").style,
            functionExecute        : async function() {},
            jectAnimaSequenceIntro : new classAnimaSequence(),
            jectAnimaSequenceFinish: new classAnimaSequence(),

        },

    ) {

        jectTransmit.functionState = async function() {

            const [domButton,styleButton] = functionDomElementCreate({
                
                boolText      : true,
                stringParms   : "button button [elementSelect] divBackground session",
                jectParamStyle: this.jectStyleButton,
            
            });

            this.jectAnimaSequenceIntro.domElement = domButton;

            if (this.jectAnimaSequenceIntro) {

                await this.jectAnimaSequenceIntro.functionExecute();
            
            };

            function functionClick() {

            };
            
        };

        super(jectTransmit);

        const {

            stringText,
            jectAnimaClick,
            jectStyleButton,
            functionExecute,

        } = jectTransmit;

        this.stringText      = stringText;
        this.jectAnimaClick  = jectAnimaClick;
        this.jectStyleButton = jectStyleButton;
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

                jectStyleButton       : {

                    top            : "-50%",
                    left           : "50%",
                    width          : "0%",
                    height         : "10%",
                    border         : "3px solid",
                    position       : "absolute",
                    transform      : "translateX(-50%)",
                    background     : "none",
                    whiteSpace     : "pre-wrap",
                    borderColor    : jectConfigurate.stringDefaultSessionBorderColor,
                    borderRadius   : "25px",

                },
                jectAnimaSequenceIntro: new classAnimaSequence({

                    arrayJectAnima: [

                        new classAnimaTeamwise({

                            arrayJectAnima: [
    
                                functionArrayGetByName({
    
                                    stringName    : "gradientWaveLinearTonTwo",
                                    arrayJectParse: jectSession.arrayJectAnima,
            
                                }).functionCreate({ numberIterate: 200, }),
                                new classAnimaDomMove({

                                    jectParam: new classAnimaDomMoveParam({

                                        numberPositionEndTop: 50,
                                        stringMeasure: "%",
                                        numberPositionStartTop: -50

                                    }),
                                    stringName: "moveClassic",


                                }).functionCreate({ numberIterate: 200, numberSpeed: 15, }),
    
                            ],
    
                        }),
                        new classAnimaDomExpand({

                            jectParam: new classAnimaDomExpandParam({

                                stringMeasure : "%",
                                numberEndWidth: 20,

                            }),
                            
                        }).functionCreate({  }),
                        new classAnimaDomTextBust({

                            jectParam: new classAnimaDomTextBustParam({

                                stringTextNeed  : "Начнём?",
                                stringTextResult: `Начнём?`,

                            }),

                        }).functionCreate({}),

                    ],

                }),

            }),

        ],

    });

}

functionResolveConnect();