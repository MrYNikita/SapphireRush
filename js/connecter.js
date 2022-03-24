// Переменная с ссылкой на функцию завершения подключения;
let functionResolveConnect;

// Функция подключения скриптов;
(async function() {

    // Набор всех скриптов;
    let arrayStringScripts = [

        "configurater",
        "functioner",
        "aggregator",
        "sessioner",

    ];
    // Набор базовых скриптов;
    let arrayStringScriptsBasics = [

        "styler",
        "starter",

    ];
    // Набор классовых скриптов;
    let arrayStringScriptsClasses = [

        "basic",

    ];

    // Добавление ко всем путям классовых скриптов приставки;
    arrayStringScriptsClasses.forEach((stringScriptNow,numberIndexNow) => {

        arrayStringScriptsClasses[numberIndexNow] = `class/${stringScriptNow}`;

    });

    // Добавление всех необходимых для загрузки путей к скриптам в единый каталог;
    arrayStringScripts = arrayStringScripts.concat(arrayStringScriptsClasses);
    arrayStringScripts = arrayStringScripts.concat(arrayStringScriptsBasics);

    // Подключение всех необходимых скриптов;
    for (let numberIndex = 0; numberIndex < arrayStringScripts.length; numberIndex++) {

        const domElement = document.createElement("script");

        const dateBeginConnect = new Date();

        domElement.src = `./js/${arrayStringScripts[numberIndex]}.js`;

        await new Promise((functionResolveNow) => {

            functionResolveConnect = functionResolveNow;

            document.body.appendChild(domElement);

        });

        console.log(`Подключение ${arrayStringScripts[numberIndex].split("/").pop()}.js завершено успешно. Время: ${new Date() - dateBeginConnect}ms;`);

    };

}());