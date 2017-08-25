let ErrorParser = require('./ErrorParser');
let ErrorPresentor = require('./ErrorPresentor');

class PrettyErrors extends Error {

    constructor(message, name, code) {
        super(message);

        if(name) this.name = name;
        if(code) this.code = code;

        this.toString();
        process.exit();
    }

    toString() {
        let prettyError = (new ErrorParser).parse(this);
        (new ErrorPresentor).print(prettyError);
    }

    static throw(error) {
        let prettyError = (new ErrorParser).parse(error);
        (new ErrorPresentor).print(prettyError);

        process.exit();
    }

}

module.exports = PrettyErrors;
