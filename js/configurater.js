// Создание объекта конфигураций;
const jectConfigurate = {};

// Логические данные;
jectConfigurate.boolSkip = false;
jectConfigurate.boolReload = true;
jectConfigurate.boolSkipAnima = false;
jectConfigurate.boolSkipState = false;
jectConfigurate.boolSkipExecutor = false;
jectConfigurate.boolClearSession = false;
jectConfigurate.boolSaveAnimaImplement = false;
jectConfigurate.boolSaveDomElementStyle = false;

// Числовые данные;
jectConfigurate.numberScreenWidthMin = 270;
jectConfigurate.numberScreenHeightMin = 570;
jectConfigurate.numberDefaultSpeedAnima = 10;
jectConfigurate.numberDefaultSpeedExecutor = 10;
jectConfigurate.numberDivBackgroundGridRows = 11;
jectConfigurate.numberDivBackgroundGridColumns = 9;
jectConfigurate.numberDefaultCountFinishExecutor = 100;

// Строковые данные;
jectConfigurate.stringDefaultColorPurple = "rgba(210,0,255,1)";
jectConfigurate.stringDefaultColorOrange = "rgba(255,120,0,1)";
jectConfigurate.stringDefaultStyleClassText = "elementText";
jectConfigurate.stringDefaultStyleClassSelect = "elementSelect";
jectConfigurate.stringDefaultSessionBorderColor = "rgba(145,145,145,1)";
jectConfigurate.stringDefaultSessionClassSpanEnd = "spanEnd";
jectConfigurate.stringDefaultSessionBackgroundColor = "rgba(0,0,0,1)";

// Каталоги данных;
jectConfigurate.arrayStringTypeValue = ["bool","string","number","function","regexp","ject","dom","style"];
jectConfigurate.arrayStringTypeCatalog = ["array","map","set"];
jectConfigurate.arrayNumberSpeedGameMode = [0.25, 0.5, 1, 2, 4];
jectConfigurate.arrayStringSpeedGameMode = ["очень медленно", "медленно", "нормально", "быстро", "очень быстро"];

// Регулярные выражения;
jectConfigurate.regexpStyleExctractProperty = /(?:[\d; ]*([^{]*?):)/;

// Обработка данных;

if (jectConfigurate.boolSkip) {

    jectConfigurate.boolSkipAnima = true;
    jectConfigurate.boolSkipState = true;

};
if (jectConfigurate.numberDivBackgroundGridRows < 5) {

    jectConfigurate.numberDivBackgroundGridRows = 5;

};
if (jectConfigurate.numberDivBackgroundGridColumns < 7) {

    jectConfigurate.numberDivBackgroundGridColumns = 7;

};
if (jectConfigurate.numberDivBackgroundGridRows % 2 === 0) {

    jectConfigurate.numberDivBackgroundGridRows--;

};
if (jectConfigurate.numberDivBackgroundGridColumns % 2 === 0) {

    jectConfigurate.numberDivBackgroundGridColumns--;

};

functionResolveConnect();