class classState extends classBasic {

    static jectTransmit = Object.assign(classBasic.jectTransmit,{

        functionState: async function() {},
        jectAnimaSequenceEnd: new classAnimaSequence(),
        jectAnimaSequenceStart: new classAnimaSequence(),
        
    });

    constructor(jectTransmit = classState.jectTransmit) {

        super(jectTransmit);

        let {

            functionState = async function() {},
            jectAnimaSequenceEnd,
            jectAnimaSequenceStart,

        } = jectTransmit;

        this.functionState = functionState;
        this.jectAnimaSequenceEnd  = jectAnimaSequenceEnd;
        this.jectAnimaSequenceStart = jectAnimaSequenceStart;

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

    static jectTransmit = Object.assign(classState.jectTransmit,{

        stringText: "",
        jectAnimaClick: new classAnima(),
        jectStyleButton: document.createElement("sr").style,

    });

    constructor(jectTransmit = classStateButton.jectTransmit) {

        jectTransmit.functionState = async function() {

            const [domButton,styleButton] = functionDomElementCreate({
                
                boolText      : true,
                stringParms   : "button button [elementSelect] divBackground session",
                jectParamStyle: this.jectStyleButton,
            
            });

            this.jectAnimaSequenceStart.jectParam.domElement = domButton;

            if (this.jectAnimaSequenceStart) {

                await this.jectAnimaSequenceStart.functionExecute();
            
            };

            function functionClick() {

            };
            
        };

        super(jectTransmit);

        let {

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

    static jectTransmit = Object.assign(classBasic.jectTransmit,{

        arrayJectState: [new classState()],
        
    });

    constructor(jectTransmit = classStateCatalog.jectTransmit) {

        super(jectTransmit);

        let {

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

    static jectTransmit = Object.assign(classStateCatalog.jectTransmit,{

        stringStyle: "",

    });

    constructor(jectTransmit = classStatePlot.jectTransmit) {

        super(jectTransmit);

        let {

            stringStyle,

        } = jectTransmit;

        this.stringStyle = (typeof(stringStyle) === "string") ? stringStyle : "";

        functionStyleProcess({ styleElement: jectSession.stylePlot, });

        jectSession.arrayJectStatePlot.push(this);

    };

};
class classStateClaster extends classStateCatalog {

    static jectTransmit = Object.assign(classStateCatalog.jectTransmit,{});

    constructor(jectTransmit = classStateClaster.jectTransmit) {

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
                jectAnimaSequenceStart: new classAnimaSequence({

                    jectParam: {

                        domElement: jectSession.domDivBackground,

                    },                 
                    arrayJectAnima: [

                        new classAnimaTeamwise({

                            arrayJectAnima: [
    
                                new classAnimaDomGradientWaveLinearTonTwo({

                                    classExecutor: classBasicRepeater,
                                    numberCountEnd: 200,
                                    jectParam: {

                                        domElement: jectSession.domDivBackground,
                                        stringMeasure: "%",
                                        stringDirection: "to top",
                                        numberBorderTop: 100,
                                        numberBorderBottom: -200,
                                        arrayNumberColorRGBA: [[0,0,0,255],[255,255,255,255]],

                                    },

                                }),
                                new classAnimaDomMove({

                                    classExecutor: classBasicRepeater,
                                    numberSpeed: 15,
                                    numberCountEnd: 200,
                                    jectParam: new classAnimaDomMoveParam({

                                        numberPositionEndTop: 50,
                                        stringMeasure: "%",
                                        numberPositionStartTop: -50

                                    }),
                                    stringName: "moveClassic",


                                }),
    
                            ],
    
                        }),
                        new classAnimaDomExpand({

                            classExecutor: classBasicRepeater,
                            jectParam: new classAnimaDomExpandParam({

                                stringMeasure: "%",
                                numberWidthEnd: 20,

                            }),
                            
                        }),
                        new classAnimaDomTextBust({

                            classExecutor: classBasicRepeater,
                            jectParam: new classAnimaDomTextBustParam({

                                stringTextNeed  : "Начнём?",
                                stringTextResult: `Начнём?`,

                            }),

                        }),

                    ],

                }),

            }),

        ],

    });

}

functionResolveConnect();