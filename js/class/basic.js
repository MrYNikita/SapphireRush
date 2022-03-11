class classBasic {

    constructor(
        
        jectTransmit = {

            stringName     : "",

        },

    ) {

        const {

            stringName,

        } = jectTransmit;

        this.stringName = (typeof(stringName) === "string") ? stringName : "";

    };

};
class classBasicImplementing extends classBasic {

    constructor(

        jectTransmit = {

            stringName: "",

        },

    ) {

        super(jectTransmit);

        this.arrayJectImplementer = [];

    };
    
};

class classBasicTimer extends classBasic {

    constructor(

        jectTransmit = {

            jectParam      : {},
            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            functionExecute: function() {},

        },

    ) {

        super(jectTransmit);

        const {
            
            jectParam,
            numberSpeed,
            functionExecute,
        
        } = jectTransmit;

        this.jectParam             = (typeof(jectParam) === "object") ? jectParam : {}; 
        this.numberSpeed           = (numberSpeed > 0) ? numberSpeed : jectConfigurate.numberDefaultSpeedTimer;
        this.functionExecute       = functionExecute;
        this.numberIterateNow      = 0;
        this.functionResolveFinite = undefined;

    };

    // Функция остановки интервала;
    functionStop(

        jectTransmit = {



        },  

    ) {

        clearInterval(this.intervalExecute);

        this.intervalExecute = undefined;

        if (this.functionResolveFinite) {
            
            this.functionResolveFinite();
        
            this.functionResolveFinite = undefined;
        
        };

    };
    // Функция запуска таймера;
    async functionBegin(

        jectTransmit = {



        },

    ) {

        const jectTimer = this;

        await new Promise(async function(functionResolveFinite) {

            jectTimer.functionResolveFinite = functionResolveFinite;

            await jectTimer.functionUpdate();

        });

    };
    // Функция обновления интервала;
    async functionUpdate(

        jectTransmit = {

            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            numberSpeedMode: 1,

        },

    ) {
        
        const {

            numberSpeed,
            numberSpeedMode,

        } = jectTransmit;

        this.numberSpeed = (numberSpeed > 0 && numberSpeedMode > 0)
        ? numberSpeed * numberSpeedMode : (numberSpeed > 0)
        ? numberSpeed : (numberSpeedMode > 0)
        ? this.numberSpeed * numberSpeedMode : this.numberSpeed;

        this.intervalExecute = setInterval(() => {

            this.numberIterateNow++;

            this.functionExecute(this.jectParam);

        },this.numberSpeed,this.jectParam);
    
    };
    // Функция запуска интревала;
    async functionContinue(

        jectTransmit = {},

    ) {
        
        await this.functionBegin();
    
    };

};
class classBasicTimerPlot extends classBasicTimer {

    constructor(

        jectTransmit = {

            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            functionExecute: function() {},

        },
        
    ) {

        super(jectTransmit);

        jectSession.arrayJectTimerPlot.push(this);

    };

};
class classBasicTimerSession extends classBasicTimer {

    constructor(
        
        jectTransmit = {

            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            functionExecute: function() {},

        },
        
    ) {

        super(jectTransmit);

        jectSession.arrayJectTimerSession.push(this);

    };

};

class classBasicTimerFinite extends classBasicTimer {

    constructor(

        jectTransmit = {

            boolSkip       : jectConfigurate.boolSkipTimer,
            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            numberIterate  : jectConfigurate.numberDefaultIterate,
            functionExecute: function() {},

        },

    ) {

        super(jectTransmit);

        const { numberIterate, boolSkip, } = jectTransmit;

        this.numberIterate    = (numberIterate > 0) ? numberIterate : jectConfigurate.numberDefaultIterate;
        this.numberIterateNow = (boolSkip) ? this.numberIterate : 1; 

    };

    functionClear() {

        functionArrayRemove({

            arrayJect : jectSession.arrayJectTimerSession,
            jectRemove: this,

        });

    };

    async functionUpdate(

        jectTransmit = {

            numberSpeed    : this.numberSpeed,
            numberSpeedMode: 1,

        },

    ) {

        const {

            numberSpeed,
            numberSpeedMode,

        } = jectTransmit;

        this.numberSpeed = (numberSpeed > 0 && numberSpeedMode > 0)
        ? numberSpeed * numberSpeedMode : (numberSpeed > 0)
        ? numberSpeed : (numberSpeedMode > 0)
        ? this.numberSpeed * numberSpeedMode : this.numberSpeed;

        this.intervalExecute = setInterval(() => {

            this.functionExecute(this.jectParam);

            this.numberIterateNow++;

            if (this.numberIterateNow === this.numberIterate + 1) {

                clearInterval(this.intervalExecute);

                this.functionClear();

                if (this.functionResolveFinite) { this.functionResolveFinite(); }

            };

        },this.numberSpeed);

    };

};
class classBasicTimerFinitePlot extends classBasicTimerFinite {

    constructor(

        jectTransmit = {},

    ) {

        super(jectTransmit);

        jectSession.arrayJectTimerPlot.push(this);

    };

    functionClear() {

        functionArrayRemove({

            arrayJect : jectSession.arrayJectTimerPlot,
            jectRemove: this,

        });

    };

};
class classBasicTimerFiniteSession extends classBasicTimerFinite {

    constructor(

        jectTransmit = {



        },  

    ) {

        super(jectTransmit);

        jectSession.arrayJectTimerSession.push(this);

    };

};

class classBasicTimerConditional extends classBasicTimer {

    constructor(

        jectTransmit = {

            jectParam      : {},
            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            boolСondition  : false,
            functionExecute: function() {},

        },

    ) {
        
        super(jectTransmit);

        const {
            
            boolСondition,
        
        } = jectTransmit;

        this.boolСondition = boolСondition;

    };

    async functionBegin(

        jectTransmit = {

            boolСondition: false,

        },

    ) {

        const jectTimer = this;

        const {

            boolСondition,

        } = jectTransmit;

        this.boolСondition = boolСondition;

        await new Promise(async function(functionResolveFinite) {

            jectTimer.functionResolveFinite = functionResolveFinite;

            await jectTimer.functionUpdate(jectTransmit);

        });

    };
    async functionUpdate(

        jectTransmit = {

            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            boolСondition  : false,
            numberSpeedMode: 1,

        },

    ) {
        
        const {

            numberSpeed,
            boolСondition,
            numberSpeedMode,

        } = jectTransmit;

        this.numberSpeed = (numberSpeed > 0 && numberSpeedMode > 0)
        ? numberSpeed * numberSpeedMode : (numberSpeed > 0)
        ? numberSpeed : (numberSpeedMode > 0)
        ? this.numberSpeed * numberSpeedMode : this.numberSpeed;

        this.boolСondition = boolСondition;

        this.intervalExecute = setInterval(() => {

            if (this.boolСondition) {

                this.numberIterateNow++;

                this.functionExecute(this.jectParam);

            };

        },this.numberSpeed,this.jectParam);
    
    };

};

class classBasicTimerConditionalRegressive extends classBasicTimerConditional {

    constructor(

        jectTransmit = {

            jectParam      : {},
            stringName     : "",
            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            boolСondition  : false,
            functionExecute: function() {},

        },

    ) {

        super(jectTransmit);

    };

    async functionUpdate(

        jectTransmit = {

            numberSpeed    : jectConfigurate.numberDefaultSpeedTimer,
            boolСondition  : false,
            numberSpeedMode: 1,

        },

    ) {
        
        const {

            numberSpeed,
            boolСondition,
            numberSpeedMode,

        } = jectTransmit;

        this.numberSpeed = (numberSpeed > 0 && numberSpeedMode > 0)
        ? numberSpeed * numberSpeedMode : (numberSpeed > 0)
        ? numberSpeed : (numberSpeedMode > 0)
        ? this.numberSpeed * numberSpeedMode : this.numberSpeed;

        this.boolСondition = boolСondition;

        this.intervalExecute = setInterval(() => {

            if (this.boolСondition) {

                this.numberIterateNow++;

                this.functionExecute(this.jectParam);

            } else {

                if (this.numberIterateNow > 1) {
                    
                    --this.numberIterateNow;
                
                    this.functionExecute(this.jectParam);

                };

            };

        },this.numberSpeed,this.jectParam);
    
    };

};

functionResolveConnect();