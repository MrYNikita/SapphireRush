(async function() {

    // Прослушиватель получения глобальных ошибок;
    window.onerror = function () {

        // Проверка конфигурации перезагрузки;
        if (jectConfigurate.boolReload) {

            // Проверка наличия перезагрузок;
            if (!sessionStorage.getItem("numberReload")) {

                sessionStorage.setItem("numberReload",1);
    
            } else {
    
                // Логирование кол-ва перезагрузок;
                console.log(`Количество перезагрузок: ${sessionStorage.getItem("numberReload")}`);
    
                // Увеличение кол-ва попыток;
                sessionStorage.setItem("numberReload",sessionStorage.getItem("numberReload") - 0 + 1);
    
            };
    
            // Проверка кол-ва перезагрузок;
            if (sessionStorage.getItem("numberReload") === "4") {
    
                sessionStorage.clear();
                window.onerror = undefined;
    
            } else { document.location.reload(); };

        };

    };
    // Прослушиватель переопределения размера;
    window.addEventListener("resize",() => {

        let { width, height } = window.screen;

        let numberDivBackgroundGridRows    = functionStrokeExtract({
            
            strokeParse: functionStylePropertyExtract({

                domStyle: jectSession.domStyleSession,
                strokeFind: "grid-template-rows",
                strokeExcerpt: "divBackground",

            })[0],
            regexpExcerpt: /repeat[(]{1}([0-9]*){1}[,]{1}/

        })[1] - 0;
        let numberDivBackgroundGridColumns = functionStrokeExtract({
            
            strokeParse: functionStylePropertyExtract({

                domStyle: jectSession.domStyleSession,
                strokeFind: "grid-template-columns",
                strokeExcerpt: "divBackground",

            })[0],
            regexpExcerpt: /repeat[(]{1}([0-9]*){1}[,]{1}/

        })[1] - 0;

        console.log(window.screen.availWidth,window.screen.availHeight);

        if (width < jectConfigurate.numberScreenWidthMin) {

            

        } else {



        }
        if (height < jectConfigurate.numberScreenHeightMin) {

            

        }

    });
    // Прослушиватель нажатий клавиш;
    window.addEventListener("keypress",(jectEvent) => {

        const { key, } = jectEvent;

        // Клавиши контроля времени;
        switch(key) {

            case "1": { jectSession.functionSpeedGameChange({ numberSpeedGameMode: 1, }); }; break;
            case "2": { jectSession.functionSpeedGameChange({ numberSpeedGameMode: 2, }); }; break;
            case "3": { jectSession.functionSpeedGameChange({ numberSpeedGameMode: 3, }); }; break;
            case "4": { jectSession.functionSpeedGameChange({ numberSpeedGameMode: 4, }); }; break;
            case "5": { jectSession.functionSpeedGameChange({ numberSpeedGameMode: 5, }); }; break;

        };

    });

})();

functionResolveConnect();