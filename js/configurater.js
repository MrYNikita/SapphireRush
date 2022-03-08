// Создание объекта конфигураций;
const jectConfigurate = {};

// Логические данные;
jectConfigurate.boolSkip                = false;
jectConfigurate.boolReload              = true;
jectConfigurate.boolSkipAnima           = false;
jectConfigurate.boolSkipState           = false;
jectConfigurate.boolSkipTimer           = false;
jectConfigurate.boolClearSession        = false;
jectConfigurate.boolSaveAnimaImplement  = false;
jectConfigurate.boolSaveDomElementStyle = false;

// Числовые данные;
jectConfigurate.numberDefaultIterate           = 100;
jectConfigurate.numberScreenWidthMin           = 270;
jectConfigurate.numberScreenHeightMin          = 570;
jectConfigurate.numberDefaultSpeedGame         = 1000;
jectConfigurate.numberDefaultSpeedTimer        = 1000;
jectConfigurate.numberDefaultSpeedAnima        = 10;
jectConfigurate.numberDefaultIterateAnima      = 100;
jectConfigurate.numberDivBackgroundGridRows    = 11;
jectConfigurate.numberDivBackgroundGridColumns = 9;

// Строковые данные;

// Каталоги данных;
jectConfigurate.arrayNumberSpeedGameMode = [0.25,0.5,1,2,4];
jectConfigurate.arrayStringSpeedGameMode = ["очень медленно","медленно","нормально","быстро","очень быстро"];

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