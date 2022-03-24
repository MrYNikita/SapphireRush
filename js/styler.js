{

    const {

        domStylePlot,
        domStyleBuffer,
        domStyleSession,

    } = jectSession;

    let functionStylePropertySetSession = functionStylePropertyPreset({ domStyleElement: domStyleSession });

    // ID;
    functionStylePropertySet({

        domElement: jectSession.domDivBody,
        jectParamStyle: {

            width: `100%`,
            height: `100%`,
            position: `absolute`,

        },

    });
    functionStylePropertySet({

        domElement: jectSession.domDivBackground,
        jectParamStyle: {

            width: `100%`,
            height: `100%`,
            display: `grid`,
            gridTemplateRows: `repeat(${jectConfigurate.numberDivBackgroundGridRows},1fr)`,
            gridTemplateColumns: `repeat(${jectConfigurate.numberDivBackgroundGridColumns},1fr)`,

        },

    });
    functionStylePropertySet({

        domElement: jectSession.domCanvasBackground,
        jectParamStyle: {

            display: `none`,

        },

    });

    // Группы;
    domStyleSession.innerHTML += `*{}`;
    functionStylePropertySetSession({

        stringElement: `\\*`,
        //domStyleElement: domStyleSession,
        jectParamStyle: {

            margin: `0`,
            padding: `0`,
            fontSize: `25px`,
            textAlign: `center`,
            fontFamily: `"Courier New",monospace`,
            marginLeft: `auto`,
            marginRight: `auto`,

        },

    });

    domStyleSession.innerHTML += `body{}`;
    functionStylePropertySet({

        stringElement: `body`,
        domStyleElement: domStyleSession,
        jectParamStyle: {



        },

    });

    // Классы;

    domStyleSession.innerHTML += `.${jectConfigurate.stringDefaultStyleClassText}{}`;
    functionStylePropertySet({

        stringElement: `.${jectConfigurate.stringDefaultStyleClassText}`,
        domStyleElement: domStyleSession,
        jectParamStyle: {

            letterSpacing: `20px`,

        },

    });

    domStyleSession.innerHTML += `.${jectConfigurate.stringDefaultStyleClassSelect}{}`;
    functionStylePropertySet({

        stringElement: `.${jectConfigurate.stringDefaultStyleClassSelect}`,
        domStyleElement: domStyleSession,
        jectParamStyle: {

            color: `rgba(255,255,255,1)`,
            transitionDuration: `1s`,
            transitionProperty: `color`,

        },

    });

    domStyleSession.innerHTML += `.${jectConfigurate.stringDefaultSessionClassSpanEnd}{}`;
    functionStylePropertySet({

        stringElement: `.${jectConfigurate.stringDefaultSessionClassSpanEnd}`,
        domStyleElement: domStyleSession,
        jectParamStyle: {

            letterSpacing: `0px`,

        },

    });

    // Наследования;


    // Аниматоры;


}

functionResolveConnect();