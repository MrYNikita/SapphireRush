class classAnimaParam {

    static jectTransmit = {

        domElement: document.createElement("sr"),
        stringMeasure: "",
        arrayDomElement: [document.createElement("sr")],
        

    };

    constructor (jectTransmit = classAnimaParam.jectTransmit) {

        let {

            domElement,
            stringMeasure = jectConfigurate.stringDefaultMeasure,
            arrayDomElement,

        } = jectTransmit;

        // Поле, хранящее тип меры;
        this.stringMeasure = stringMeasure;
        // Поле, хранящее ссылку на массив элементов анимации;
        this.arrayDomElement = (domElement) ? [domElement] : (arrayDomElement) ? arrayDomElement : [];
        

    };

};

class classAnima extends classBasicImplementing {

    /*
        Анимации - это класс объектов, хранящих определенные функции для воспроизведения визуальных эффектов, выполняемых за счет временных исполнителей.
        Для каждого экземпляра анимации может быть указан класс её временного исполнителя, функция анимации, параметры (аргументы для функции анимации), параметры для
        временного исполнителя. Анимации имплементируемые - это означает, что при создании для анимации может быть указано место хранения;

    */

    static jectTransmit = Object.assign(classBasicImplementing.jectTransmit,{
        
        boolSkip: false,
        jectParam: new classAnimaParam(),
        numberSpeed: NaN,
        classExecutor: classBasicExecutorTime,
        functionAnima: function() {},
        numberCountEnd: NaN,
        numberSpeedMode: NaN,
        arrayNumberCountEnd: [NaN,NaN],

    });

    constructor(jectTransmit = classAnima.jectTransmit) {
        
        // Установка каталога хранения активных анимаций;
        jectTransmit.jectCatalog = jectTransmit.jectCatalog ?? jectSession.arrayJectAnima;

        super(jectTransmit);

        let {

            boolSkip,
            jectParam = new classAnimaParam(),
            numberSpeed,
            classExecutor,
            functionAnima,
            numberCountEnd,
            numberSpeedMode,
            arrayNumberCountEnd,

        } = jectTransmit;

        // Поле, хранящее значение пропуска анимации;
        this.boolSkip = (boolSkip) ? true : jectConfigurate.boolSkipAnima;
        // Поле, хранящее объект параметров;
        this.jectParam = jectParam;
        // Поле, хранящее тип исполнителя;
        this.classExecutor = classExecutor;
        // Поле, хранящее ссылку на исполнитель;
        this.jectExecutor = undefined;
        // Поле, хранящее значение скорости анимации;
        this.numberSpeed = (numberSpeed ?? jectConfigurate.numberDefaultSpeedAnima) * (numberSpeedMode ?? 1);
        // Поле, хранящее функцию анимации;
        this.functionAnima = functionAnima;
        // Поле, хранящее ссылку на текущий каталог анимаций;
        this.jectAnimaCatalog = undefined;
        // Поле, хранящее массив завершающего состояния счетчика;
        this.numberCountEnd = numberCountEnd;
        // Поле, хранящее массив завершающих состояний счетчика;
        this.arrayNumberCountEnd = (numberCountEnd) ? [numberCountEnd] : arrayNumberCountEnd;

    };

    // Функция начинающая исполнение анимации;
    async functionExecute() {

        this.jectExecutor = new this.classExecutor({

            boolSkip: this.boolSkip,
            jectParam: this.jectParam,
            stringName: `${this.stringName}Executor`,
            numberSpeed: this.numberSpeed,
            numberCountEnd: this.numberCountEnd,
            functionExecute: this.functionAnima,
            arrayNumberCountEnd: this.arrayNumberCountEnd,

        });

        await this.jectExecutor.functionBegin();

    };

};

class classAnimaCatalog extends classBasicImplementing {

    static jectTransmit = Object.assign(classBasicImplementing.jectTransmit,{

        jectParam: new classAnimaParam(),
        arrayJectAnima: [new classAnima()],
        numberSpeedMode: NaN,

    });

    constructor (jectTransmit = classAnimaCatalog.jectTransmit) {

        super(jectTransmit);

        let {

            jectParam = new classAnimaParam(),
            arrayJectAnima = [],
            numberSpeedMode = 1,

        } = jectTransmit;

        // Поле, хранящее параметры анимаций для данного каталога;
        this.jectParam = jectParam;
        // Поле, хранящее каталог всех одиночных и групповых анимаций;
        this.arrayJectAnima = arrayJectAnima;
        // Поле, хранящее значение модификации скорости для всех анимаций данного каталога;
        this.numberSpeedMode = numberSpeedMode;
        // Предустановка свойств параметров для каждой анимации
        if (this.jectParam) {

            this.arrayJectAnima.forEach((jectAnimaNow) => {

                Object.setPrototypeOf(jectAnimaNow.jectParam,this.jectParam);
    
            });

        };

    };

};
class classAnimaTeamwise extends classAnimaCatalog {

    static jectTransmit = Object.assign(classAnimaCatalog.jectTransmit,{


        
    });

    constructor(jectTransmit = classAnimaTeamwise.jectTransmit) {
        
        super(jectTransmit);

        let {

        } = jectTransmit;

        this.numberAnimaDone = 0;
        this.numberAnimaCount = this.arrayJectAnima.length;

    };

    async functionExecute() {

        await new Promise((functionResolve) => {

            this.functionResolve = functionResolve;

            this.arrayJectAnima.forEach(async (jectAnimaNow) => {

                if (jectAnimaNow instanceof classAnima) {

                    if (!jectAnimaNow.jectParam.domElement) { jectAnimaNow.jectParam.domElement = this.domElement; };

                    await jectAnimaNow.functionExecute();
                
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

    static jectTransmit = Object.assign(classAnimaCatalog.jectTransmit,{



    });

    constructor(jectTransmit = classAnimaSequence.jectTransmit) {

        super(jectTransmit);

        let {



        } = jectTransmit;

    };

    async functionExecute() {

        for (let jectAnimaNow of this.arrayJectAnima) {

            if (jectAnimaNow instanceof classAnima) {
                
                await jectAnimaNow.functionExecute();
            
            };
            if (jectAnimaNow instanceof classAnimaTeamwise || jectAnimaNow instanceof classAnimaSequence) {
                
                await jectAnimaNow.functionExecute();
            
            };

        };

    };

};

class classAnimaDomMove extends classAnima {
    
    constructor(jectTransmit = classAnima.jectTransmit) {

        jectTransmit.functionAnima = async function(jectTransmit = classAnimaDomExpandParam.jectTransmit) {

            let {

                arrayNumberCountNow,
                arrayNumberCountEnd,

            } = this;

            let {

                domElement,

            } = jectTransmit;

            let {

                stringMeasure,
                numberPositionEndTop,
                numberPositionEndLeft,
                numberPositionEndRight,
                numberPositionBiasTop,
                numberPositionStartTop,
                numberPositionBiasLeft,
                numberPositionBiasRight,
                numberPositionEndBottom,
                numberPositionStartLeft,
                numberPositionBiasBottom,
                numberPositionStartRight,
                numberPositionStartBottom,

            } = jectTransmit;

            if ((numberPositionStartTop && numberPositionEndTop) || numberPositionBiasTop) {

                if (!numberPositionBiasTop) {

                    numberPositionBiasTop              = (numberPositionEndTop - numberPositionStartTop) / arrayNumberCountEnd[0];
                    jectTransmit.numberPositionBiasTop = numberPositionBiasTop;

                };

            };

            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `${numberPositionStartTop + numberPositionBiasTop * arrayNumberCountNow[0]}${stringMeasure}`,
                stringProperty: "top",

            });

        };

        super(jectTransmit);

    };

};
class classAnimaDomMoveParam extends classAnimaParam {

    static jectTransmit = Object.assign(classAnimaParam.jectTransmit,{

        numberPositionEndTop: NaN,
        numberPositionEndLeft: NaN,
        numberPositionBiasTop: NaN,
        numberPositionBiasLeft: NaN,
        numberPositionStartTop: NaN,
        numberPositionEndRight: NaN,
        numberPositionEndBottom: NaN,
        numberPositionStartLeft: NaN,
        numberPositionBiasRight: NaN,
        numberPositionBiasBottom: NaN,
        numberPositionStartRight: NaN,
        numberPositionStartBottom: NaN,
    
    });

    constructor(jectTransmit = classAnimaDomMoveParam.jectTransmit) {

        super(jectTransmit);

        let {

            numberPositionEndTop,
            numberPositionEndLeft,
            numberPositionBiasTop,
            numberPositionBiasLeft,
            numberPositionStartTop,
            numberPositionEndRight,
            numberPositionEndBottom,
            numberPositionStartLeft,
            numberPositionBiasRight,
            numberPositionBiasBottom,
            numberPositionStartRight,
            numberPositionStartBottom,

        } = jectTransmit;

        // Поля, хранящие конечные значения отступов;
        this.numberPositionEndTop = numberPositionEndTop;
        this.numberPositionEndLeft = numberPositionEndLeft;
        this.numberPositionEndRight = numberPositionEndRight;
        this.numberPositionEndBottom = numberPositionEndBottom;
        // Поля, хранящие смещения отсутпов;
        this.numberPositionBiasTop = numberPositionBiasTop;
        this.numberPositionBiasLeft = numberPositionBiasLeft;
        this.numberPositionBiasRight = numberPositionBiasRight;
        this.numberPositionBiasBottom = numberPositionBiasBottom;
        // Поля, хранящие начальные значения отступов;
        this.numberPositionStartTop = numberPositionStartTop;
        this.numberPositionStartLeft = numberPositionStartLeft;
        this.numberPositionStartRight = numberPositionStartRight;
        this.numberPositionStartBottom = numberPositionStartBottom;

    };

};

class classAnimaDomExpandParam extends classAnimaParam {

    static jectTransmit = Object.assign(classAnimaParam.jectTransmit,{

        numberWidthEnd: NaN,
        numberWidthBias: NaN,
        numberHeightEnd: NaN,
        numberMarginEnd: NaN,
        numberMarginBias: NaN,
        numberHeightBias: NaN,
        numberWidthStart: NaN,
        numberPaddingEnd: NaN,
        numberPaddingBias: NaN,
        numberHeightStart: NaN,
        numberMarginStart: NaN,
        numberPaddingStart: NaN,
        
    });

    constructor(jectTransmit = classAnimaDomExpandParam.jectTransmit) {

        super(jectTransmit);

        let {

            numberWidthEnd,
            numberWidthBias,
            numberHeightEnd,
            numberMarginEnd,
            numberMarginBias,
            numberWidthStart,
            numberPaddingEnd,
            numberHeightBias,
            numberMarginStart,
            numberHeightStart,
            numberPaddingBias,
            numberPaddingStart,

        } = jectTransmit;

        // Поля, хранящие конечные значения размеров;
        this.numberWidthEnd = numberWidthEnd;
        this.numberHeightEnd = numberHeightEnd;
        // Поля, хранящие смещения значений размеров;
        this.numberWidthBias = numberWidthBias;
        this.numberHeightBias = numberHeightBias;
        // Поля, хранящие начальные значения размеров;
        this.numberWidthStart = numberWidthStart;
        this.numberHeightStart = numberHeightStart;
        // Поля, хранящие конечные значения отступов;
        this.numberMarginEnd = numberMarginEnd;
        this.numberPaddingEnd = numberPaddingEnd;
        // Поля, хранящие смещения значений отступов;
        this.numberMarginBias = numberMarginBias;
        this.numberPaddingBias = numberPaddingBias;
        // Поля, хранящие начальные значения отступов;
        this.numberMarginStart = numberMarginStart;
        this.numberPaddingStart = numberPaddingStart;

    };

};
class classAnimaDomExpand extends classAnima {

    static jectTransmit = Object.assign(classAnima.jectTransmit,{

        jectParam: new classAnimaDomExpandParam(),
        
    });

    constructor(jectTransmit = classAnimaDomExpand.jectTransmit) {

        jectTransmit.functionAnima = async function(jectTransmit = classAnimaDomExpandParam.jectTransmit) {

            let {

                arrayNumberCountEnd,
                arrayNumberCountNow,

            } = this;

            let {

                domElement,
                stringMeasure,
                numberWidthEnd,
                numberHeightEnd,
                numberWidthBias,
                numberHeightBias,
                numberWidthStart,
                numberHeightStart,

            } = jectTransmit;

            if (!numberWidthStart) {

                numberWidthStart = functionStylePropertyGet({ domElement: domElement, stringProperty: "width", }).match(/\d+/)[0] - 0;
                jectTransmit.numberWidthStart = numberWidthStart;
                
            };
            if (!numberHeightStart) {

                numberHeightStart = functionStylePropertyGet({ domElement: domElement, stringProperty: "height", }).match(/\d+/)[0] - 0;
                jectTransmit.numberHeightStart = numberHeightStart;

            };
            if (typeof(numberWidthStart) === "number" && typeof(numberWidthEnd) === "number" && numberWidthStart !== numberWidthEnd && !numberWidthBias) {

                numberWidthBias = (numberWidthEnd - numberWidthStart) / arrayNumberCountEnd[0];
                jectTransmit.numberWidthBias = numberWidthBias;

            };
            if (typeof(numberHeightStart) === "number" && typeof(numberHeightEnd) === "number" && numberHeightStart !== numberHeightEnd && !numberHeightBias) {

                numberHeightBias = (numberHeightEnd - numberHeightStart) / arrayNumberCountEnd[0];
                jectTransmit.numberHeightBias = numberHeightBias;

            };

            if (numberWidthBias || numberHeightBias) {

                if (numberWidthBias) {

                    functionStylePropertySet({

                        domElement    : domElement,
                        stringValue   : `${numberWidthStart + numberWidthBias * arrayNumberCountNow[0]}${stringMeasure}`,
                        stringProperty: "width",

                    });

                };
                if (numberHeightBias) {



                };

            } else { this.arrayNumberCountNow[0] = this.arrayNumberCountEnd[0]; };

        };

        super(jectTransmit);

    };

};

class classAnimaDomTextBust extends classAnima {

    constructor(jectTransmit = classAnima.jectTransmit) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaDomTextBustParam({}),

        ) {

            let {

                boolSkip,
                arrayNumberCountNow,
                arrayNumberCountEnd,

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
                
                jectTransmit.arrayNumberCountNow[0] = arrayNumberCountNow[0];
            
                return;
            
            };

            let stringTextNow = functionDomElementTextGet({ domElement: domElement });

            if (arrayNumberCountEnd[0] === arrayNumberCountNow[0] || boolSkip) {
    
                functionDomElementTextChange({

                    domElement: domElement,
                    stringText: stringTextResult,

                });

            }
            else {

                if (stringTextNow.length > stringTextNeed.length) {
                    
                    if (Math.floor(arrayNumberCountEnd[0] / (stringTextNow.length - stringTextNeed.length)) % arrayNumberCountNow[0] === 0) {

                        stringTextNow = stringTextNow.slice(0,-1);

                    };
                
                }
                else if (stringTextNow.length < stringTextNeed.length) {
                    
                    if (Math.floor(arrayNumberCountEnd[0] / (stringTextNeed.length - stringTextNow.length)) % arrayNumberCountNow[0] === 0) {

                        stringTextNow += " ";

                    };
                
                };

                let arrayStringTextNow = stringTextNow.split("");

                arrayStringTextNow.forEach((stringSymbol,numberIndex) => {

                    if (stringSymbol !== stringTextNeed[numberIndex]) {

                        arrayStringTextNow[numberIndex] = arrayStringSymbol[functionNumberRandomGet({

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

    static jectTransmit = Object.assign(classAnimaParam.jectTransmit,{

        stringTextNeed: "",
        stringTextResult: "",
        
    });

    constructor(jectTransmit = classAnimaDomTextBustParam.jectTransmit) {

        super(jectTransmit);

        let {

            stringTextNeed,
            stringTextResult,

        } = jectTransmit;

        this.stringTextNeed = stringTextNeed;
        this.stringTextResult = stringTextResult;

    };

};

class classAnimaDomGradientWaveLinearTonTwoParam extends classAnimaParam {

    static jectTransmit = Object.assign(classAnimaParam.jectTransmit,{

        stringDirection: "to top",
        numberBorderTop: NaN,
        numberBorderBias: NaN,
        numberBorderLeft: NaN,
        numberBorderRight: NaN,
        numberBorderBottom: NaN,
        arrayNumberColorRGBA: [[NaN],[NaN]],

    });

    constructor(jectTransmit = classAnimaDomGradientWaveLinearTonTwoParam.jectTransmit) {

        super(jectTransmit);

        let {

            stringDirection,
            numberBorderTop,
            numberBorderBias,
            numberBorderLeft,
            numberBorderRight,
            numberBorderBottom,
            arrayNumberColorRGBA,

        } = jectTransmit;

        // Поле, хранящее направление смещения границы;
        this.stringDirection = stringDirection;
        // Поля, хранящие положение границы;
        this.numberBorderTop = numberBorderTop;
        this.numberBorderLeft = numberBorderLeft;
        this.numberBorderRight = numberBorderRight;
        this.numberBorderBottom = numberBorderBottom;
        // Поле, хранящее смещение положения границы;
        this.numberBorderBias = numberBorderBias;
        // Поле, хранящие массив задействованных цветов;
        this.arrayNumberColorRGBA = arrayNumberColorRGBA;

    };

};
class classAnimaDomGradientWaveLinearTonTwo extends classAnima {

    static jectTransmit = Object.assign(classAnima.jectTransmit,{

        jectParam: new classAnimaDomGradientWaveLinearTonTwoParam(),

    });

    constructor(jectTransmit = classAnimaDomGradientWaveLinearTonTwo.jectTransmit) {

        jectTransmit.functionAnima = async function(jectTransmit = classAnimaDomGradientWaveLinearTonTwoParam.jectTransmit) {

            let {

                arrayNumberCountNow,
                arrayNumberCountEnd,

            } = this;
            let {

                stringDirection,
                numberBorderTop,
                numberBorderBottom,

            } = jectTransmit;

            if (!jectTransmit.numberBorderBias) {
                
                switch (stringDirection) {

                    case "to top": jectTransmit.numberBorderBias = (numberBorderTop - numberBorderBottom) / arrayNumberCountEnd[0];

                };
            
            };

            let {

                domElement,
                numberBorderBias,
                stringMeasure,
                arrayNumberColorRGBA = [[0,0,0,255],[255,255,255,255]],

            } = jectTransmit;

            let numberValue = NaN;

            switch (stringDirection) {

                case "to top": { numberValue = numberBorderBottom + numberBorderBias * arrayNumberCountNow[0]; }; break;

            };

            functionStylePropertySet({

                domElement    : domElement,
                stringValue   : `linear-gradient(${stringDirection},rgba(${arrayNumberColorRGBA[0].join(",")}) ${numberValue}${stringMeasure},rgba(${arrayNumberColorRGBA[1].join(",")}))`,
                stringProperty: `background`,

            });

        };

        super(jectTransmit);

    };

};

functionResolveConnect();