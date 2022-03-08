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
            gridTemplateRows   : `repeat(${jectConfigurate.numberDivBackgroundGridRows},1fr)`,
            gridTemplateColumns: `repeat(${jectConfigurate.numberDivBackgroundGridColumns},1fr)`,

        },

    });
    functionStylePropertySet({

        domElement    : jectSession.domCanvasBackground,
        jectParamStyle: {

            display: `none`,

        },

    });

    // Классы;


    // Группы;
    domStyleSession.innerHTML += `body{}*{}`;
    functionStylePropertySet({

        styleElement  : jectSession.domStyleSession,
        stringElement : "\\*",
        jectParamStyle: {

            margin     : `0`,
            padding    : `0`,
            fontFamily : `"Courier New", monospace`,
            marginLeft : `auto`,
            marginRight: `auto`,

        },

    });
    functionStylePropertySet({

        styleElement  : jectSession.domStyleSession,
        stringElement : "body",
        jectParamStyle: {

            background: "rgba(255,255,255,0)",

        },

    });

    // Аниматоры;

}

functionStyleProcess({ styleElement: jectSession.domStylePlot, });
functionStyleProcess({ styleElement: jectSession.domStyleBuffer, });
functionStyleProcess({ styleElement: jectSession.domStyleSession, });


functionResolveConnect();