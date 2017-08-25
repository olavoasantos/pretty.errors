# Pretty Errors
Just because they are errors doesn't mean they can't be pretty.

![TypeError Screenshot](/docs/screenshot.jpg?raw=true "TypeError Screenshot")

## Installation

```
    npm install pretty.errors
```

## Usage

### throw new PrettyError

Pretty Errors extends the Error class and so it can be thrown as such.  However, the Pretty Errors constructor accepts three arguments:

+ Message   (String)    The message property is the string description of the error.
+ Name      (String)    The name property is a string label that identifies the error.
+ Code      (String)    The code property is a string label that identifies the kind of error.

By passing it to the constructor, it automatically assigns it.

Moreover, if you wish to create your own custom errors for your app, you can make it pretty by extending the Pretty Errors class.

#### Example

```js
    let PrettyErrors = require("pretty.errors");

    ...
    throw new PrettyErrors("Something bad occoured", "Really bad error". 500);
    ...
```

### Throw a specific error

Pretty Errors class has a special static method called `throw()`. This method accepts an Error class, makes it pretty and exits the process. So, if you need to throw a especific error, you can still make use of all this beauty:

```js
    let PrettyErrors = require("pretty.errors");
    
    try {
        require('url').parse(() => { }); // throws TypeError, since it expected a string
    } catch(e) {
        PrettyErrors.throw(e);
    }
```

## Dependencies

+ [console.echo](https://github.com/olavoasantos/console.echo)

## Author

+ [Olavo Amorim Santos](https://github.com/olavoasantos)
