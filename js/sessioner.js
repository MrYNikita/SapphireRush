// Создание объекта сессии;
const jectSession = {};

// Числовые данные;
jectSession.numberSpeedGameMode = 1;
jectSession.numberRechargeScript = 5;

// Каталоги данных;
jectSession.arrayJectState = [];
jectSession.arrayJectAnima = [];
jectSession.arrayJectError = [];
jectSession.arrayJectScript = [];
jectSession.arrayStringError = [];
jectSession.arrayJectTimerPlot = [];
jectSession.arrayJectStatePlot = [];
jectSession.arrayDomElementPlot = [];
jectSession.arrayJectTimerSession = [];
jectSession.arrayJectStateClaster = [];
jectSession.arrayJectAnimaSequence = [];
jectSession.arrayJectAnimaTeamwise = [];
jectSession.arrayJectAnimaExecuter = [];
jectSession.arrayJectStateSequence = [];
jectSession.arrayDomElementSession = [];

// Style элементы;
jectSession.domStylePlot = functionDomElementCreate({ stringParms: "style stylePlot x head" })[0];
jectSession.domStyleBuffer = functionDomElementCreate({ stringParms: "style styleBuffer x head" })[0];
jectSession.domStyleSession = functionDomElementCreate({ stringParms: "style styleSession x head" })[0];

// HTML элементы;
jectSession.domDivBody = functionDomElementCreate({ stringParms: "div divBody x body session" })[0];
jectSession.domDivBackground = functionDomElementCreate({ stringParms: "div divBackground x divBody session" })[0];
jectSession.domCanvasBackground = functionDomElementCreate({ stringParms: "canvas canvasBackground x divBody session" })[0];

// Объектные данные;
jectSession.jectControllerState = {

    // Функция добавления состояния;
    functionStateAdd: function (

        arrayJectState = [new classState(), new classStateClaster()],

    ) {

        // Перебор состояний аргумента массива и сохранение их в последовательность состояний;
        jectSession.arrayJectStateSequence = functionArrayUnique({ arrayJect: arrayJectState }).filter((jectStateNow) => {

            if (

                (
                    jectStateNow instanceof classState ||
                    jectStateNow instanceof classStateClaster
                ) && !jectSession.arrayJectStateSequence.includes(jectStateNow)

            ) { return true; }

        }).concat(jectSession.arrayJectStateSequence);

    },
    // Функция выбора сюжета;
    functionStatePlotSelect: function (

        jectStatePlot = new classStatePlot(),

    ) {

        if (jectStatePlot instanceof classStatePlot) {

            // Переопределение сюжетного стиля;
            jectSession.domStylePlot.innerHTML = jectStatePlot.stringStyle;
            // Переопределение последовательности событий;
            jectSession.arrayJectStateSequence = jectStatePlot.arrayJectState;

        };

    },
    // Функция запуска последовательности событий;
    functionStateSequenceRedefinite: async function () {

        // Последовательность событий перебирается с первого события по последнее;
        while (jectSession.arrayJectStateSequence.length) {

            const jectState = jectSession.arrayJectStateSequence.pop();

            if (jectState instanceof classState) {

                await jectState.functionState();

            };
            if (jectState instanceof classStateClaster) {

                jectSession.arrayJectStateSequence = jectSession.arrayJectStateSequence.concat(jectState.arrayJectState);

            };

        };

    },

};
// Функция переопределния перезарядки скрипта;
jectSession.functionRechargeScript = function (

    jectTransmit = {



    }

) {

    return setInterval(() => {

        if (jectSession.numberRechargeScript) {

            jectSession.numberRechargeScript--;

        } else {

            jectSession.intervalRechargeScript = undefined;

        };

    }, (1000 * jectSession.numberSpeedMode));

};
// Функция обновления интервалов;
jectSession.functionSpeedGameChange = function (

    jectTransmit = {

        numberSpeedGameMode: 3,

    },

) {

    jectTransmit.numberSpeedGameMode -= 1;

    const {

        numberSpeedGameMode,

    } = jectTransmit;

    jectSession.numberSpeedGameMode = numberSpeedGameMode;

    jectSession.arrayJectAnimaExecuter.forEach((jectAnimaExecuterNow) => {

        jectAnimaExecuterNow.functionUpdate();

    });


};

// Интервал перезарядки скрипта;
jectSession.intervalRechargeScript = jectSession.functionRechargeScript();

functionResolveConnect();