let ErrorParser = require('./ErrorParser');
let ErrorPresentor = require('./ErrorPresentor');

class PrettyErrors {

    static throw(error) {
        let prettyError = (new ErrorParser).parse(error);
        (new ErrorPresentor).print(prettyError);

        process.exit();
    }

}

module.exports = PrettyErrors;
