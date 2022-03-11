{
    { // Log;

        

    }
    { // Dom;

        // Функция для извлечения текста из элемента;
        function functionDomElementTextGet(

            jectTransmit = {

                domElement: document.createElement("sr"),

            },

        ) {

            let {

                domElement,

            } = jectTransmit;

            const stringTextNow = domElement?.domPText?.innerHTML;

            if (!stringTextNow && stringTextNow !== "") { return; };

            return functionStringReplace({

                stringParse       : stringTextNow,
                stringExcerpt     : `<span.*?>.*?</span>`,
                boolReplaceAll    : true,
                arrayStringReplace: functionStringExtract({

                    stringParse   : stringTextNow,
                    stringExcerpt : `<span.*?>(?<stringResult>.*?)</span>`,
                    boolExtractAll: true,

                }),

            });

        };
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

            domPText.innerHTML = `${stringText.slice(0,-1)}<span class="spanEnd">${stringText.slice(-1)}</span>`;

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

                arrayStringParms[2] = functionStringExtract({

                    stringParse  : arrayStringParms[2],
                    regexpExcerpt: /\[(?<stringResult>[\w]*)\]/g,

                });
                
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

                    domPText.className = jectConfigurate.stringDefaultStyleClassText;
    
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
        // Функция предустановки для указанного стиля или элемента;
        function functionStylePropertyPreset(

            jectTransmit = {

                domElement   : document.createElement("sr"),
                styleElement : document.createElement("style"),
                stringElement: "",
                
            },

        ) {

            let {

                domElement,
                styleElement,
                stringElement,

            } = jectTransmit;

            return function(

                jectTransmit = {

                    stringValue   : "",
                    stringExcerpt : "",
                    stringProperty: "",
                    jectParamStyle: document.createElement("sr").style,

                },

            ) {

                jectTransmit.domElement    = domElement;
                jectTransmit.styleElement  = styleElement;
                jectTransmit.stringElement = stringElement; 

                functionStylePropertySet(jectTransmit);

            };

        };
        // Функция установки свойства к указанному стилю;
        function functionStylePropertySet(

            jectTransmit = {
                
                domElement     : document.createElement("sr"),
                stringValue    : "",
                stringElement  : "",
                stringExcerpt  : "",
                stringProperty : "",
                jectParamStyle : document.createElement("sr").style,
                domStyleElement: document.createElement("style"),

            },

        ) {

            const { domElement, stringElement } = jectTransmit;
            
            let arrayPair = [];

            if (domElement) {

                jectTransmit.domStyleElement  = functionStyleGetByElement({ domElement: domElement, });
                jectTransmit.stringExcerpt = `#${domElement.id}`;

            }
            else if (stringElement) {

                jectTransmit.stringExcerpt = stringElement;

            };
            
            let {
                
                stringValue,
                domStyleElement,
                stringExcerpt,
                stringProperty,
                jectParamStyle,
            
            } = jectTransmit;

            if (!domStyleElement) { throw new Error(); };
            if (jectParamStyle) { arrayPair = Object.entries(jectParamStyle); };
            if (stringProperty && stringValue) { arrayPair = [[stringProperty,stringValue]]; };

            let stringStyle = functionStringExtractMany({

                stringParse       : domStyleElement.innerHTML,
                boolExtractAll    : false,
                arrayStringExcerpt: [

                    `^(?<stringResult>${stringExcerpt}.*?})`,
                    `}(?<stringResult>${stringExcerpt}.*?})`,

                ],

            })[0];

            for (const arrayPairNow of arrayPair) {

                let stringReplace  = "";
                let stringReplaced = "";

                if (stringStyle.includes(arrayPairNow[0])) {

                    stringExcerpt  = `${stringExcerpt}.*?${arrayPairNow[0]}:.*?;`;
                    stringReplace  = `${arrayPairNow[0]}:${arrayPairNow[1]};`;
                    stringReplaced = undefined;

                    functionStylePropertyReplace({

                        stringValue    : arrayPairNow[1],
                        regexpExcerpt  : new RegExp(stringExcerpt),
                        stringProperty : arrayPairNow[0],
                        domStyleElement: domStyleElement,

                    });
    
                } else {
    
                    functionStylePropertyAdd({

                        stringValue    : arrayPairNow[1],
                        regexpExcerpt  : new RegExp(`${stringExcerpt}{.*?}`),
                        stringProperty : arrayPairNow[0],
                        domStyleElement: domStyleElement,

                    });
                    
                };

            };

        };
        // Функция добавления новых свойств к указанному стилю;
        function functionStylePropertyAdd(

            jectTransmit = {

                stringValue    : "",
                regexpExcerpt  : /./,
                stringProperty : "",
                domStyleElement: document.createElement("style"),

            },

        ) {
            
            let {

                stringValue,
                regexpExcerpt,
                stringProperty,
                domStyleElement,

            } = jectTransmit;

            // Переменная с нужной частью строки;
            const stringParse = domStyleElement.innerHTML.match(regexpExcerpt)[0];
            // Проверка существования ключа;
            if (!Object.keys(document.createElement("sr").style).includes(stringProperty)) { return; };
            // Форматирование ключа;
            stringProperty = functionStylePropertyProcess({ stringProperty: stringProperty });
            // Проверка найденного участка строки на наличие;
            if (stringParse) {
                
                domStyleElement.innerHTML = domStyleElement.innerHTML.replace(
                
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
                stringStyle   : "",
                stringExcerpt : "",
                stringProperty: "",
                
            },

        ) {

            let {

                domStyle,
                domElement,
                stringStyle,
                stringExcerpt,
                stringProperty,

            } = jectTransmit;

            if (!stringExcerpt) { stringExcerpt = `#${domElement.id}`; };
            if (!domStyle && !stringStyle && domElement) { stringStyle = functionStyleGetByElement({ domElement: domElement }).innerHTML; };
            
            return functionStringExtract({

                stringParse  : stringStyle,
                stringExcerpt: `${stringExcerpt}{[^}]*${stringProperty}:(?<stringResult>[^;]*);`,

            });

        };
        // Функция замены значения свойства у указанного стиля;
        function functionStylePropertyReplace(

            jectTransmit = {

                stringValue    : "",
                regexpExcerpt  : /./,
                stringProperty : "",
                domStyleElement: document.createElement("sr"),

            },

        ) {

            let {

                stringValue,
                regexpExcerpt,
                stringProperty,
                domStyleElement,

            } = jectTransmit;

            // Переменная с нужной частью строки;
            const stringParse = domStyleElement.innerHTML.match(regexpExcerpt)[0];
            // Проверка существования ключа;
            if (!Object.keys(document.createElement("sr").style).includes(stringProperty)) { return; };
            // Форматирование ключа;
            stringProperty = functionStylePropertyProcess({ stringProperty: stringProperty });
            // Проверка найденного участка строки на наличие;
            if (stringParse) {
                
                domStyleElement.innerHTML = functionStringReplace({
    
                    stringParse   : domStyleElement.innerHTML,
                    regexpExcerpt : regexpExcerpt,
                    stringReplace : `${stringProperty}:${stringValue};`,
                    stringReplaced: functionStringExtract({

                        stringParse  : stringParse,
                        stringExcerpt: `(?<stringResult>${stringProperty}:.*?;)`,

                    }),

                });
            
            };

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

        // Функция извлечения подстроки в строке;
        function functionStringExtract(

            jectTransmit = {

                stringParse   : "",
                stringExcerpt : "",
                regexpExcerpt : /./,
                boolExtractAll: false,

            },

        ) {

            const arrayStringResult = [];

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

                if (arrayJectNow.groups?.stringResult) { arrayStringResult.push(arrayJectNow.groups.stringResult); };

            });

            return (boolExtractAll) ? arrayStringResult : arrayStringResult[0];

        };
        // Функция извлечения подстрок в строке;
        function functionStringExtractMany(

            jectTransmit = {

                stringParse       : "",
                boolExtractAll    : false,
                arrayStringExcerpt: [""],
                arrayRegexpExcerpt: [/./],

            },

        ) {

            let {

                stringParse,
                boolExtractAll,
                arrayRegexpExcerpt,
                arrayStringExcerpt,

            } = jectTransmit;

            let arrayStringResult = [];

            if ((!arrayStringExcerpt && !arrayRegexpExcerpt) || !stringParse) {

                throw new Error(`functionStringExtractMany.jectTransmit - отсутсвуют ключевые аргументы;`);

            };

            if (arrayStringExcerpt) {

                arrayRegexpExcerpt = [];

                for (let stringExcerptNow of arrayStringExcerpt) {

                    arrayRegexpExcerpt.push(new RegExp(stringExcerptNow,"g"));

                };

            };

            for (let regexpExcerptNow of arrayRegexpExcerpt) {

                const arrayStringFind = functionStringExtract({

                    stringParse   : stringParse,
                    regexpExcerpt : regexpExcerptNow,
                    boolExtractAll: boolExtractAll,

                });

                if (arrayStringFind?.length) { arrayStringResult = arrayStringResult.concat(arrayStringFind); };

                if (!boolExtractAll && arrayStringResult.length) { break; }

            };

            return arrayStringResult;

        };
        // Функция извлечения подстрок в строке с сортировкой по группам;
        function functionStringExtractGroup(

            jectTransmit = {

                stringParse   : "",
                stringExcerpt : "",
                regexpExcerpt : /./,
                boolExtractAll: false,

            },

        ) {

            const jectResult = {};

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

                if (arrayJectNow.groups) {

                    Object.entries(arrayJectNow.groups).forEach((arrayJectPair) => {

                        if (arrayJectPair[1]) {
                            
                            if (arrayJectPair[0]) { jectResult[arrayJectPair[0]] = []; };

                            jectResult[arrayJectPair[0]].push(arrayJectPair[1]);
                        
                        };

                    });

                };

                arrayJect[numberIndex] = (arrayJectNow.groups) ? arrayJectNow.groups : undefined;

            });

            return (!boolExtractAll) ? jectResult?.stringResult?.[0] : jectResult;

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

                stringExcerpt = stringParse.replace("*","\\*");
                stringExcerpt = stringExcerpt.replaceAll(")","\\)");
                stringExcerpt = stringExcerpt.replaceAll("(","\\(");
                regexpExcerpt = new RegExp(stringExcerpt,"g");
            
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

            return new RegExp(`}${stringStyle}[^}]*}`,stringMode);

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