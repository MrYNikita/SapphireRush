// Базовый класс;
class classBasic {

    static jectTransmit = {

        stringName: "",

    };

    constructor(jectTransmit = classBasic.jectTransmit) {

        let {

            stringName,

        } = jectTransmit;

        this.stringName = stringName;

    };

};

// Базовые классы: исполнители;
class classBasicExecutor extends classBasic {

    static jectTransmit = Object.assign(classBasic.jectTransmit,{

        boolCondition: false,
        jectCatalog: new Array() ?? new Map() ?? new Set(),
        functionExecute: new Function(),
        arrayFunctionExecute: [new Function()],
    
    });

    constructor(jectTransmit = classBasicExecutor.jectTransmit) {

        super(jectTransmit);

        let {

            jectCatalog,
            boolCondition,
            functionExecute,
            arrayFunctionExecute,

        } = jectTransmit;

        if (functionExecute) {
            
            arrayFunctionExecute = [functionExecute];
        
        } else if (arrayFunctionExecute instanceof Array) {

            arrayFunctionExecute = functionArrayFilter({ arrayJect: arrayFunctionExecute, classNeed: Function, });

        };

        if (jectCatalog instanceof Array) { jectCatalog.push(this); } else if (jectCatalog instanceof Map || jectCatalog instanceof Set) { jectCatalog.add(this); };

        this.boolCondition = (boolCondition !== false) ? true : false;
        this.arrayFunctionExecute = arrayFunctionExecute ?? [];

    };

    functionDelete() {

        // Удаление исполнителя из каталога исполнителей;
        if (this.jectCatalog instanceof Array) { functionArrayRemove({ arrayJect: this.jectCatalog, jectRemove: this }); } else if (this.jectCatalog instanceof Map || this.jectCatalog instanceof Set) { this.jectCatalog.delete(this); };

    };

    async functionExecute() {

        functionArrayFunctionExecute.apply(this,[this.arrayFunctionExecute]);

    };

};
class classBasicExecutorTime extends classBasicExecutor {

    /*
        Временной исполнитель - это обертка над интервалом созданная от исполнителей. Основная задача временного исполнителя - выполнять опредленные действия с
        привязкой ко времени исполнения. Для наследников данного класса можно указать собственные правила работы во времени;

        Временные исполнители обладают рядом свойств:
        * boolSkip - пропуск исполнителя - если значение истиное, то исполнитель моментально завершается;
        * numberSpeed - скорость исполнителя - определяет частоту срабатывания исполнителя;
        * numberCountFinish - конечное кол-во итераций - определяет 
        * numberCountNow - кол-во отработанных итераций - определяет кол-во отработанных на данный момент итераций;
        * functionExecuteDone - функция завершения ожидания - функция, вызов который уведомляет программу, что дожидаться исполнителя более не нужно;
         
        Временные исполнители имеют несколько массивов для выполнения функций на разных этапах своего исполнения:
        * arrayFunctionFinish - конечные функции - функции, которые выполняются при завершении работы исполнителя;
        * arrayFunctionPermanent - постоянные функции - функции, которые выполняются при на каждой итерации исполнителя;
        * arrayFunctionConditional - условные функции - функции, которые выполняются при выполнении условия;
    */

    static jectTransmit = Object.assign(classBasicExecutor.jectTransmit,{

        boolSkip: false,
        boolReverse: false,
        numberSpeed: NaN,
        numberSpeedMode: NaN,
        numberCountFinish: NaN,
        arrayFunctionFinish: [new Function()],
        arrayFunctionPermanent: [new Function()],
        arrayFunctionConditional: [new Function()],
        
    });

    constructor (jectTransmit = classBasicExecutorTime.jectTransmit) {

        super(jectTransmit);

        let {

            boolSkip,
            numberSpeed,
            numberSpeedMode,
            numberCountFinish,
            arrayFunctionFinish,
            arrayFunctionPermanent,
            arrayFunctionConditional,

        } = jectTransmit;

        // Поле, хранящее значение пропуска исполнителя;
        this.boolSkip = (boolSkip) ? true : jectConfigurate.boolSkipExecutor;
        // Поле, хранящее значение скорости работы;
        this.numberSpeed = ((numberSpeed) ? numberSpeed : jectConfigurate.numberDefaultSpeedExecutor) * (numberSpeedMode ?? 1);
        // Поле, хранящее индекс интервала;
        this.jectInterval = NaN;
        // Поле, хранящее индекс текущей итерации;
        this.numberCountNow = 1;
        // Поле, хранящее номер конечной итерации;
        this.numberCountFinish = (numberCountFinish) ? numberCountFinish : jectConfigurate.numberDefaultCountFinishExecutor;
        // Поле, хранящее функция прерывания промиса;
        this.functionExecuteDone = new Function();
        // Поле, хранящее функции итогового исполнения; 
        this.arrayFunctionFinish = arrayFunctionFinish ?? [];
        // Поле, хранящее функции постоянного исполнения;
        this.arrayFunctionPermanent = arrayFunctionPermanent ?? [];
        // Поле, хранящее функции условного исполнения;
        this.arrayFunctionConditional = arrayFunctionConditional ?? [];
        // Поле, хранящее объект функций;
        this.jectFunction = {

            functionFinish() {

                let boolFinish = false;

                switch(this.constructor.name) {

                    case classBasicTimer.name: {

                        if (this.numberCountNow <= this.numberCountFinish) { boolFinish = true; };

                    } break;
                    case classBasicTicker.name: {

                        if (this.numberCountNow === this.numberCountFinish) {

                            let numberBuffer = this.numberCountBegin;

                            this.boolReverse = !this.boolReverse;
                            this.numberCountBegin = this.numberCountFinish;
                            this.numberCountFinish = numberBuffer;

                        };

                    } break;
                    case classBasicWalker.name: {

                        if (

                            functionArrayPointEquals(

                                this.arrayNumberPointNow,
                                this.arrayNumberPointNext

                            )

                        ) {

                            this.arrayNumberPointLast = this.arrayNumberPointNext;
                            this.arrayNumberPointNext = functionArrayNext({ arrayNow: this.arrayNumberPoint, jectNow: this.arrayNumberPointNext });

                            this.jectFunction.functionBiasChange();

                        };
                        if (

                            functionArrayPointEquals(

                                this.arrayNumberPointNow,
                                this.arrayNumberPoint.at(-1)

                            ) && this.boolDefenite && this.arrayNumberPointLast === this.arrayNumberPoint.at(-1)

                        ) {

                            boolFinish = true;

                        };

                    }; break;
                    case classBasicHoarder.name: {

                        if (this.boolReverse && this.numberCountNow <= this.numberCountFinish) { boolFinish = true; }
                        else if (!this.boolReverse && this.numberCountNow >= this.numberCountFinish) { boolFinish = true; };

                    } break;
                    case classBasicRepeater.name: {

                        if (this.boolReverse && this.numberCountNow <= this.numberCountFinish) { boolFinish = true; }
                        else if (!this.boolReverse && this.numberCountNow >= this.numberCountFinish) { boolFinish = true; };

                    } break;

                };

                if(this.boolSkip) {

                    switch(this.constructor.name) {

                        case classBasicWalker.name: {



                        }; break;
                        default: {

                            // Завершение исполнения;
                            boolFinish = true;
                            // Переопределение счетчика текущей итерации;
                            this.numberCountNow = this.numberCountFinish;
                            // Выполнение функции продолжения;
                            this.jectFunction.functionConditionalExecute.apply(this);

                        } break;

                    };

                };
                if(boolFinish) {
                    
                    this.functionRedefenite();
                
                };

            },
            functionPermanent() {

                functionArrayFunctionExecute(this.arrayFunctionPermanent);

            },
            functionConditional() {
                
                if (this.boolCondition) { functionArrayFunctionExecute(this.arrayFunctionConditional); };

            },
            functionCountNowChange() {

                switch (this.constructor.name) {

                    case classBasicTimer.name: {

                        if (this.boolCondition) { this.numberCountNow++ };

                    } break;
                    case classBasicWalker.name: {

                        if (functionArrayPointEquals(this.arrayNumberPointNow,this.arrayNumberPoint[0])) { this.numberCountNow++; };

                    };
                    case classBasicTicker.name: {

                        if (this.boolCondition) {

                            if (this.boolReverse && this.numberCountNow > this.numberCountFinish) { this.numberCountNow--; }
                            else if (!this.boolReverse && this.numberCountNow < this.numberCountFinish) { this.numberCountNow++; };

                        };

                    }; break;
                    case classBasicHoarder.name: {

                        if (this.boolCondition) {

                            if (this.boolReverse && this.numberCountNow > this.numberCountFinish) { this.numberCountNow--; }
                            else if (!this.boolReverse && this.numberCountNow < this.numberCountFinish) { this.numberCountNow++; };

                        }
                        else {

                            if (this.boolReverse && this.numberCountNow < this.numberCountBegin) { this.numberCountNow++; }
                            else if (!this.boolReverse && this.numberCountNow > this.numberCountBegin) { this.numberCountNow--; };

                        };


                    } break;
                    case classBasicRepeater.name: {

                        if (this.boolCondition) {

                            if (this.boolReverse && this.numberCountNow > this.numberCountFinish) { this.numberCountNow--; }
                            else if (!this.boolReverse && this.numberCountNow < this.numberCountFinish) { this.numberCountNow++; };

                        };

                    } break;

                };

            },
            functionConditionalExecute() {

                throw new Error("WW");

            },

        };

    };

    // Функция остановки исполнителя;
    functionStop() {

        // Очистка интервала;
        clearInterval(this.jectInterval);
        // Очитска переменной интервала;
        this.jectInterval = undefined;

    };
    // Функция обновления исполнителя;
    functionUpdate(jectTransmit) {

        if (jectTransmit) {
            
            jectTransmit.forEach((arrayJectPairNow) => {

                if (this[arrayJectPairNow[0]]) {
                    
                    this[arrayJectPairNow[0]] = arrayJectPairNow[1];
                
                };
    
            });
    
            this.functionStop({});
            this.functionContinue({});

        };

    };
    // Функция продолжения исполнителя;
    functionContinue() {

        this.functionStop();

        this.jectInterval = setInterval(() => {

            this.jectFunction.functionPermanent.apply(this);
            this.jectFunction.functionConditionalExecute();
            this.jectFunction.functionFinish.apply(this);
            this.jectFunction.functionConditional.apply(this);
            this.jectFunction.functionCountNowChange.apply(this);

        },this.numberSpeed);

    };
    // Функция завершения исполнителя;
    functionRedefenite() {

        // Прекращение выполнения исполнителя;
        this.functionStop();
        // Удаление исполнителя из каталога исполнения;
        this.functionDelete();
        // Потверждение завершения работы исполнителя;
        this.functionExecuteDone();
        // Исполнение завершающих функций;  
        functionArrayFunctionExecute(this.arrayFunctionFinish);

    };
    // Асинхронная функция запуска временного исполнителя;
    async functionBegin() {

        // Ожидание выполнения функций исполнителем;
        await new Promise((functionResolve) => {

            // Переопределение функции завершения исполнения для исполнителя;
            this.functionExecuteDone = functionResolve;
            // Если исполнитель необходимо пропустить, то он немедленно завершается;
            if (this.boolSkip) {

                this.jectFunction.functionFinish.apply(this);

            }
            // Иначе, исполнитель продолжает работать в обычном режиме;
            else {

                this.functionContinue({});

            };

        });

    };

};

// Базовые исполнители: таймеры;
class classBasicTimer extends classBasicExecutorTime {

    static jectTransmit = Object.assign(classBasicExecutorTime.jectTransmit,{});

    constructor (jectTransmit = classBasicTimer.jectTransmit) {
        
        super(jectTransmit);
    
        this.jectFunction.functionConditionalExecute = () => {

            if (this.numberCountNow === this.numberCountFinish) {

                this.functionExecute();

            };

        };
    
    };

};

// Базовые исполнители: повторители;
class classBasicRepeater extends classBasicExecutorTime {

    static jectTransmit = Object.assign(classBasicExecutorTime.jectTransmit,{

        boolReverse: false,

    });

    constructor (jectTransmit = classBasicRepeater.jectTransmit) {
        
        super(jectTransmit);

        let {

            boolReverse,

        } = jectTransmit;

        // Поле, хранящее значение обратного порядка исполнения;
        this.boolReverse = (boolReverse) ? true : false;
        // Если активирован реверсивный режим, то происходит перестановка границ счетчика;
        if (boolReverse) {

            this.numberCountNow = this.numberCountFinish;
            this.numberCountFinish = 1;

        };

        this.jectFunction.functionConditionalExecute = () => {

            if (
                
                (this.boolReverse && this.numberCountNow >= this.numberCountFinish) ||
                (!this.boolReverse && this.numberCountNow <= this.numberCountFinish)

            ) { this.functionExecute(); };

        };
    
    };

};

// Базовые исполнители: накопители;
class classBasicHoarder extends classBasicRepeater {

    static jectTransmit = Object.assign(classBasicRepeater.jectTransmit,{});

    constructor (jectTransmit = classBasicHoarder.jectTransmit) {
        
        super(jectTransmit);
    
        this.numberCountBegin = this.numberCountNow;

        this.jectFunction.functionConditionalExecute = () => {

            if (

                (this.boolReverse && this.numberCountNow >= this.numberCountFinish) ||
                (!this.boolReverse && this.numberCountNow <= this.numberCountFinish)
                
            ) { this.functionExecute(); };

        };
    
    };

};

// Базовые исполнители: маятники;
class classBasicTicker extends classBasicHoarder {

    static jectTransmit = Object.assign(classBasicRepeater.jectTransmit,{

        boolDirection: false,
        numberIterate: NaN,

    });

    constructor (jectTransmit = classBasicTicker.jectTransmit) {
    
        super(jectTransmit);

        let {

            boolDirection,
            numberIterate,

        } = jectTransmit;

        this.boolDirection = (boolDirection ?? true) ? true : false;
        this.numberIterate = numberIterate;

        this.jectFunction.functionConditionalExecute = () => { this.functionExecute(); };

    };

};

// Базовые исполнители: шагоходы;
class classBasicWalker extends classBasicExecutorTime {

    static jectTransmit = Object.assign(classBasicExecutorTime.jectTransmit,{

        boolSync: false,
        boolSmooth: false,
        boolInstant: false,
        boolDefenite: false,
        boolCentripetal: false,
        arrayNumberPoint: [[NaN],[NaN,NaN]],
        numberIndexPointNow: NaN,
        arrayNumberPointNow: [NaN,NaN],
        
    });

    constructor (jectTransmit = classBasicWalker.jectTransmit) {

        super(jectTransmit);

        let {

            boolSync,
            boolSmooth,
            boolInstant,
            boolDefenite,
            boolCentripetal,
            arrayNumberPoint,
            numberIndexPointNow,
            arrayNumberPointNow,

        } = jectTransmit;

        // Поле, хранящее значение синхронности перехода;
        this.boolSync = (boolSync) ? true : false;
        // Поле, хранящее значение плавности шагохода;
        this.boolSmooth = (boolSmooth) ? true : false;
        // Поле, хранящее значение моментальности перехода;
        this.boolInstant = (boolInstant) ? true : false;
        // Поле, хранящее значение конечности шагохода;
        this.boolDefenite = (boolDefenite) ? true : false;
        // Поле, хранящее значение центростремления шагахода;
        this.boolCentripetal = (boolCentripetal) ? true : false;
        // Поле, хранящее координаты точек, необходимых к обходу;
        this.arrayNumberPoint = arrayNumberPoint ?? [];
        // Поле, хранящее координату текущей точки;
        this.arrayNumberPointNow = (arrayNumberPoint.includes(arrayNumberPointNow)) ? arrayNumberPointNow.slice() : (arrayNumberPoint[numberIndexPointNow]) ? arrayNumberPoint[numberIndexPointNow].slice() : arrayNumberPoint[0].slice();
        // Поле, хранящее координату предыдущей точки;
        this.arrayNumberPointLast = this.arrayNumberPointNow;
        // Поле, хранящее координату следующей точки;
        this.arrayNumberPointNext = functionArrayNext({ arrayNow: this.arrayNumberPoint, jectNow: this.arrayNumberPointNow });
        // Поле, хранящее смещения по координатам;
        this.arrayNumberPointBias = new Array(this.arrayNumberPoint[0].length).fill(0);
        // Поле, хранящее центральную координату;
        this.arrayNumberPointCenter = this.arrayNumberPoint[0];

        if (this.boolCentripetal) {

            let arrayNumberPointNew = this.arrayNumberPoint.splice(0,2);
            
            this.arrayNumberPoint = this.arrayNumberPoint.reverse();

            while (this.arrayNumberPoint.length) {

                const arrayNumberPointNow = this.arrayNumberPoint.pop();

                arrayNumberPointNew = [...arrayNumberPointNew,arrayNumberPointNow,this.arrayNumberPointCenter.slice(),arrayNumberPointNow.slice()];

            };

            arrayNumberPointNew.push(arrayNumberPointNew[1].slice());

            this.arrayNumberPoint = arrayNumberPointNew;

        };
        if (this.boolInstant) {

            this.boolSync = false;
            this.boolSmooth = false;

        }
        else if (this.boolSync || this.boolSmooth) {
            
            this.boolInstant = false;
        
        };

        this.jectFunction.functionBiasChange = () => {

            const numberPathLess = (this.boolSync) ? this.arrayNumberPointNow.reduce((numberPathNow,numberPathLast,numberIndexNow) => {

                numberPathLast = numberPathNow;
                numberPathNow = functionNumberCalculatePath(

                    this.arrayNumberPointNow[numberIndexNow],
                    this.arrayNumberPointNext[numberIndexNow]

                );

                if (numberPathNow === 0) { return numberPathLast; };
                if (numberPathLast && numberPathNow > numberPathLast) { numberPathNow = numberPathLast; };

                return numberPathNow;

            },undefined) ?? 1 : 1;

            this.arrayNumberPointBias.forEach((numberBiasNow,numberIndexNow) => {

                let numberModeBias = 1;

                const numberPathNow = (this.boolSync) ? functionNumberCalculatePath(

                    this.arrayNumberPointNow[numberIndexNow],
                    this.arrayNumberPointNext[numberIndexNow]

                ) : 1;

                if (numberPathNow !== numberPathLess) { numberModeBias = numberPathNow / numberPathLess; };

                if (this.arrayNumberPointNow[numberIndexNow] < this.arrayNumberPointNext[numberIndexNow]) {

                    this.arrayNumberPointBias[numberIndexNow] = 1 * numberModeBias;
    
                }
                else if (this.arrayNumberPointNow[numberIndexNow] > this.arrayNumberPointNext[numberIndexNow]) {
    
                    this.arrayNumberPointBias[numberIndexNow] = -1 * numberModeBias;
    
                }
                else {

                    this.arrayNumberPointBias[numberIndexNow] = 0;

                };

            });

        };
        this.jectFunction.functionPointNowChange = () => {

            this.arrayNumberPointNow.forEach((numberCordNow,numberIndexNow) => {

                this.arrayNumberPointNow[numberIndexNow] += this.arrayNumberPointBias[numberIndexNow];

                if (
                    
                    this.boolInstant ||
                    this.arrayNumberPointBias[numberIndexNow] > 0 && this.arrayNumberPointNow[numberIndexNow] >= this.arrayNumberPointNext[numberIndexNow] ||
                    this.arrayNumberPointBias[numberIndexNow] < 0 && this.arrayNumberPointNow[numberIndexNow] <= this.arrayNumberPointNext[numberIndexNow]
                
                ) {

                    this.arrayNumberPointBias[numberIndexNow] = 0;
                    this.arrayNumberPointNow[numberIndexNow] = this.arrayNumberPointNext[numberIndexNow];

                };

            });

        };
        this.jectFunction.functionConditionalExecute = () => {

            this.jectFunction.functionPointNowChange();

        };

        this.arrayFunctionConditional.push(() => { this.functionExecute(); });

        this.jectFunction.functionBiasChange();

    };

};


functionResolveConnect();