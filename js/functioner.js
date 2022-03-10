{
    { // Log;

        

    }
    { // Dom;

        // Функция для изменения текста у элемента;
        function functionDomElementTextChange(

            jectTransmit = {

                domElement: document.createElement("sr"),
                stringText: "",

            },

        ) {

            let {

                domElement,
                stringText,

            } = jectTransmit;

            let domPText = domElement?.domPText;

            if (!domPText || !(domPText instanceof HTMLParagraphElement)) { return; };

            let stringTextNow = stringText;

            stringTextNow = functionStringReplace({

                stringParse       : stringTextNow,
                stringExcerpt     : `<span.*?>.*?</span>`,
                boolReplaceAll    : true,
                arrayStringReplace: functionStringExtract({

                    stringParse   : stringTextNow,
                    stringExcerpt : `<span.*?>(?<stringResult>.*?)</span>`,
                    boolExtractAll: true,

                }),

            });

            domPText.innerHTML = stringTextNow;



        };
        function functionDomElementCreate(jectTransmit = {

            jectParamStyle          : {},
            domElementOver          : document.createElement("sr"),
            boolText                : false,
            stringParms             : "",
            stringElementId         : "",
            stringElementType       : "",
            stringElementClass      : "",
            stringElementAffiliation: "",

        }) {

            const {

                boolText,
                stringParms,
                domElementOver,
                jectParamStyle,
                stringElementId,
                stringElementType,
                stringElementClass,
                stringElementAffiliation,

            } = jectTransmit;

            let domPText      = document.createElement("p");
            let domElement    = document.createElement("sr");
            let stylePText    = domPText.style;
            let styleElement  = document.createElement("style");

            if (typeof(stringParms) === "string") {

                const arrayStringParms = stringParms.split(" ");

                [domElement,styleElement] = functionDomElementCreate({

                    boolText                : boolText,
                    domElementOver          : (document.getElementById(arrayStringParms[3]))
                    ? document.getElementById(arrayStringParms[3]) : (arrayStringParms[3] === "body")
                    ? document.body : (arrayStringParms[3] === "head")
                    ? document.head : undefined,
                    stringElementId         : arrayStringParms[1],
                    stringElementType       : arrayStringParms[0],
                    stringElementClass      : (arrayStringParms[2] && arrayStringParms[2] !== "x")
                    ? arrayStringParms[2] : undefined,
                    stringElementAffiliation: (["session","plot"].includes(arrayStringParms[4])) ? arrayStringParms[4] : undefined,

                });

            } else if (!stringParms) {

                domElement   = document.createElement(stringElementType);
                styleElement = domElement.style;

                if (domElementOver) {
                    
                    domElementOver.appendChild(domElement);
                
                };
                if (stringElementId) {
                    
                    domElement.id  = stringElementId;
                
                };
                if (stringElementClass) {
                    
                    domElement.className = stringElementClass;
                
                };
                if (stringElementAffiliation) {

                    const domStyle        = jectSession[`domStyle${stringElementAffiliation[0].toUpperCase() + stringElementAffiliation.substring(1)}`];
                    const arrayDomElement = jectSession[`arrayDomElement${stringElementAffiliation[0].toUpperCase() + stringElementAffiliation.substring(1)}`];
                    
                    if (domStyle && !domStyle.innerHTML.includes(`#${stringElementId}`)) { domStyle.innerHTML += `#${stringElementId}{}`; }
                    if (arrayDomElement) { arrayDomElement.push(domElement); };


                };

                if (boolText) {

                    domElement.domPText = domPText;
    
                    if (stringElementId) {
                        
                        domPText.id = `${stringElementId}P`;
                    
                    };
    
                    domElement.appendChild(domPText);
    
                };

            };

            if (typeof(jectParamStyle) === "object") {
                    
                functionStylePropertySet({

                    domElement    : domElement,
                    stringExcerpt : ``,
                    jectParamStyle: jectParamStyle,

                });
                
            };

            return [domElement,styleElement,domPText,stylePText];

        };
        function functionDomElementCreatePreset(jectTransmit = {

            domElementOver: document.createElement("sr"),

        }) {

            const { domElementOver } = jectTransmit;

            return function(strokeElementType = "",strokeElementId = "",strokeElementClass = "") {

                return functionDomElementCreate({

                    domElementOver: domElementOver,
                    stringElementId: strokeElementId,
                    stringElementType: strokeElementType,
                    stringElementClass: strokeElementClass,

                });

            };

        };
        function functionDomElementRemove(

            jectTransmit = {

                domElement   : document.createElement("sr"),
                boolStyleSave: jectConfigurate.boolSaveDomElementStyle,

            },

        ) {

            const {

                domElement,
                boolStyleSave,
            
            } = jectTransmit;

            const domStyle          = functionStyleGetByElement({ domElement: domElement, });
            const stringAffiliation = domStyle.id.substring(5).toLocaleLowerCase();

            domElement.parentElement.removeChild(domElement);

            if (!boolStyleSave) { domStyle.innerHTML = domStyle.innerHTML.replace(new RegExp(`${domElement.id} *{[^}]*}`),``); };

            switch(stringAffiliation) {

                case "plot"   : { functionArrayRemove({ jectRemove: domElement, arrayJect: jectSession.arrayDomElementPlot }); }; break;
                case "session": { functionArrayRemove({ jectRemove: domElement, arrayJect: jectSession.arrayDomElementSession }); }; break; 

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

            if (jectSession.arrayDomElementPlot.includes(domElement)) { styleElement = jectSession.domStylePlot; };
            if (jectSession.arrayDomElementSession.includes(domElement)) { styleElement = jectSession.domStyleSession; };

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

            if (styleElement) { strokeValue = styleElement.innerHTML; }

            strokeValue = functionStrokeReplace({

                stringParse   : strokeValue,
                stringReplace : "",
                regexpExcerpt : functionGetRegexpIgnore({ stringInterrupt: ";", stringSeparator: `"()`, }),
                stringReplaced: " ",
                boolReplaceAll: true,

            });

            for (let strokeCount = "A".charCodeAt(); strokeCount <= "Z".charCodeAt(); strokeCount++) {

                const stringSymbol = String.fromCharCode(strokeCount);

                strokeValue = functionStrokeReplace({

                    stringParse   : strokeValue,
                    stringReplace : `-${stringSymbol.toLowerCase()}`,
                    regexpExcerpt : new RegExp(`(?:[\d; ]*([^;]${stringSymbol}[^{"]*?):)`),
                    stringReplaced: stringSymbol,
                    boolReplaceAll: true,
                    
                }) ?? "";
                strokeValue = functionStrokeReplace({

                    stringParse   : strokeValue,
                    stringReplace : `${stringSymbol.toLowerCase()}`,
                    regexpExcerpt : new RegExp(`(?:[\d; ]*(;${stringSymbol}[^{"]*?):)`),
                    stringReplaced: stringSymbol,
                    boolReplaceAll: true,
                    
                }) ?? "";

            };

            if (styleElement) { styleElement.innerHTML = strokeValue; }

            return strokeValue ?? "";

        };
        function functionStylePropertyProcess(

            jectTransmit = {

                stringProperty: "",

            },

        ) {

            let { stringProperty } = jectTransmit;

            if (typeof(stringProperty) !== "string") {
                
                throw new Error(`functionStylePropertyProcess.jectTransmit.stringProperty - строка свойства не является строкой. stringProperty = ${stringProperty};`);
            
            };
            if (!stringProperty) {

                throw new Error(`functionStylePropertyProcess.jectTransmit.stringProperty - строка свойства пустая. stringProperty = "";`);

            };
            
            for (let strokeCount = "A".charCodeAt(); strokeCount <= "Z".charCodeAt(); strokeCount++) {

                const stringSymbol = String.fromCharCode(strokeCount);

                if (stringProperty.includes(stringSymbol)) {

                    stringProperty = functionStringReplace({

                        stringParse   : stringProperty,
                        stringExcerpt : `^${stringSymbol}`,
                        stringReplace : `${stringSymbol.toLowerCase()}`,
                        stringReplaced: stringSymbol,

                    });
                    stringProperty = functionStringReplace({

                        stringParse   : stringProperty,
                        stringReplace : `-${stringSymbol.toLowerCase()}`,
                        stringReplaced: stringSymbol,
                        boolReplaceAll: true,

                    });

                };

            };
            
            return stringProperty ?? "";

        };
        // Функция установки свойства к указанному стилю;
        function functionStylePropertySet(

            jectTransmit = {
                
                domElement    : document.createElement("sr"),
                stringValue   : "",
                styleElement  : document.createElement("style"),
                stringElement : "",
                stringExcerpt : "",
                stringProperty: "",
                jectParamStyle: document.createElement("sr").style,

            },

        ) {

            const { domElement, stringElement } = jectTransmit;
            
            let arrayPair = [];

            if (domElement) {

                jectTransmit.styleElement  = functionStyleGetByElement({ domElement: domElement, });
                jectTransmit.stringExcerpt = domElement.id;

            }
            else if (stringElement) {

                jectTransmit.stringExcerpt = stringElement;

            };
            
            const {
                
                stringValue,
                styleElement,
                stringExcerpt,
                stringProperty,
                jectParamStyle,
            
            } = jectTransmit;

            if (!styleElement) { throw new Error(); };
            if (jectParamStyle) { arrayPair = Object.entries(jectParamStyle); };
            if (stringProperty && stringValue) { arrayPair = [[stringProperty,stringValue]]; }

            for (const arrayPairNow of arrayPair) {

                //arrayPairNow[0] = functionStylePropertyProcess({ stringProperty: arrayPairNow[0], });

                if(functionStylePropertyExtract({

                    domStyle     : styleElement,
                    strokeFind   : arrayPairNow[0],
                    strokeExcerpt: stringExcerpt,
    
                })[0]) {
    
                    functionStylePropertyReplace({
    
                        domStyle     : styleElement,
                        strokeFind   : arrayPairNow[0],
                        strokeExcerpt: stringExcerpt,
                        strokeReplace: arrayPairNow[1],
    
                    });
    
                } else {
    
                    functionStylePropertyAdd({
    
                        stringValue   : arrayPairNow[1],
                        styleElement  : styleElement,
                        regexpExcerpt : functionGetRegexpStyle({ stringStyle: stringExcerpt }),
                        stringProperty: arrayPairNow[0],
    
                    });
    
                };

            };

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
            
            let {

                stringValue,
                styleElement,
                regexpExcerpt,
                stringProperty,

            } = jectTransmit;

            // Переменная с нужной частью строки;
            const stringParse = styleElement.innerHTML.match(regexpExcerpt)[0];
            // Проверка существования ключа;
            if (!Object.keys(document.createElement("sr").style).includes(stringProperty)) { return; };
            // Форматирование ключа;
            stringProperty = functionStylePropertyProcess({ stringProperty: stringProperty });
            // Проверка найденного участка строки на наличие;
            if (stringParse) {
                
                styleElement.innerHTML = styleElement.innerHTML.replace(
                
                    stringParse,
                    stringParse.replace("}",`${stringProperty}:${stringValue};}`)
                
                );
            
            };

        };
        // Функция извлечения значения свойства у указанного стиля;
        function functionStylePropertyGet(

            jectTransmit = {
                
                domStyle      : document.createElement("style"),
                domElement    : document.createElement("sr"),
                stringExcerpt : "",
                stringProperty: "",
                
            },

        ) {

            let {

                domStyle,
                domElement,
                stringExcerpt,
                stringProperty,

            } = jectTransmit;

            if (!stringExcerpt) { stringExcerpt = `#${domElement.id}`; };
            if (!domStyle) { domStyle = functionStyleGetByElement({ domElement: domElement }); };
            
            let test = functionStringExtract({

                stringParse  : domStyle.innerHTML,
                stringExcerpt: `${stringExcerpt}{[^}]*${stringProperty}:(?<stringResult>[^;]*);`,

            });

            return functionStringExtract({

                stringParse  : domStyle.innerHTML,
                stringExcerpt: `${stringExcerpt}{[^}]*${stringProperty}:(?<stringResult>[^;]*);`,

            });

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

                strokeClass = strokeClass.replace(new RegExp(`${strokeFindNow}:[^;]*;`),`${strokeFindNow}:${arrayStrokeReplace[numberIndexNow]};`);
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
                jectRemove,
                numberIndex,
                arrayNumberIndex,

            } = jectTransmit;

            if (jectRemove) {

                arrayNumberIndex = [arrayJect.indexOf(jectRemove)];

            }
            else if (numberIndex) {

                if (typeof(numberIndex) === "number") { arrayNumberIndex = [numberIndex]; }

            };

            if (!(arrayJect instanceof Array)) { return; };
            if (!(arrayNumberIndex instanceof Array)) { return; };

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
    { // String;

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

        // Функция извлечения подстроки в строке;
        function functionStringExtract(

            jectTransmit = {

                stringParse   : "",
                stringExcerpt : "",
                regexpExcerpt : /./,
                boolExtractAll: false,

            },

        ) {

            let {

                stringParse,
                stringExcerpt,
                regexpExcerpt,
                boolExtractAll,

            } = jectTransmit;

            if (typeof(stringParse) !== "string") {
                
                return;
            
            };
            if (typeof(stringExcerpt) === "string") {
                
                regexpExcerpt = new RegExp(stringExcerpt,"g");
            
            };
            if (!(stringExcerpt) instanceof RegExp) {
                
                stringExcerpt = new RegExp(stringParse);
            
            };

            let arrayStringFind = Array.from(stringParse.matchAll(regexpExcerpt));

            arrayStringFind.forEach((arrayJectNow,numberIndex,arrayJect) => {

                arrayJect[numberIndex] = (arrayJectNow.groups?.stringResult) ? arrayJectNow.groups.stringResult : undefined;

            });

            arrayStringFind = arrayStringFind.filter((stringNow) => {

                return !!stringNow;
                
            });

            return (boolExtractAll) ? arrayStringFind : arrayStringFind?.[0];

        };
        // Функция замены подстрок в строке;
        function functionStringReplace(

            jectTransmit = {

                stringParse       : "",
                stringReplace     : "",
                stringExcerpt     : "",
                regexpExcerpt     : /./,
                stringReplaced    : "",
                boolReplaceAll    : false,
                arrayStringReplace: [""],

            },

        ) {

            let {

                stringParse,
                stringExcerpt,
                stringReplace,
                regexpExcerpt,
                stringReplaced,
                boolReplaceAll,
                arrayStringReplace,

            } = jectTransmit;

            let regexpReplaced = "";

            if (stringReplace == undefined) {
                
                stringReplace = "";
            
            };
            if (stringReplaced == undefined) {
                
                stringReplaced = "";
            
            };
            if ((stringReplace || stringReplace === "") && !arrayStringReplace) {

                arrayStringReplace = [stringReplace];

            };
            if (typeof(stringExcerpt) === "string" && !regexpExcerpt) {
                
                regexpExcerpt = new RegExp(stringExcerpt,"g");

                if (!stringReplaced) { regexpReplaced = new RegExp(stringExcerpt); }
            
            };
            if (!regexpExcerpt) {
                
                regexpExcerpt = new RegExp(stringParse,"g");
            
            };

            const arrayStringFind      = stringParse.match(regexpExcerpt);
            const stringDefaultReplace = arrayStringReplace.pop();

            if (arrayStringFind?.length) {

                for (let numberIndex = (!boolReplaceAll) ? 0 : arrayStringFind.length - 1; numberIndex >= 0; numberIndex--) {

                    const stringFindNow = arrayStringFind.pop();

                    stringReplace = (arrayStringReplace[numberIndex]) ? arrayStringReplace[numberIndex] : stringDefaultReplace;
    
                    if (stringReplaced) {
                        
                        stringParse = stringParse.replace(stringFindNow,stringFindNow.replace(stringReplaced,stringReplace));
                    
                    };
                    if (regexpReplaced) {
                        
                        stringParse = stringParse.replace(stringFindNow,stringFindNow.replace(regexpReplaced,stringReplace));
                    
                    };

                };

            };

            return stringParse;

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

                stringSeparator : "",
                stringInterrupt : "",

            },

        ) {

            if (!jectTransmit.stringInterrupt) { jectTransmit.stringInterrupt = ""; }

            const {

                stringSeparator,
                stringInterrupt,

            } = jectTransmit;

            return new RegExp(`([^${stringSeparator}]*)(?:(?:${stringSeparator}[^${stringSeparator}]*)${stringSeparator})+([^${stringSeparator}]*)?`);

        };

    }

}

functionResolveConnect();