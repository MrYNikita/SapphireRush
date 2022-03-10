class classAnimaParam {

    constructor(

        jectTransmit = {

            domElement               : document.createElement("sr"),
            numberBias               : NaN,
            styleElement             : docuemnt.createElement("style"),
            stringMeasure            : "",
            arrayDomElement          : [docuemnt.createElement("sr")],
            stringDirection          : "",
            stringColorRGBA          : "",
            numberBorderTop          : NaN,
            numberBorderLeft         : NaN,
            numberBorderRight        : NaN,
            numberBorderBottom       : NaN,
            numberColorProcent       : NaN,
            arrayNumberColorRGBA     : [[[NaN]]],
            arrayNumberColorProcent  : [[[NaN]]],
            numberPositionEndTop     : 0,
            numberPositionEndLeft    : 0,
            numberPositionStartTop   : 0,
            numberPositionEndRight   : 0,
            numberPositionEndBottom  : 0,
            numberPositionStartLeft  : 0,
            numberPositionStartRight : 0,
            numberPositionStartBottom: 0,
            numberPositionBiasTop    : 0,
            numberPositionBiasLeft   : 0,
            numberPositionBiasRight  : 0,
            numberPositionBiasBottom : 0,
            numberStartWidth         : 0,
            numberEndWidth           : 0,
            numberBiasWidth          : 0,
            numberEndHeight          : 0,
            numberStartHeight        : 0,
            numberBiasHeight         : 0,
            stringTextNeed           : 0,
            stringTextResult         : 0,

        },

    ) {

        const {

            domElement,
            numberBias,
            styleElement,
            stringMeasure,
            arrayDomElement,
            stringColorRGBA,
            stringDirection,
            numberBorderTop,
            numberBorderLeft,
            numberBorderRight,
            numberBorderBottom,
            numberColorProcent,
            arrayNumberColorRGBA,
            arrayNumberColorProcent,
            numberPositionEndTop,
            numberPositionEndLeft,
            numberPositionStartTop,
            numberPositionEndRight,
            numberPositionEndBottom,
            numberPositionStartLeft,
            numberPositionStartRight,
            numberPositionStartBottom,
            numberPositionBiasTop,   
            numberPositionBiasLeft, 
            numberPositionBiasRight, 
            numberPositionBiasBottom,
            numberStartWidth,
            numberEndWidth,
            numberBiasWidth,
            numberBiasHeight,
            numberStartHeight,
            numberEndHeight,
            stringTextNeed,
            stringTextResult,

        } = jectTransmit;

        this.domElement                = domElement;
        this.numberBias                = numberBias;
        this.styleElement              = styleElement;
        this.stringMeasure             = stringMeasure;
        this.arrayDomElement           = arrayDomElement;
        this.stringColorRGBA           = stringColorRGBA;
        this.stringDirection           = stringDirection;
        this.numberBorderTop           = numberBorderTop;
        this.numberBorderLeft          = numberBorderLeft;
        this.numberBorderRight         = numberBorderRight;
        this.numberBorderBottom        = numberBorderBottom;
        this.numberColorProcent        = numberColorProcent;
        this.arrayNumberColorRGBA      = arrayNumberColorRGBA;
        this.arrayNumberColorProcent   = arrayNumberColorProcent;
        this.numberPositionEndTop      = numberPositionEndTop;
        this.numberPositionEndLeft     = numberPositionEndLeft;
        this.numberPositionStartTop    = numberPositionStartTop;
        this.numberPositionEndRight    = numberPositionEndRight;
        this.numberPositionEndBottom   = numberPositionEndBottom;
        this.numberPositionStartLeft   = numberPositionStartLeft;
        this.numberPositionStartRight  = numberPositionStartRight;
        this.numberPositionStartBottom = numberPositionStartBottom;
        this.numberPositionBiasTop     = numberPositionBiasTop;   
        this.numberPositionBiasLeft    = numberPositionBiasLeft; 
        this.numberPositionBiasRight   = numberPositionBiasRight; 
        this.numberPositionBiasBottom  = numberPositionBiasBottom;
        this.numberStartWidth          = numberStartWidth;
        this.numberEndWidth            = numberEndWidth;
        this.numberBiasWidth           = numberBiasWidth;
        this.numberBiasHeight          = numberBiasHeight;
        this.numberStartHeight         = numberStartHeight;
        this.numberEndHeight           = numberEndHeight;
        this.stringTextNeed            = stringTextNeed;
        this.stringTextResult          = stringTextResult;

    };

};
class classAnimaExecuter extends classBasicTimerFinitePlot {

    constructor(

        jectTransmit = {

            stringName          : "",
            numberSpeed         : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate       : jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        let {

            boolSkip,
            arrayFunctionExecute,

        } = jectTransmit;

        jectTransmit.boolSkip        = boolSkip;
        jectTransmit.functionExecute = jectTransmit.functionAnima;

        super(jectTransmit);

    };

};
class classAnima extends classBasicImplementing {

    constructor(

        jectTransmit = {

            boolSkip     : jectConfigurate.boolSkipAnima,
            jectParam    : new classAnimaParam({}),
            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,
            functionAnima: async function() {},

        },

    ) {

        super(jectTransmit);

        const {

            jectParam,
            numberSpeed,
            numberIterate,
            functionAnima,

        } = jectTransmit;

        if (!(jectParam instanceof classAnimaParam)) { throw new Error(); };

        this.jectParam     = jectParam; 
        this.numberSpeed   = (numberSpeed > 0) ? numberSpeed : jectConfigurate.numberDefaultSpeedAnima;
        this.numberIterate = (numberIterate > 0) ? numberIterate : jectConfigurate.numberDefaultIterateAnima;
        this.functionAnima = functionAnima;

        if (!(this instanceof classAnimaImplementer)) { jectSession.arrayJectAnima.push(this); };

    };

    functionCreate(

        jectTransmit = {

            boolSave         : jectConfigurate.boolSaveAnimaImplement,
            jectParam        : {},
            stringName       : "",
            numberSpeed      : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate    : jectConfigurate.numberDefaultIterateAnima,
            numberModeSpeed  : 1,
            numberModeIterate: 1,

        },

    ) {

        const { jectParam, stringName, boolSave } = jectTransmit;

        if (jectParam) { Object.setPrototypeOf(jectParam,this.jectParam); }
        if ((!stringName || stringName === this.stringName) && boolSave) {
            
            throw new Error(`classAnima.functionCreate.jectTransmit.stringName - ошибка уникальности имени;`);
        
        }

        Object.setPrototypeOf(jectTransmit,this);

        const jectAnimaImplement = new classAnimaImplementer(jectTransmit);

        return jectAnimaImplement;

    };
    functionExecute(

        jectTransmit = {

            

        },

    ) {

        Object.setPrototypeOf(jectTransmit,this);

        return new classAnimaExecuter(jectTransmit);

    };

};
class classAnimaImplementer extends classAnima {

    constructor(

        jectTransmit = {

            boolSave         : jectConfigurate.boolSaveAnimaImplement,
            jectAnima        : new classAnima(),
            jectParam        : new classAnimaParam({}),
            numberSpeed      : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate    : jectConfigurate.numberDefaultIterateAnima,
            numberModeSpeed  : 1,
            jectAnimaCatalog : new classAnimaCatalog(),
            numberModeIterate: 1,

        },

    ) {

        const {

            jectAnima,
            numberModeSpeed,
            jectAnimaCatalog,
            numberModeIterate,

        } = jectTransmit;

        if (jectAnima) { Object.setPrototypeOf(jectTransmit,jectAnima); };
        if (!jectAnima && !(Object.getPrototypeOf(jectTransmit) instanceof classAnima)) { throw new Error(`classAnimaImplementer.constructor.jectTransmit - объект-аргумент не содержит в прототипной цепочки экземпляр класса анимаций classAnima;`); };
        if (jectAnimaCatalog instanceof classAnimaCatalog && jectAnimaCatalog.domElement) { this.jectParam.domElement = jectAnimaCatalog.domElement; };

        super(jectTransmit);

        this.jectAnimaCatalog  = (jectAnimaCatalog instanceof classAnimaCatalog) ? jectAnimaCatalog : undefined;
        this.numberModeSpeed   = numberModeSpeed;
        this.nimberModeIterate = numberModeIterate;

        Object.getPrototypeOf(jectTransmit).arrayJectImplementer.push(this);

    };

    functionExecute(

        jectTransmit = {

            

        },

    ) {

        Object.setPrototypeOf(jectTransmit,this);

        return new classAnimaExecuter(jectTransmit);

    };

};

class classAnimaCatalogModule {

    constructor (jectAnimaCatalog) { this.jectAnimaCatalog = (jectAnimaCatalog instanceof classAnimaCatalog) ? jectAnimaCatalog : undefined; };

};
class classAnimaCatalog extends classBasic {

    constructor (
        
        jectTransmit = {

            domElement    : document.createElement("sr"),
            stringName    : "",
            arrayJectAnima: [classAnima],

        },
        
    ) {

        super(jectTransmit);

        const {

            domElement,
            arrayJectAnima,

        } = jectTransmit;

        this.domElement     = domElement;
        this.arrayJectAnima = (arrayJectAnima instanceof Array) ? arrayJectAnima.filter((jectAnimaNow) => {

            if (
                
                jectAnimaNow instanceof classAnimaCatalog ||
                jectAnimaNow instanceof classAnimaImplementer
                
            ) { return true; };
            
            jectSession.arrayStringError.push(`SR.classAnimaCatalog.arrayJectAnima - коллекция содержит элемент отличный от classAnimaCatalog и classAnimaImplementer;`);

        }) : [];

    };

};
class classAnimaTeamwise extends classAnimaCatalog {

    constructor(

        jectTransmit = {

            domElement    : document.createElement("sr"),
            stringName    : "",
            arrayJectAnima: [],

        },

    ) {

        super(jectTransmit);

        const {

            arrayJectAnima,

        } = jectTransmit;

        this.arrayJectAnima   = arrayJectAnima;
        this.numberAnimaDone  = 0;
        this.numberAnimaCount = this.arrayJectAnima.length;

    };

    async functionExecute() {

        await new Promise((functionResolve) => {

            this.functionResolve = functionResolve;

            this.arrayJectAnima.forEach(async (jectAnimaNow) => {

                if (jectAnimaNow instanceof classAnimaImplementer) {

                    if (!jectAnimaNow.jectParam.domElement) { jectAnimaNow.jectParam.domElement = this.domElement; };

                    await jectAnimaNow.functionExecute().functionBegin();
                
                    this.numberAnimaDone++;

                    if (this.numberAnimaCount === this.numberAnimaDone) { this.functionResolve(); };

                };
                if (jectAnimaNow instanceof classAnimaTeamwise || jectAnimaNow instanceof classAnimaSequence) {
                    
                    if (!jectAnimaNow.domElement) { jectAnimaNow.domElement = this.domElement; };
                    
                    await jectAnimaNow.functionExecute();
                
                };

                

            });

        });

    };

};
class classAnimaSequence extends classAnimaCatalog {

    constructor(
    
        jectTransmit = {

            domElement    : document.createElement("sr"),
            stringName    : "",
            arrayJectAnima: [new classAnima()],

        },
    
    ) {
        
        super(jectTransmit);
    
    };

    async functionExecute() {

        for (let jectAnimaNow of this.arrayJectAnima) {

            if (jectAnimaNow instanceof classAnimaImplementer) {
                
                if (!jectAnimaNow.jectParam.domElement) { jectAnimaNow.jectParam.domElement = this.domElement; };

                await jectAnimaNow.functionExecute().functionBegin();
            
            };
            if (jectAnimaNow instanceof classAnimaTeamwise || jectAnimaNow instanceof classAnimaSequence) {
                
                if (!jectAnimaNow.domElement) { jectAnimaNow.domElement = this.domElement; };

                await jectAnimaNow.functionExecute();
            
            };

        };

    };

};

// DOM;
class classAnimaDomMove extends classAnima {
    
    constructor(

        jectTransmit = {

            boolSkip     : jectConfigurate.boolSkipAnima,
            jectParam    : new classAnimaDomMoveParam({}),
            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaParam({}),

        ) {

            const {

                numberIterate,
                numberIterateNow,

            } = this;

            const {

                domElement,

            } = jectTransmit;

            let {

                numberPositionEndTop,
                stringMeasure,
                numberPositionEndLeft,
                numberPositionEndRight,
                numberPositionStartTop,
                numberPositionEndBottom,
                numberPositionStartLeft,
                numberPositionStartRight,
                numberPositionStartBottom,
                numberPositionBiasTop,
                numberPositionBiasLeft,
                numberPositionBiasRight,
                numberPositionBiasBottom,

            } = jectTransmit;

            if ((numberPositionStartTop && numberPositionEndTop) || numberPositionBiasTop) {

                if (!numberPositionBiasTop) {

                    numberPositionBiasTop              = (numberPositionEndTop - numberPositionStartTop) / numberIterate;
                    jectTransmit.numberPositionBiasTop = numberPositionBiasTop;

                };

            }
            else if(true) {};

            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `${numberPositionStartTop + numberPositionBiasTop * numberIterateNow}${stringMeasure}`,
                stringProperty: "top",

            });

        };

        super(jectTransmit);

    };

};
class classAnimaDomMoveParam extends classAnimaParam {

    constructor(

        jectTransmit = {

            domElement               : document.createElement("sr"),
            stringMeasure            : "",
            numberPositionEndTop     : 0,
            numberPositionEndLeft    : 0,
            numberPositionStartTop   : 0,
            numberPositionEndRight   : 0,
            numberPositionEndBottom  : 0,
            numberPositionStartLeft  : 0,
            numberPositionStartRight : 0,
            numberPositionStartBottom: 0,
            numberPositionBiasTop    : 0,
            numberPositionBiasLeft   : 0,
            numberPositionBiasRight  : 0,
            numberPositionBiasBottom : 0,
            

        },

    ) {

        super(jectTransmit);

    };

};

class classAnimaDomExpand extends classAnima {

    constructor(

        jectTransmit = {

            boolSkip     : jectConfigurate.boolSkipAnima,
            jectParam    : new classAnimaDomExpandParam({}),
            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaDomExpandParam({}),

        ) {

            const {

                numberIterate,
                numberIterateNow,

            } = this;

            let {

                domElement,
                stringMeasure,
                numberEndWidth,
                numberEndHeight,
                numberBiasWidth,
                numberBiasHeight,
                numberStartWidth,
                numberStartHeight,

            } = jectTransmit;

            if (!numberStartWidth) {

                numberStartWidth = functionStylePropertyGet({ domElement: domElement, stringProperty: "width", }).match(/\d+/)[0] - 0;
                jectTransmit.numberStartWidth = numberStartWidth;
                
            };
            if (!numberStartHeight) {

                numberStartHeight = functionStylePropertyGet({ domElement: domElement, stringProperty: "height", }).match(/\d+/)[0] - 0;
                jectTransmit.numberStartHeight = numberStartHeight;

            };
            if (typeof(numberStartWidth) === "number" && typeof(numberEndWidth) === "number" && numberStartWidth !== numberEndWidth && !numberBiasWidth) {

                numberBiasWidth = (numberEndWidth - numberStartWidth) / numberIterate;
                jectTransmit.numberBiasWidth = numberBiasWidth;

            };
            if (typeof(numberStartHeight) === "number" && typeof(numberEndHeight) === "number" && numberStartHeight !== numberEndHeight && !numberBiasHeight) {

                numberBiasHeight = (numberEndHeight - numberStartHeight) / numberIterate;
                jectTransmit.numberBiasHeight = numberBiasHeight;

            };

            if (numberBiasWidth || numberBiasHeight) {

                if (numberBiasWidth) {

                    functionStylePropertySet({

                        domElement    : domElement,
                        stringValue   : `${numberStartWidth + numberBiasWidth * numberIterateNow}${stringMeasure}`,
                        stringProperty: "width",

                    });

                };
                if (numberBiasHeight) {



                };

            } else { this.numberIterateNow = this.numberIterate; };

        };

        super(jectTransmit);

    };

};
class classAnimaDomExpandParam extends classAnimaParam {

    constructor(

        jectTransmit = {

            domElement,
            stringMeasure    : "",
            numberEndWidth   : 0,
            numberBiasWidth  : 0,
            numberStartWidth : 0,
            numberStartHeight: 0,

        },

    ) {

        super(jectTransmit);

    };

};

class classAnimaDomTextBust extends classAnima {

    constructor(

        jectTransmit = {

            boolSkip     : jectConfigurate.boolSkipAnima,
            jectParam    : new classAnimaDomTextBustParam({}),
            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaDomTextBustParam({}),

        ) {

            const {

                boolSkip,
                numberIterate,
                numberIterateNow,

            } = this;

            let {

                domElement,
                stringTextNeed,
                stringTextResult,

            } = jectTransmit;

            const arrayStringSymbol = [
                
                " ","!",",","?",":","-",
                "0","1","2","3","4","5","6","7","8","9",
                //"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                //"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                "А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я",
                "а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я",
                
            ];

            if (!domElement?.domPText) {
                
                jectTransmit.numberIterateNow = numberIterate;
            
                return;
            
            };

            let stringTextNow = functionDomElementTextGet({ domElement: domElement });

            if (numberIterateNow === numberIterate || boolSkip) {
    
                functionDomElementTextChange({

                    domElement: domElement,
                    stringText: stringTextResult,

                });

            }
            else {

                if (stringTextNow.length > stringTextNeed.length) {
                    
                    if (Math.floor(numberIterate / (stringTextNow.length - stringTextNeed.length)) % numberIterateNow === 0) {

                        stringTextNow = stringTextNow.slice(0,-1);

                    };
                
                }
                else if (stringTextNow.length < stringTextNeed.length) {
                    
                    if (Math.floor(numberIterate / (stringTextNeed.length - stringTextNow.length)) % numberIterateNow === 0) {

                        stringTextNow += " ";

                    };
                
                };

                let arrayStringTextNow = stringTextNow.split("");

                arrayStringTextNow.forEach((stringSymbol,numberIndex) => {

                    if (stringSymbol !== stringTextNeed[numberIndex]) {

                        arrayStringTextNow[numberIndex] = arrayStringSymbol[functionGetNumberRandom({

                            numberMin: 0,
                            numberMax: arrayStringSymbol.length - 1

                        })];

                    };

                });

                stringTextNow = arrayStringTextNow.join("");
                functionDomElementTextChange({

                    domElement: domElement,
                    stringText: stringTextNow,

                });

            };

        };

        super(jectTransmit);

    };

};
class classAnimaDomTextBustParam extends classAnimaParam {

    constructor(

        jectTransmit = {
            
            domElement,
            stringTextNeed: "",
            stringTextResult: "",
            
        },

    ) {

        super(jectTransmit);

    };

};

{ // Dom;

    // Анимация градиентной линейной волны двух тонов;
    new classAnima({

        jectParam    : new classAnimaParam({

            domElement          : jectSession.domDivBackground,
            stringMeasure       : "%",
            stringDirection     : "to top",
            numberBorderTop     : 100,
            numberBorderBottom  : -200,
            arrayNumberColorRGBA: [[0,0,0,255],[255,255,255,255]],

        }),
        stringName   : "gradientWaveLinearTonTwo",
        functionAnima: function(

            jectTransmit = new classAnimaParam({}),

        ) {

            const {

                numberIterate,
                numberIterateNow,

            } = this;
            const {

                stringDirection,
                numberBorderTop,
                numberBorderBottom,

            } = jectTransmit;

            if (!jectTransmit.numberBias) {
                
                switch (stringDirection) {

                    case "to top": jectTransmit.numberBias = (numberBorderTop - numberBorderBottom) / numberIterate;

                };
            
            }

            const {

                domElement,
                numberBias,
                stringMeasure,
                arrayNumberColorRGBA,

            } = jectTransmit;

            let numberValue = NaN;

            switch (stringDirection) {

                case "to top": { numberValue = numberBorderBottom + numberBias * numberIterateNow; }; break;

            };

            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `linear-gradient(${stringDirection},rgba(${arrayNumberColorRGBA[0].join(",")}) ${numberValue}${stringMeasure},rgba(${arrayNumberColorRGBA[1].join(",")}))`,
                stringProperty: `background`,

            });

        },

    });

}

functionResolveConnect();