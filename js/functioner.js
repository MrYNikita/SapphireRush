{
    { // Log;

    }
    { // Dom;

        function functionDomElementCreate(jectTransmit = {

            jectStyle               : {},
            domElementOver          : document.createElement("sr"),
            strokeParms             : "",
            strokeElementId         : "",
            strokeElementType       : "",
            strokeElementClass      : "",
            strokeElementAffiliation: "",

        }) {

            const {

                jectStyle,
                strokeParms,
                domElementOver,
                strokeElementId,
                strokeElementType,
                strokeElementClass,
                strokeElementAffiliation,

            } = jectTransmit;

            let domElement = document.createElement("sr");
            let styleElement = document.createElement("style");

            if (typeof(strokeParms) === "string") {

                const arrayStringParms = strokeParms.split(" ");

                [domElement,styleElement] = functionDomElementCreate({

                    domElementOver          : (document.getElementById(arrayStringParms[3]))
                    ? document.getElementById(arrayStringParms[3]) : (arrayStringParms[3] === "body")
                    ? document.body : (arrayStringParms[3] === "head")
                    ? document.head : undefined,
                    strokeElementId         : arrayStringParms[1],
                    strokeElementType       : arrayStringParms[0],
                    strokeElementClass      : (arrayStringParms[2] && arrayStringParms[2] !== "x")
                    ? arrayStringParms[2] : undefined,
                    strokeElementAffiliation: (["session","plot"].includes(arrayStringParms[4])) ? arrayStringParms[4] : undefined,

                });

            } else if (!strokeParms) {

                domElement = document.createElement(strokeElementType);
                styleElement = domElement.style;

                if (domElementOver) { domElementOver.appendChild(domElement); }
                if (strokeElementId) { domElement.id = strokeElementId; }
                if (strokeElementClass) { domElement.className = strokeElementClass; }
                if (strokeElementAffiliation) {

                    switch(strokeElementAffiliation) {

                        case "plot"   : { jectSession.arrayDomElementPlot.push(domElement); } break;
                        case "session": { jectSession.arrayDomElementSession.push(domElement); } break;

                    };

                };

            };

            if (typeof(jectStyle) === "object") {
                    
                Object.entries(jectStyle).forEach((jectPropertyNow,numberIndexNow) => {

                    if (Object.keys(styleElement).includes(jectPropertyNow[0])) {

                        styleElement[jectPropertyNow[0]] = jectPropertyNow[1];

                    }
                
                });
                
            };

            return [domElement,styleElement];

        };
        function functionDomElementCreatePreset(jectTransmit = {

            domElementOver: document.createElement("sr"),

        }) {

            const { domElementOver } = jectTransmit;

            return function(strokeElementType = "",strokeElementId = "",strokeElementClass = "") {

                return functionDomElementCreate({

                    domElementOver: domElementOver,
                    strokeElementId: strokeElementId,
                    strokeElementType: strokeElementType,
                    strokeElementClass: strokeElementClass,

                });

            };

        };
        
    }
    { // Style;

        // Функция определения стиля по элементу;
        function functionStyleGetByElement(

            jectTransmit = {

                domElement: document.createElement("sr"),

            },

        ) {

            const {

                domElement,

            } = jectTransmit;

            let styleElement = undefined;

            if (jectSession.arrayDomElementPlot.includes(domElement)) { styleElement = jectSession.stylePlot; };
            if (jectSession.arrayDomElementSession.includes(domElement)) { styleElement = jectSession.styleSession; };

            return (styleElement instanceof HTMLStyleElement) ? styleElement : undefined;

        };
        function functionStyleProcess(jectTransmit = {

            strokeValue: "",
            styleElement: document.createElement("style"),

        }) {

            let {

                strokeValue,
                styleElement,

            } = jectTransmit;

            if (strokeValue) {

                styleElement = document.createElement("style");
                styleElement.innerHTML = strokeValue;

            }
            if (!styleElement) { return; }

            styleElement.innerHTML = styleElement.innerHTML.replaceAll("\n","");

            styleElement.innerHTML = functionStrokeReplace({

                stringParse   : styleElement.innerHTML,
                stringReplace : "",
                regexpExcerpt : functionGetRegexpIgnore({ stringMode: "pair", stringSymbolPair: `"`, }),
                stringReplaced: " ",
                boolReplaceAll: true,

            });

            for (let strokeCount = "A".charCodeAt(); strokeCount <= "Z".charCodeAt(); strokeCount++) {

                const stringSymbol = String.fromCharCode(strokeCount);

                styleElement.innerHTML = functionStrokeReplace({

                    stringParse   : styleElement.innerHTML,
                    stringReplace : `-${stringSymbol.toLowerCase()}`,
                    regexpExcerpt : /(?:[\d; ]*([^{"]*?):)/,
                    stringReplaced: stringSymbol,
                    boolReplaceAll: true,
                    
                }) ?? "";

            };

            return styleElement.innerHTML;

        };
        function functionStyleRGBAReplace(jectTransmit = {

            strokeRGBA: "",
            arrayNumberBias: [],

        }) {

            let {

                strokeRGBA,
                arrayNumberBias,

            } = jectTransmit;

            let arrayResult = strokeRGBA.match(/(rgb[a]?)[(]{1}(([0-9]+,? ?){3,4})[)]{1}/);
            let strokeType = arrayResult[1];
            let arrayStrokeRGBA = arrayResult[2].split(",");

            if (strokeType === "rgb" && arrayNumberBias.length === 4) { arrayNumberBias.pop(); }
            if (strokeType === "rgb" && arrayStrokeRGBA.length === 4) { arrayStrokeRGBA.pop(); }
            if (strokeType === "rgba" && arrayStrokeRGBA.length === 3) { arrayStrokeRGBA.push("0"); }
            if (strokeType === "rgba" && arrayNumberBias.length === 3) { arrayNumberBias.push(0); }

            arrayNumberBias = arrayNumberBias.filter((numberBiasNow) => { return typeof(numberBiasNow) === "number"; });

            arrayNumberBias.forEach((numberBiasNow,numberIndexNow) => {

                if (numberBiasNow >= 510) { arrayStrokeRGBA[numberBiasNow] = "255"; return; }
                if (numberBiasNow <= -510) { arrayStrokeRGBA[numberBiasNow] = "-255"; return; }

                let numberColorIndexNow = arrayStrokeRGBA[numberIndexNow] - 0 + numberBiasNow;
                    
                if (numberColorIndexNow > 255) { numberColorIndexNow = 255; }
                else if (numberColorIndexNow < -255) { numberColorIndexNow = -255; }

                arrayStrokeRGBA[numberIndexNow] = numberColorIndexNow;

            });

            return `${strokeType}(${arrayStrokeRGBA.join(",")})`;

        };
        // Функция установки свойства к указанному стилю;
        function functionStylePropertySet(

            jectTransmit = {
                
                domElement    : document.createElement("sr"),
                stringValue   : "",
                styleElement  : document.createElement("style"),
                stringExcerpt : "",
                stringProperty: "",

            },

        ) {

            const { domElement } = jectTransmit;

            if (domElement) {

                jectTransmit.styleElement  = functionStyleGetByElement({ domElement: domElement, });
                jectTransmit.stringExcerpt = domElement.id;

            };
            
            const {
                
                stringValue,
                styleElement,
                stringExcerpt,
                stringProperty,
            
            } = jectTransmit;

            if (styleElement) {

                if(functionStylePropertyExtract({

                    domStyle     : styleElement,
                    strokeFind   : stringProperty,
                    strokeExcerpt: stringExcerpt,

                })[0]) {

                    functionStylePropertyReplace({

                        domStyle     : styleElement,
                        strokeFind   : stringProperty,
                        strokeExcerpt: stringExcerpt,
                        strokeReplace: stringValue,

                    });

                } else {

                    functionStylePropertyAdd({

                        stringValue   : stringValue,
                        styleElement  : styleElement,
                        regexpExcerpt : functionGetRegexpStyle({ stringStyle: stringExcerpt }),
                        stringProperty: stringProperty,

                    });

                }
                

            } else { throw new Error(); }

        };
        // Функция добавления новых свойств к указанному стилю;
        function functionStylePropertyAdd(

            jectTransmit = {

                stringValue   : "",
                styleElement  : document.createElement("style"),
                regexpExcerpt : /./,
                stringProperty: "",

            },

        ) {
            
            const {

                stringValue,
                styleElement,
                regexpExcerpt,
                stringProperty,

            } = jectTransmit;

            // Переменная с нужной частью строки;
            const stringParse = styleElement.innerHTML.match(regexpExcerpt)[0];
            // Проверка существования ключа;
            if (!Object.keys(document.createElement("sr").style).includes(stringProperty)) { return; };
            // Проверка найденного участка строки на наличие;
            if (stringParse) { styleElement.innerHTML = styleElement.innerHTML.replace(
                
                stringParse,
                stringParse.replace("}",`${stringProperty}:${stringValue};}`)
            
            ); };

        };
        function functionStylePropertyExtract(jectTransmit = {

            domStyle: document.createElement("style"),
            strokeStop: "",
            strokeFind: "",
            strokeExcerpt: "",
            arrayStrokeFind: [""],

        }) {

            let {

                domStyle,
                strokeStop,
                strokeFind,
                strokeExcerpt,
                arrayStrokeFind,

            } = jectTransmit;

            strokeStop = strokeStop ?? ";";
            arrayStrokeFind = (strokeFind) ? [strokeFind] : arrayStrokeFind;

            arrayStrokeFind.filter((strokeFindNow) => {

                if (strokeFindNow) { return true; }

            });
            arrayStrokeFind.forEach((strokeFindNow,numberIndexNow) => {

                arrayStrokeFind[numberIndexNow] = domStyle.innerHTML.match(functionGetRegexpStyle({
                    
                    stringMode : "s",
                    stringStyle: strokeExcerpt,

                }))[0];
                arrayStrokeFind[numberIndexNow] = arrayStrokeFind[numberIndexNow].match(new RegExp(`${strokeFindNow}:([^;]*);`))?.[1];

            });
            
            return arrayStrokeFind;

        };
        function functionStylePropertyReplace(jectTransmit = {

            domStyle: document.createElement("style"),
            strokeStop: ";",
            strokeFind: "",
            strokeReplace: "",
            strokeExcerpt: "",
            arrayStrokeFind: [],
            arrayStrokeReplace: [],

        }) {

            let {
                
                domStyle,
                strokeStop,
                strokeFind,
                strokeReplace,
                strokeExcerpt,
                arrayStrokeFind,
                arrayStrokeReplace,

            } = jectTransmit;

            strokeStop = strokeStop ?? ";";
            arrayStrokeFind = (strokeFind) ? [strokeFind] : arrayStrokeFind;
            arrayStrokeReplace = (strokeReplace) ? [strokeReplace] : arrayStrokeReplace; 

            arrayStrokeFind.filter((strokeFindNow) => {

                if (strokeFindNow) { return true; }

            });
            arrayStrokeFind.forEach((strokeFindNow,numberIndexNow) => {

                let strokeStyle = domStyle.innerHTML;
                let strokeClass = strokeStyle.match(new RegExp(`${strokeExcerpt}[^}]*`,"s"))[0];

                strokeClass = strokeClass.replace(new RegExp(`${strokeFindNow}:.*;`),`${strokeFindNow}:${arrayStrokeReplace[numberIndexNow]};`);
                domStyle.innerHTML = domStyle.innerHTML.replace(new RegExp(`${strokeExcerpt}[^}]*`,"s"),strokeClass);

            });


        };

    }
    { // Array;

        function functionArraySwap(jectTransmit = {

            arrayJect: [],
            arrayPair: [],
            arrayDPair: [[]],
            numberIndexOne: 0,
            numberIndexTwo: 0,

        }) {

            let {

                arrayJect,
                arrayPair,
                arrayDPair,
                numberIndexOne,
                numberIndexTwo,

            } = jectTransmit;

            if (arrayPair) {

                if (arrayPair instanceof Array) { arrayDPair = [arrayPair]; }

            }
            if (numberIndexOne && numberIndexTwo) {

                if (
                    
                    numberIndexOne >= 0 &&
                    numberIndexTwo >= 0 &&
                    typeof(numberIndexOne) === "number" &&
                    typeof(numberIndexTwo) === "number"
                    
                ) { arrayDPair = [[numberIndexOne,numberIndexTwo]]; }

            }

            if (!(arrayJect instanceof Array)) { return; }
            if (!(arrayDPair instanceof Array)) { return; }

            arrayDPair = arrayDPair.filter((arrayPairNow) => {

                if (!(arrayPairNow instanceof Array)) { return false; }
                if (typeof(arrayPairNow[0]) !== "number") { return false; }
                if (typeof(arrayPairNow[1]) !== "number") { return false; }

                const jectElement = arrayJect[arrayPairNow[0]];

                arrayJect[arrayPairNow[0]] = arrayJect[arrayPairNow[1]];
                arrayJect[arrayPairNow[1]] = jectElement;

            });

        };
        function functionArrayFilter(jectTransmit = {

            arrayJect: [],
            boolUnique: false,
            jectFilterValue,
            jectFilterProperty,
            arrayJectFilterValue: [],
            arrayJectFilterProperty: [],
            strokeFilterPropertyName: "",
            arrayStrokeFilterPropertyName: [],

        }) {

            let {

                arrayJect,
                boolUnique,
                jectFilterValue,
                jectFilterProperty,
                arrayJectFilterValue,
                arrayJectFilterProperty,
                strokeFilterPropertyName,
                arrayStrokeFilterPropertyName,

            } = jectTransmit;

            jectFilterValue = jectFilterValue ?? undefined;
            arrayJectFilterProperty = arrayJectFilterProperty ?? [];
            arrayStrokeFilterPropertyName = arrayStrokeFilterPropertyName ?? [];

            if (boolUnique) {

                return Array.from(new Set(arrayJect));

            }
            if (jectFilterValue) {

                arrayJectFilterValue = [jectFilterValue];

            }
            if (jectFilterProperty) {

                arrayJectFilterProperty = [jectFilterProperty];

            }
            if (strokeFilterPropertyName) {

                arrayStrokeFilterPropertyName = [strokeFilterPropertyName];

            }

            if (!(arrayJect instanceof Array)) { return; }
            if (!(arrayJectFilterValue instanceof Array)) { return; }
            if (!(arrayJectFilterProperty instanceof Array)) { return; }
            if (!(arrayStrokeFilterPropertyName instanceof Array)) { return; }

            return arrayJect.filter((jectNow,numberIndexNow) => {

                if (arrayJectFilterValue.includes(jectNow)) { return false; }
                
                if (typeof(jectNow) === "object") {

                    for (let strokeProperty of arrayJectFilterProperty) {

                        if (Object.values(jectNow).includes(strokeProperty)) { return false; }

                    };
                    for (let strokePropertyName of arrayStrokeFilterPropertyName) {

                        if (Object.keys(jectNow).includes(strokePropertyName)) { return false; }

                    };

                }

                return true;

            });

        };
        function functionArrayUnique(

            jectTransmit = {

                arrayJect: [],

            },

        ) {

            const { arrayJect } = jectTransmit;

            return Array.from(new Set(arrayJect));

        };
        function functionArrayRemove(jectTransmit = {

            arrayJect: [],
            jectRemove,
            numberIndex: 0,
            arrayjectRemove: [],
            arrayNumberIndex: [0],

        }) {

            let {

                arrayJect,
                numberIndex,
                arrayNumberIndex,

            } = jectTransmit;

            if (numberIndex) {

                if (typeof(numberIndex) === "number") { arrayNumberIndex = [numberIndex]; }

            }

            if (!(arrayJect instanceof Array)) { return; } 
            if (!(arrayNumberIndex instanceof Array)) { return; }

            arrayNumberIndex.forEach((numberNow,numberIndexNow) => {

                arrayJect.splice(numberNow,1);

            });

        };
        function functionArrayReplace(jectTransmit = {

            jectReplace,
            arrayJect: [],
            numberIndex: 0,
            arrayNumberIndex: [],
            arrayJectReplace: [],

        }) {

            const {

                arrayJect,
                jectReplace,
                numberIndex,
                arrayNumberIndex,
                arrayJectReplace,

            } = jectTransmit;

            if (jectReplace) {

                arrayJectReplace = [jectReplace];

            }
            if (numberIndex) {

                if (typeof(numberIndex) === "number") {

                    arrayNumberIndex = [numberIndex];

                } else { return; }

            }

            if (!(arrayJect instanceof Array)) { return; }
            if (!(arrayJectReplace instanceof Array)) { return; }
            if (!(arrayNumberIndex instanceof Array)) { return; }

            arrayNumberIndex = arrayNumberIndex.filter((numberNow) => {

                return typeof(numberNow) === "number";

            });

            arrayNumberIndex.forEach((numberNow) => {

                arrayJect[numberNow] = arrayJectReplace[numberNow];

            });

        };

        

        function functionArrayGetByName(jectTransmit = {

            arrayJectParse: [],
            stringName: "",

        }) {

            const {

                stringName,
                arrayJectParse,

            } = jectTransmit;

            return functionArrayGetByProperty({

                arrayJectParse: arrayJectParse,
                jectPropertyValue: stringName,
                strokePropertyName: "stringName",

            });

        };
        function functionArrayGetByProperty(jectTransmit = {

            arrayJectParse: [],
            jectPropertyValue,
            strokePropertyName: "",

        }) {

            const {

                arrayJectParse,
                jectPropertyValue,
                strokePropertyName,

            } = jectTransmit;

            if (!(arrayJectParse instanceof Array)) { return; }
            if (typeof(strokePropertyName) !== "string") { return; }

            return arrayJectParse.filter((jectNow) => {

                return typeof(jectNow) === "object";

            }).find((jectNow) => {

                return jectNow[strokePropertyName] === jectPropertyValue;

            });

        };

    }
    { // Stroke;

        function functionStrokeExtract(jectTransmit = {

            strokeStop: "",
            strokeParse: "",
            strokeExcerpt: "",
            regexpExcerpt: /./,
            arrayStrokeFind: [],

        }) {

            if (jectTransmit.strokeExcerpt) {

                jectTransmit.regexpExcerpt = new RegExp(jectTransmit.strokeExcerpt);

            }

            const {

                strokeParse,
                strokeExcerpt,
                regexpExcerpt,

            } = jectTransmit;

            return strokeParse.match(regexpExcerpt);

        };
        function functionStrokeReplace(
            
            jectTransmit = {
        
                stringParse   : "",
                stringExcerpt : "",
                regexpExcerpt : /./,
                stringReplace : "",
                stringReplaced: "",
                boolReplaceAll: false,
        
            }
        
        ) {
        
            {
        
                if (jectTransmit.stringParse) {
                    
                    if (typeof(jectTransmit.stringParse) !== "string") { return; };
        
                } else { return; };
                if (jectTransmit.stringExcerpt) {
        
                    if (typeof(jectTransmit.stringExcerpt) !== "string") { return; };
        
                    jectTransmit.regexpExcerpt = new RegExp(jectTransmit.stringExcerpt,(jectTransmit.boolReplaceAll) ? "g" : "");
        
                };
                if (jectTransmit.regexpExcerpt) {
        
                    if (!(jectTransmit.regexpExcerpt instanceof RegExp)) { return; }
        
                    jectTransmit.regexpExcerpt = new RegExp(jectTransmit.regexpExcerpt,(jectTransmit.boolReplaceAll) ? "g" : "");
        
                } else { return; }
        
            }
        
            const {
        
                stringParse,
                stringExcerpt,
                stringReplace,
                regexpExcerpt,
                stringReplaced,
                boolReplaceAll,
        
            } = jectTransmit;
        
            const arrayStringFind = [];
        
            if (boolReplaceAll) {
        
                [...stringParse.matchAll(regexpExcerpt)].forEach((arrayFindNow) => {
        
                    for (let numberIndex = 1; numberIndex < arrayFindNow.length; numberIndex++) {
        
                        if (arrayFindNow[numberIndex] && arrayFindNow[numberIndex].includes(stringReplaced)) {
        
                            arrayStringFind.push(arrayFindNow[numberIndex]);
        
                        };
        
                    };
                
                });
        
            } else {
        
                const arrayFindNow = stringParse.match(regexpExcerpt);
        
                for (let numberIndex = 1; numberIndex < arrayFindNow.length; numberIndex++) {
        
                    if (arrayFindNow[numberIndex] && arrayFindNow[numberIndex].includes(stringReplaced)) {
        
                        arrayStringFind.push(arrayFindNow[numberIndex]);
        
                    };
        
                };
        
            };
        
            let stringResult = stringParse;
        
            arrayStringFind.forEach((stringFindNow,numberIndexNow) => {
        
                stringResult = stringResult.replace(stringFindNow,stringFindNow.replaceAll(stringReplaced,stringReplace));
                
            });
        
            return stringResult;
        
        };
        function functionStrokeExtractNumber(jectTransmit = {

            strokeParse: "",
            strokeTypeParse: "",

        }) {

            let {

                strokeParse,
                strokeTypeParse,

            } = jectTransmit;

            strokeTypeParse = strokeTypeParse ?? "";

            return strokeParse.match(new RegExp(/[0-9]+([.]{1}[0-9]+)?/,strokeTypeParse));

        };
        

    }
    { // Number;

        function functionGetMultiply([...arrayNumber]) {

            return 0;

        };
        function functionGetNumberRandom(jectTransmit = {

            numberMin: 0,
            numberMax: 100,

        }) {

            const {

                numberMin,
                numberMax

            } = jectTransmit;

            return Math.abs(Math.round(numberMin - 0.5 + Math.random() * (numberMax - numberMin + 1)));

        };
        function functionCalculateNumberDivisionIntegerNumber(jectTransmit = {

            numberDevider : 1,
            numberDevidend: 1,
            
        }) {

            const {

                numberDevider,
                numberDevidend,

            } = jectTransmit;

            return Math.floor(numberDevidend / numberDevider);

        };

    }
    { // Regexp;

        // Функция генерации регулярного выражения для поиска в объекте стиля;
        function functionGetRegexpStyle(

            jectTransmit = {

                stringMode  : "",
                stringStyle : "",

            },

        ) {

            const { stringStyle, stringMode } = jectTransmit;

            return new RegExp(`${stringStyle}[^}]*}`,stringMode);

        };
        function functionGetRegexpIgnore(

            jectTransmit = {

                stringMode: ["pair",],
                stringSymbolPair: "",

            },

        ) {

            const {

                stringMode,
                stringSymbolPair,

            } = jectTransmit;

            switch (stringMode) {

                case "pair": {

                    if (stringSymbolPair) {

                        if (typeof(stringSymbolPair) !== "string") { return; };
                        if (stringSymbolPair.length !== 1) { return; }

                    } else { return; }

                    return new RegExp(`([^${stringSymbolPair}]*)(?:(?:${stringSymbolPair}[^${stringSymbolPair}]*)${stringSymbolPair})+([^${stringSymbolPair}]*)?`);

                };

            };

        };

    }

}

functionResolveConnect();