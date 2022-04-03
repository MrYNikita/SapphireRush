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
        numberSpeedMode: NaN,

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
            numberSpeedMode,

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

    };

    // Функция начинающая исполнение анимации;
    async functionExecute() {

        this.jectExecutor = new this.classExecutor({

            boolSkip: this.boolSkip,
            jectParam: this.jectParam,
            stringName: `${this.stringName}Executor`,
            numberSpeed: this.numberSpeed,
            functionExecute: this.functionAnima,

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

    static jectTransmit = Object.assign(classAnimaSequence.jectTransmit,{



    });

    constructor(jectTransmit = classAnimaSequence.jectTransmit) {

        super(jectTransmit);

        let {



        } = jectTransmit;

    };

    async functionExecute() {

        for (let jectAnimaNow of this.arrayJectAnima) {

            if (jectAnimaNow instanceof classAnima) {
                
                if (!jectAnimaNow.jectParam.domElement) { jectAnimaNow.jectParam.domElement = this.domElement; };

                await jectAnimaNow.functionExecute();
            
            };
            if (jectAnimaNow instanceof classAnimaTeamwise || jectAnimaNow instanceof classAnimaSequence) {
                
                if (!jectAnimaNow.domElement) { jectAnimaNow.domElement = this.domElement; };

                await jectAnimaNow.functionExecute();
            
            };

        };

    };

};

class classAnimaDomMove extends classAnima {
    
    constructor(jectTransmit = classAnima.jectTransmit) {

        jectTransmit.functionAnima = async function(

            jectTransmit = new classAnimaParam({}),

        ) {

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
                stringValue   : `${numberPositionStartTop + numberPositionBiasTop * numberIterateNow}${stringMeasure}`,
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

class classAnimaDomExpand extends classAnima {

    constructor(jectTransmit = classAnima.jectTransmit) {

        jectTransmit.functionAnima = async function(jectTransmit = new classAnimaDomExpandParam()) {

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

    static jectTransmit = Object.assign(classAnimaParam.jectTransmit,{

        numberWidthEnd: NaN,
        numberHeightEnd: NaN,
        numberMarginEnd: NaN,
        numberWidthStart: NaN,
        numberPaddingEnd: NaN,
        numberHeightStart: NaN,
        numberMarginStart: NaN,
        numberPaddingStart: NaN,
        
    });

    constructor(jectTransmit = classAnimaDomExpandParam.jectTransmit) {

        super(jectTransmit);

        let {

            numberWidthEnd,
            numberHeightEnd,
            numberMarginEnd,
            numberWidthStart,
            numberPaddingEnd,
            numberMarginStart,
            numberHeightStart,
            numberPaddingStart,

        } = jectTransmit;

        // Поля, хранящие конечные значения размеров;
        this.numberWidthEnd = numberWidthEnd;
        this.numberHeightEnd = numberHeightEnd;
        // Поля, хранящие начальные значения размеров;
        this.numberWidthStart = numberWidthStart;
        this.numberHeightStart = numberHeightStart;
        // Поля, хранящие конечные значения отступов;
        this.numberMarginEnd = numberMarginEnd;
        this.numberPaddingEnd = numberPaddingEnd;
        // Поля, хранящие начальные значения отступов;
        this.numberMarginStart = numberMarginStart;
        this.numberPaddingStart = numberPaddingStart;

    };

};

class classAnimaDomTextBust extends classAnima {

    constructor(jectTransmit = classAnima.jectTransmit) {

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

functionResolveConnect();