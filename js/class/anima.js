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

        this.arrayJectAnima = this.arrayJectAnima.reverse();
    
    };

    async functionExecute() {

        for (let jectAnimaNow of this.arrayJectAnima) {

            if (jectAnimaNow instanceof classAnimaImplementer) {
                
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
            jectParam    : new classAnimaParam({}),
            stringName   : "",
            numberSpeed  : jectConfigurate.numberDefaultSpeedAnima,
            numberIterate: jectConfigurate.numberDefaultIterateAnima,

        },

    ) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaParam({}),

        ) {

            const {

                domElement,

            } = jectTransmit;

            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `${this.numberIterateNow}px`,
                stringProperty: "top",

            });

        };

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