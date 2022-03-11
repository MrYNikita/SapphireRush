{

    const {

        domStylePlot,
        domStyleBuffer,
        domStyleSession,

    } = jectSession;

    // ID;
    functionStylePropertySet({

        domElement    : jectSession.domDivBody,
        jectParamStyle: {

            width   : `100%`,
            height  : `100%`,
            position: `absolute`,

        },

    });
    functionStylePropertySet({

        domElement    : jectSession.domDivBackground,
        jectParamStyle: {

            width              : `100%`,
            height             : `100%`,
            display            : `grid`,
            color              : `red`,
            gridTemplateRows   : `repeat(${jectConfigurate.numberDivBackgroundGridRows},1fr)`,
            gridTemplateColumns: `repeat(${jectConfigurate.numberDivBackgroundGridColumns},1fr)`,
            textAlign          : `center`,
            fontSize           : `5px`,

        },

    });
    functionStylePropertySet({

        domElement    : jectSession.domCanvasBackground,
        jectParamStyle: {

            display: `none`,

        },

    });

    // Группы;
    domStyleSession.innerHTML += `*{}`;
    functionStylePropertySet({

        stringElement  : `\\*`,
        domStyleElement: domStyleSession,
        jectParamStyle : {

            margin     : `0`,
            padding    : `0`,
            fontSize   : `25px`,
            textAlign  : `center`,
            fontFamily : `"Courier New",monospace`,
            marginLeft : `auto`,
            marginRight: `auto`,

        },

    });

    domStyleSession.innerHTML += `body{}`;
    functionStylePropertySet({

        stringElement  : `body`,
        domStyleElement: domStyleSession,
        jectParamStyle : {

            

        },

    });

    // Классы;
    domStyleSession.innerHTML += `.${jectConfigurate.stringDefaultStyleClassText}{}`;
    functionStylePropertySet({

        stringElement  : `.${jectConfigurate.stringDefaultStyleClassText}`,
        domStyleElement: domStyleSession,
        jectParamStyle : {

            letterSpacing: `5px`,

        },

    });

    domStyleSession.innerHTML += `.${jectConfigurate.stringDefaultSessionClassSpanEnd}{}`;
    functionStylePropertySet({

        stringElement  : `.${jectConfigurate.stringDefaultSessionClassSpanEnd}`,
        domStyleElement: domStyleSession,
        jectParamStyle : {

            letterSpacing: `0px`,

        },

    });

    // Аниматоры;
    


}

functionResolveConnect();