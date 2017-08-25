global.dd = (...args) => {
    console.log(...args);
    process.exit();
}
class Echo {

    constructor() {
        return this.proxy();
    }

    proxy() {
        return new Proxy(this, {
            get: function(echo, field) {
                if(typeof field === "symbol") return echo.print();

                field = field.toLowerCase();

                if (field in echo) {
                    return echo[field];
                }

                if(field.endsWith("bg")) {
                    field = field.slice(0,-2);
                    if(field in echo.code().bg) return echo.bg(field);
                }

                if(field in echo.code().color) return echo.color(field);
                if(field in echo.code().control) return echo.control(field);
            }
        });
    }

    code() {
        let store = {
            color: {
                black:    "\x1b[30m",
                red:      "\x1b[31m",
                green:    "\x1b[32m",
                yellow:   "\x1b[33m",
                blue:     "\x1b[34m",
                magenta:  "\x1b[35m",
                cyan:     "\x1b[36m",
                lgrey:    "\x1b[37m",
                grey:     "\x1b[90m",
                lred:     "\x1b[91m",
                lgreen:   "\x1b[92m",
                lyellow:  "\x1b[93m",
                lblue:    "\x1b[94m",
                lmagenta: "\x1b[95m",
                lcyan:    "\x1b[96m",
                white:    "\x1b[97m",
            },
            bg: {
                black:      "\x1b[40m",
                red:        "\x1b[41m",
                green:      "\x1b[42m",
                yellow:     "\x1b[43m",
                blue:       "\x1b[44m",
                magenta:    "\x1b[45m",
                cyan:       "\x1b[46m",
                lgrey:      "\x1b[47m",
                grey:       "\x1b[100m",
                lred:       "\x1b[101m",
                lgreen:     "\x1b[102m",
                lyellow:    "\x1b[103m",
                lblue:      "\x1b[104m",
                lmagenta:   "\x1b[105m",
                lcyan:      "\x1b[106m",
                white:      "\x1b[107m",
            },
            control: {
                reset:      "\x1b[0m",
                bold:       "\x1b[1m",
                dim:        "\x1b[2m",
                underline:  "\x1b[4m",
                blink:      "\x1b[5m",
                inverse:    "\x1b[7m",
                hidden:     "\x1b[8m",
                break:      "\n",
                tab:        "\t",
            },
        }

        return store;
    }

    color(name) {
        process.stdout.write(this.code().color[name]);

        return this.proxy();
    }

    bg(name) {
        process.stdout.write(this.code().bg[name]);

        return this.proxy();
    }

    control(name) {
        process.stdout.write(this.code().control[name]);

        return this.proxy();
    }

    dd(...args) {
        args.unshift(" "); args.push(" ");
        console.log(...args)
        process.exit();
    }

    text(...msg) {
        process.stdout.write(`${msg.join(" ")}`);
        this.control("reset");

        return this.proxy();
    }

    center(msg, size) {
        size = size || process.stdout.columns;
        process.stdout.write(str_pad(`  ${msg}  `, size, " "));
        this.control("reset");

        return this.proxy();
    }

    right(msg, size) {
        size = size || process.stdout.columns;
        process.stdout.write(str_pad_left(`  ${msg}  `, size, " "));
        this.control("reset");

        return this.proxy();
    }

    left(msg, size) {
        size = size || process.stdout.columns;
        process.stdout.write(str_pad_right(`  ${msg}  `, size, " "));
        this.control("reset");

        return this.proxy();
    }

    line(size) {
        size = size || process.stdout.columns;
        process.stdout.write(str_pad(``, size, " "));
        this.control("reset");

        return this.proxy();
    }

}

function str_pad(str, size, pad) {
    for(let n = str.length; n < size; n++) {
        if(n%2 === 0) {
            str = pad + str;
        } else {
            str = str + pad;
        }
    }

    return str;
}

function str_pad_left(str, size, pad) {
    for(let n = str.length; n < size; n++) {
        str = pad + str;
    }

    return str;
}

function str_pad_right(str, size, pad) {
    for(let n = str.length; n < size; n++) {
        str = str + pad;
    }

    return str;
}

module.exports = Echo;
