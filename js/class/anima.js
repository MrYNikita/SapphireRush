class classAnimaParam {

    constructor(

        jectTransmit = {

            domElement             : document.createElement("sr"),
            numberBias             : NaN,
            styleElement           : docuemnt.createElement("style"),
            stringMeasure          : "",
            arrayDomElement        : [docuemnt.createElement("sr")],
            stringDirection        : "",
            stringColorRGBA        : "",
            numberBorderTop        : NaN,
            numberBorderLeft       : NaN,
            numberBorderRight      : NaN,
            numberBorderBottom     : NaN,
            numberColorProcent     : NaN,
            arrayNumberColorRGBA   : [[[NaN]]],
            arrayNumberColorProcent: [[[NaN]]],

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

        } = jectTransmit;

        this.domElement              = domElement;
        this.numberBias              = numberBias;
        this.styleElement            = styleElement;
        this.stringMeasure           = stringMeasure;
        this.arrayDomElement         = arrayDomElement;
        this.stringColorRGBA         = stringColorRGBA;
        this.stringDirection         = stringDirection;
        this.numberBorderTop         = numberBorderTop;
        this.numberBorderLeft        = numberBorderLeft;
        this.numberBorderRight       = numberBorderRight;
        this.numberBorderBottom      = numberBorderBottom;
        this.numberColorProcent      = numberColorProcent;
        this.arrayNumberColorRGBA    = arrayNumberColorRGBA;
        this.arrayNumberColorProcent = arrayNumberColorProcent;

    };

};
class classAnimaExecuter extends classBasicTimerFinitePlot {

    constructor(

        jectTransmit = {

            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        let {

            boolSkip,
            jectParam,
            numberSpeed,
            numberIterate,
            functionAnima,
            numberModeSpeed,
            numberModeIterate,

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

        this.jectParam     = (jectParam instanceof classAnimaParam) ? jectParam : {}; 
        this.numberSpeed   = (numberSpeed > 0) ? numberSpeed : jectConfigurate.numberDefaultSpeedAnima;
        this.numberIterate = (numberIterate > 0) ? numberIterate : jectConfigurate.numberDefaultIterateAnima;
        this.functionAnima = functionAnima;

        if (!(this instanceof classAnimaImplementer)) { jectSession.arrayJectAnima.push(this); };

    };

    functionCreate(

        jectTransmit = {

            jectParam        : {},
            stringName       : "",
            numberSpeed      : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate    : jectConfigurate.numberDefaultIterateAnima,
            numberModeSpeed  : 1,
            numberModeIterate: 1,

        },

    ) {

        const { jectParam, stringName } = jectTransmit;

        if (jectParam) { Object.setPrototypeOf(jectParam,this.jectParam); }
        if (!stringName || stringName === this.stringName) {
            
            throw new Error(`classAnima.functionCreate.jectTransmit.stringName - ошибка уникальности имени;`);
        
        }

        Object.setPrototypeOf(jectTransmit,this);

        const jectAnimaImplement = new classAnimaImplementer(jectTransmit);

        Object.setPrototypeOf(jectAnimaImplement,this);

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
            jectParam        : {},
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

        super(jectTransmit);

        this.numberModeSpeed   = numberModeSpeed;
        this.nimberModeIterate = numberModeIterate;

        Object.getPrototypeOf(jectTransmit).arrayJectImplementer.push(this);

    };

};

class classAnimaCatalogModule {

    constructor (jectAnimaCatalog) { this.jectAnimaCatalog = (jectAnimaCatalog instanceof classAnimaCatalog) ? jectAnimaCatalog : undefined; };

};
class classAnimaCatalog extends classBasic {

    constructor (
        
        jectTransmit = {

            stringName    : "",
            arrayJectAnima: [classAnima],

        },
        
    ) {

        super(jectTransmit);

        const {

            stringName,
            arrayJectAnima,

        } = jectTransmit;

        this.arrayJectAnima = (arrayJectAnima instanceof Array) ? arrayJectAnima.filter((jectAnimaNow) => {

            if (

                jectAnimaNow instanceof classAnimaCatalog ||
                jectAnimaNow instanceof classAnimaImplementer 

            ) {
                
                jectAnimaNow.jectAnimaCatalog = this;
                return true;
            
            }
            
            jectSession.arrayStringError.push(`SR.classAnimaCatalog.arrayJectAnima - коллекция содержит элемент отличный от classAnimaCatalog и classAnimaImplementer;`);

        }) : [];

        jectSession.arrayJectAnimaTeamwise.push(this);

    };

};
class classAnimaTeamwise extends classAnimaCatalog {

    constructor(

        jectTransmit = {

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

    async functionExecute(jectTransmit) {

        await new Promise((functionResolve) => {

            this.functionResolve = functionResolve;

            this.arrayJectAnima.forEach((jectAnimaNow) => {

                jectAnimaNow.functionExecute(jectTransmit);

            });

        });

    };

};
class classAnimaSequence extends classAnimaCatalog {

    constructor(
    
        jectTransmit = {

            stringName: "",
            arrayJectAnima: [new classAnima()],

        },
    
    ) {
        
        super(jectTransmit);

        this.arrayJectAnima = this.arrayJectAnima.reverse();
    
    };

    async functionExecute(

        jectTransmit = {



        },

    ) {

        for (let jectAnima of this.arrayJectAnima) {

            await jectAnima.functionExecute(jectTransmit);

        };

    };

};

{ // Dom;

    new classAnima({

        jectParam    : new classAnimaParam({

            domElement          : jectSession.domDivBackground,
            stringMeasure       : "%",
            stringDirection     : "to top",
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

            if (!jectTransmit.numberBias) { jectTransmit.numberBias = 100 / numberIterate; }

            const {

                domElement,
                numberBias,
                stringMeasure,
                stringDirection,
                arrayNumberColorRGBA,

            } = jectTransmit;
            
            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `linear-gradient(${stringDirection},rgba(${arrayNumberColorRGBA[0].join(",")}) ${numberBias * numberIterateNow}${stringMeasure},rgba(${arrayNumberColorRGBA[1].join(",")}))`,
                stringProperty: `background`,

            });

        },

    });

    // new classAnima({

    //     jectParam    : {

    //         stringMeasure          : "%",
    //         numberIterate          : 500,
    //         arrayDomElement        : [jectSession.domDivBackground],
    //         stringDirection        : "to top",
    //         numberBorderTop        : 100,
    //         numberBorderBottom     : -200,

    //     },
    //     stringName   : "gradientWaveLinear",
    //     functionAnima: async function(
            
    //         jectTransmit = {
    
    //             stringMeasure          : "%",
    //             numberIterate          : 100,
    //             stringDirection        : "to top",
    //             arrayDomElement        : [document.createElement("sr")],
    //             numberBorderTop        : 100,
    //             numberBorderBottom     : 0,
    //             arrayNumberColorRGBA   : [[[0]]],
    //             arrayNumberColorProcent: [[[0]]],
    
    //         },
    
    //     ) {

    //         const {

    //             numberIterate,
    //             numberIterateNow,

    //         } = this;

    //         if (!jectTransmit.numberBias) {
                
    //             jectTransmit.numberBias = (Math.abs(jectTransmit.numberBorderTop) + Math.abs(jectTransmit.numberBorderBottom)) / numberIterate;
            
    //         };

    //         const {

    //             numberBias,
    //             stringMeasure,
    //             stringDirection,
    //             arrayDomElement,
    //             numberBorderTop,
    //             numberBorderBottom,
    //             arrayNumberColorRGBA,
    //             arrayNumberColorProcent,

    //         } = jectTransmit;

    //         arrayDomElement.forEach((domElementNow) => {

    //             const domElement   = domElementNow;
    //             const styleElement = functionStyleGetByElement({ domElement: domElementNow, });

    //             if (!styleElement) { throw new Error("classAnima.gradientWaveLinear.functionAnima.domElementNow - обнаружен элемент не имеющий принадлежности;"); }

    //             let numberBorderStart;

    //             switch(stringDirection) {

    //                 case "to top"   : numberBorderStart = numberBorderBottom; break;
    //                 case "to bottom": numberBorderStart = numberBorderTop; break; 

    //             };

    //             functionStylePropertySet({

    //                 stringValue   : `linear-gradient(to top,rgba(0,0,0,255)${numberBorderStart + numberBias * numberIterateNow}${stringMeasure},rgba(255,255,255,255))`,
    //                 styleElement  : styleElement,
    //                 stringExcerpt : domElement.id,
    //                 stringProperty: "background",

    //             });

    //         });
    
    //     },
    
    // }).functionCreate({

    //     numberModeSpeed: 100,

    // });

}

functionResolveConnect();