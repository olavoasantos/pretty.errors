let echo = require('console.echo');
class ErrorPresentor {

    print(error) {
        echo.break;
        this.makeDetails(error);
        this.makeHeader(error);
        this.makeStack(error);
    }

    makeStack(error) {
        let main = error.trace.shift();
        this.makeMainFrame(main);

        error.trace.forEach( frame => this.makeFrame(frame));
    }

    makeMainFrame(frame) {
        if(frame.name) echo.text("• ");
        if(frame.name) echo.lred.text(frame.name);
        if(frame.row) echo.magenta.text("@")
                          .lmagenta.text(`${frame.row}:${frame.column}`).break;
        if(frame.path) echo.grey.text(`  in ${frame.path}`)
        echo.break;
    }

    makeFrame(frame) {
            echo.lgrey.text("• ");
        if(frame.name) {
            echo.white.text(frame.name);
            if(frame.row) echo.yellow.text("@")
                              .lyellow.text(`${frame.row}:${frame.column}`).break;
            if(frame.path) echo.grey.text(`  in ${frame.path}`);
        } else {
            if(frame.path) echo.lgrey.text(`${frame.path}`);
            if(frame.row) echo.yellow.text("@")
                              .lyellow.text(`${frame.row}:${frame.column}`).break;
        }
        echo.break;
    }

    makeDetails(error) {
        let name = error.name;
        let type = ` \\${error.constructor.name}`;
        let code = (error.code) ? `#${error.code} ` : "";
        let details = ` ${code}${name}`;

        echo.redBg.bold.text(details)
            .redBg.grey.right(type, process.stdout.columns - details.length);
    }

    makeHeader(error) {
        echo.lredBg.line();
        echo.lredBg.center(error.message || "Whooops!! Something went wrong!");
        echo.lredBg.line();
        echo.reset.line();
    }
}

module.exports = ErrorPresentor;
