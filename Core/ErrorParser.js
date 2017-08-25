class ErrorParser {
    parse(error) {
        error.trace = this.split(error.stack);
        error.trace.shift();
        error.trace = error.trace.map(line=>this.getDetailsFrom(line));

        return error;
    }

    getDetailsFrom(line) {
        line = line.split(" ");

        let details = {};
        line.forEach( piece => {
            Object.assign(details, this.parseLine(piece))
        });

        return details;
    }

    parseLine(piece) {
        if(piece.indexOf(":") > -1) {
            if(piece.endsWith(")")) piece = piece.slice(0,-1);
            if(piece.startsWith("(")) piece = piece.substring(1);
            let details = {path: "", column: null, row: null};

            let partial = "";
            for(let i = piece.length-1; i > -1; i--) {
                if(piece[i] === ":") {
                    if(!details.column) {
                        details.column = partial;
                        partial = "";
                    }else if(details.column && !details.row) {
                        details.row = partial;
                        details.path = piece.slice(0,i);
                        break;
                    }
                } else {
                    partial = piece[i] + partial;
                }
            }

            return details;
        }

        return {name: piece};
    }

    split(errors) {
        return errors
            .replace(/\s+/g, ' ')
            .trim()
            .split(' at ');
    }
}

module.exports = ErrorParser;
