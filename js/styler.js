{

    const {

        stylePlot,
        styleBuffer,
        styleSession,

    } = jectSession;

    // ID;
    styleSession.innerHTML += ` #divBody {

        width   : 100%;
        height  : 100%;
        position: absolute;

    }`;
    styleSession.innerHTML += ` #divBackground {

        width              : 100%;
        height             : 100%;
        display            : grid;
        gridTemplateRows   : repeat(${jectConfigurate.numberDivBackgroundGridRows},1fr);
        gridTemplateColumns: repeat(${jectConfigurate.numberDivBackgroundGridColumns},1fr);

    }`;
    styleSession.innerHTML += ` #canvasBackground {

        display: none;

    }`;

    // Классы;


    // Группы;
    styleSession.innerHTML += ` * {

        margin     : 0;
        padding    : 0;
        fontFamily : "Courier New", monospace;
        marginLeft : auto;
        marginRight: auto;

    }`;
    styleSession.innerHTML += ` body {

        background: rgba(255,255,255,0);

    }`;

    // Аниматоры;

}

functionStyleProcess({ styleElement: jectSession.stylePlot, });
functionStyleProcess({ styleElement: jectSession.styleBuffer, });
functionStyleProcess({ styleElement: jectSession.styleSession, });


functionResolveConnect();