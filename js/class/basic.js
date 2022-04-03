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
class classBasicImplementing extends classBasic {

    static jectTransmit = Object.assign(classBasic.jectTransmit,{

        jectCatalog: new Array() ?? new Map() ?? new Set(),
        
    });

    constructor(jectTransmit = classBasicImplementing.jectTransmit) {

        super(jectTransmit);

        let {

            jectCatalog,

        } = jectTransmit;

        if (jectCatalog instanceof Array) { jectCatalog.push(this); } else if (jectCatalog instanceof Map || jectCatalog instanceof Set) { jectCatalog.add(this); };

    };

};

// Базовые классы: исполнители;
class classBasicExecutor extends classBasicImplementing {

    static jectTransmit = Object.assign(classBasic.jectTransmit,{

        jectParam: {},
        boolCondition: false,
        functionExecute: new Function(),
        arrayFunctionExecute: [new Function()],
    
    });

    constructor(jectTransmit = classBasicExecutor.jectTransmit) {

        super(jectTransmit);

        let {

            jectParam = {},
            boolCondition,
            functionExecute,
            arrayFunctionExecute,

        } = jectTransmit;

        if (functionExecute) {
            
            arrayFunctionExecute = [functionExecute];
        
        } else if (arrayFunctionExecute instanceof Array) {

            arrayFunctionExecute = functionArrayFilter({ arrayJect: arrayFunctionExecute, classNeed: Function, });

        };

        this.setMemory = new Set();
        this.jectParam = jectParam;
        this.boolCondition = (boolCondition !== false) ? true : false;
        this.arrayFunctionExecute = arrayFunctionExecute ?? [];

    };

    functionDelete() {

        // Удаление исполнителя из каталога исполнителей;
        if (this.jectCatalog instanceof Array) { functionArrayRemove({ arrayJect: this.jectCatalog, jectRemove: this }); } else if (this.jectCatalog instanceof Map || this.jectCatalog instanceof Set) { this.jectCatalog.delete(this); };

    };

    async functionExecute() {

        functionArrayFunctionExecute.apply(this,[this.arrayFunctionExecute,[this.jectParam]]);

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
        this.numberCountEnd = (numberCountFinish) ? numberCountFinish : jectConfigurate.numberDefaultCountFinishExecutor;
        // Поле, хранящее текущее значение счетчиков;
        this.arrayNumberCountNow = [this.numberCountNow];
        // Поле, хранящее функция прерывания промиса;
        this.functionExecuteDone = new Function();
        // Поле, хранящее функции итогового исполнения; 
        this.arrayFunctionFinish = arrayFunctionFinish ?? [];
        // Поле, хранящее конечное значение счетчика;
        this.arrayNumberCountEnd = [this.numberCountEnd];
        // Поле, хранящее функции постоянного исполнения;
        this.arrayFunctionPermanent = arrayFunctionPermanent ?? [];
        // Поле, хранящее функции условного исполнения;
        this.arrayFunctionConditional = arrayFunctionConditional ?? [];
        // Функция пропуска исполнителя;
        this._functionSkip = function () {

            if (this.boolSkip) {

                this.functionSkip();

                return true;

            };

        };
        // Функция выполнения исполнителя;
        this._functionCompletion = function () {

            // Переопределения текущего счетчика путем копирования значений конечного предела;
            this.arrayNumberCountNow = this.arrayNumberCountEnd.slice();
            // Итоговое выполнение основных функций исполнителем;
            this.functionExecute();
            // Завершение работы исполнителя;
            this.functionInterrupt();

        };
        // Функция изменения счетчика исполнителя;
        this._functionCountNowChange = function () {


        };
        // Функция условного выполнения исполнителя;
        this._functionConditionalExecute = function () {

            
        };
        // Функция условного завершения исполнителя;
        this._functionConditionalCompletion = function () {


        };

    };

    // Функция остановки исполнителя;
    functionStop() {

        // Очистка интервала;
        clearInterval(this.jectInterval);
        // Очитска переменной интервала;
        this.jectInterval = undefined;

    };
    // Функция пропуска исполнителя;
    functionSkip() {

        // Установка значения пропуска;
        this.boolSkip = true;
        // Установка счетчика по итоговым значениям;
        this.arrayNumberCountNow.forEach((numberCountNow,numberIndexNow) => { this.arrayNumberCountNow[numberIndexNow] = this.arrayNumberCountEnd[numberIndexNow]; });
        // Выполнение функции исполнителя с максимальным счетчиком;
        this.jectFunction.functionCompletion.apply(this);
        // Завершение исполнителя;
        this.functionInterrupt();

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

            if (
                
                this._functionSkip() ||
                this._functionConditionalCompletion()
                
            ) { return; };

            this._functionConditionalExecute();
            this._functionCountNowChange();

        },this.numberSpeed);

    };
    // Функция прерывание исполнителя;
    functionInterrupt() {

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

                this.functionSkip();

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
    
        this._functionCountNowChange = function () {

            if(this.boolCondition) { this.arrayNumberCountNow[0]++; };

        };
        this._functionConditionalExecute = function () {
            
            
        
        };
        this._functionConditionalCompletion = function () {

            if (functionArrayPointEquals(this.arrayNumberCountNow,this.arrayNumberCountEnd)) { this._functionCompletion(); };
        
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

            this.numberCountNow = this.numberCountEnd;
            this.numberCountEnd = 1;

        };

        this._functionCountNowChange = function () {

            if (this.boolCondition) {

                if (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]--; }
                else if (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]++; };

            };

        };
        this._functionConditionalExecute = function () {

            if (
                
                (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayFunctionFinish[0]) ||
                (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0])

            ) { this.functionExecute(); };

        };
        this._functionConditionalCompletion = function () {

            if (
                
                (this.boolReverse && this.arrayNumberCountNow[0] <= this.arrayNumberCountEnd[0]) ||
                (!this.boolReverse && this.arrayNumberCountNow[0] >= this.arrayNumberCountEnd[0])

            ) { this._functionCompletion(); };

        };
    
    };

};

// Базовые исполнители: накопители;
class classBasicHoarder extends classBasicRepeater {

    static jectTransmit = Object.assign(classBasicRepeater.jectTransmit,{});

    constructor (jectTransmit = classBasicHoarder.jectTransmit) {
        
        super(jectTransmit);
    
        this.numberCountBegin = this.numberCountNow;

        this.arrayNumberCountStart = [this.numberCountBegin];

        this._functionCountNowChange = function () {

            if (this.boolCondition) {

                if (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]--; }
                else if (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]++; };

            }
            else {

                if (this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountStart[0]) { this.arrayNumberCountNow[0]++; }
                else if (!this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountStart[0]) { this.arrayNumberCountNow[0]--; };

            };

        };
        this._functionConditionalExecute = function () {

            if (

                (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountEnd[0]) ||
                (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0])
                
            ) { this.functionExecute(); };

        };
        this._functionConditionalCompletion = function () {

            if (
                
                (this.boolReverse && this.arrayNumberCountNow[0] <= this.arrayNumberCountEnd[0]) ||
                (!this.boolReverse && this.arrayNumberCountNow[0] >= this.arrayNumberCountEnd[0])
                
            ) { this._functionCompletion(); };

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
        
        this._functionCountNowChange = function () {

            if (this.boolCondition) {

                if (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]--; }
                else if (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0]) { this.arrayNumberCountNow[0]++; };

            };

        };
        this._functionConditionalExecute = function () {

            if (

                (this.boolReverse && this.arrayNumberCountNow[0] > this.arrayNumberCountEnd[0]) ||
                (!this.boolReverse && this.arrayNumberCountNow[0] < this.arrayNumberCountEnd[0])
                
            ) { this.functionExecute(); };

        };
        this._functionConditionalCompletion = function () {

            // Проверка на совпадение значений счетчика и его предела;
            if (this.arrayNumberCountNow[0] === this.arrayNumberCountEnd[0]) {

                // Изменение направления маятника;
                this.boolReverse = !this.boolReverse;
                // Обмен значениями между предалами счетчика;
                [this.arrayNumberCountStart[0],this.arrayNumberCountEnd[0]] = [this.arrayNumberCountEnd[0],this.arrayNumberCountStart[0]];

            };

        };

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
        arrayNumberCount: [[NaN],[NaN,NaN]],
        numberIndexCountNow: NaN,
        arrayNumberCountNow: [NaN,NaN],
        
    });

    constructor (jectTransmit = classBasicWalker.jectTransmit) {

        super(jectTransmit);

        let {

            boolSync,
            boolSmooth,
            boolInstant,
            boolDefenite,
            boolCentripetal,
            arrayNumberCount,
            numberIndexCountNow,
            arrayNumberCountNow,

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
        this.arrayNumberCount = arrayNumberCount ?? [];
        // Поле, хранящее координату текущей точки;
        this.arrayNumberCountNow = (arrayNumberCount.includes(arrayNumberCountNow)) ? arrayNumberCountNow.slice() : (arrayNumberCount[numberIndexCountNow]) ? arrayNumberCount[numberIndexCountNow].slice() : arrayNumberCount[0].slice();
        // Поле, хранящее координату предыдущей точки;
        this.arrayNumberCountStart = this.arrayNumberCountNow;
        // Поле, хранящее координату следующей точки;
        this.arrayNumberCountEnd = functionArrayNext({ arrayNow: this.arrayNumberCount, jectNow: this.arrayNumberCountNow });
        // Поле, хранящее смещения по координатам;
        this.arrayNumberCountBias = new Array(this.arrayNumberCount[0].length).fill(0);
        // Поле, хранящее центральную координату;
        this.arrayNumberCountCenter = this.arrayNumberCount[0];

        if (this.boolCentripetal) {

            let arrayNumberPointNew = this.arrayNumberCount.splice(0,2);
            
            this.arrayNumberCount = this.arrayNumberCount.reverse();

            while (this.arrayNumberCount.length) {

                const arrayNumberPointNow = this.arrayNumberCount.pop();

                arrayNumberPointNew = [...arrayNumberPointNew,arrayNumberPointNow,this.arrayNumberCountCenter.slice(),arrayNumberPointNow.slice()];

            };

            arrayNumberPointNew.push(arrayNumberPointNew[1].slice());

            this.arrayNumberCount = arrayNumberPointNew;

        };
        if (this.boolInstant) {

            this.boolSync = false;
            this.boolSmooth = false;

        }
        else if (this.boolSync || this.boolSmooth) {
            
            this.boolInstant = false;
        
        };

        this._functionBiasChange = function () {

            const numberPathLess = (this.boolSync) ? this.arrayNumberCountNow.reduce((numberPathNow,numberPathLast,numberIndexNow) => {

                numberPathLast = numberPathNow;
                numberPathNow = functionNumberCalculatePath(

                    this.arrayNumberCountNow[numberIndexNow],
                    this.arrayNumberCountEnd[numberIndexNow]

                );

                if (numberPathNow === 0) { return numberPathLast; };
                if (numberPathLast && numberPathNow > numberPathLast) { numberPathNow = numberPathLast; };

                return numberPathNow;

            },undefined) ?? 1 : 1;

            this.arrayNumberCountBias.forEach((numberBiasNow,numberIndexNow) => {

                let numberModeBias = 1;

                const numberPathNow = (this.boolSync) ? functionNumberCalculatePath(

                    this.arrayNumberCountNow[numberIndexNow],
                    this.arrayNumberCountEnd[numberIndexNow]

                ) : 1;

                if (numberPathNow !== numberPathLess) { numberModeBias = numberPathNow / numberPathLess; };

                if (this.arrayNumberCountNow[numberIndexNow] < this.arrayNumberCountEnd[numberIndexNow]) {

                    this.arrayNumberCountBias[numberIndexNow] = 1 * numberModeBias;
    
                }
                else if (this.arrayNumberCountNow[numberIndexNow] > this.arrayNumberCountEnd[numberIndexNow]) {
    
                    this.arrayNumberCountBias[numberIndexNow] = -1 * numberModeBias;
    
                }
                else {

                    this.arrayNumberCountBias[numberIndexNow] = 0;

                };

            });

        };
        this._functionCountNowChange = function () {

            this.arrayNumberCountNow.forEach((numberCordNow,numberIndexNow) => {

                this.arrayNumberCountNow[numberIndexNow] += this.arrayNumberCountBias[numberIndexNow];

                if (
                    
                    this.boolInstant ||
                    this.arrayNumberCountBias[numberIndexNow] > 0 && this.arrayNumberCountNow[numberIndexNow] >= this.arrayNumberCountEnd[numberIndexNow] ||
                    this.arrayNumberCountBias[numberIndexNow] < 0 && this.arrayNumberCountNow[numberIndexNow] <= this.arrayNumberCountEnd[numberIndexNow]
                
                ) {

                    this.arrayNumberCountBias[numberIndexNow] = 0;
                    this.arrayNumberCountNow[numberIndexNow] = this.arrayNumberCountEnd[numberIndexNow];

                };

            });

        };
        this._functionConditionalExecute = function () {

            functionArrayFunctionExecute(this.arrayFunctionConditional);

        };
        this._functionConditionalCompletion = function () {

            if (

                functionArrayPointEquals(

                    this.arrayNumberCountNow,
                    this.arrayNumberCountEnd

                )

            ) {

                this.arrayNumberCountStart = this.arrayNumberCountEnd;
                this.arrayNumberCountEnd = functionArrayNext({ arrayNow: this.arrayNumberCount, jectNow: this.arrayNumberCountEnd });

                this._functionBiasChange();

            };
            if (

                functionArrayPointEquals(

                    this.arrayNumberCountNow,
                    this.arrayNumberCount.at(-1)

                ) && this.boolDefenite && this.arrayNumberCountStart === this.arrayNumberCount.at(-1)

            ) {

                this._functionCompletion();

            };

        };

        this.arrayFunctionConditional.push(() => { this.functionExecute(); });

        this._functionBiasChange();

    };

};

functionResolveConnect();