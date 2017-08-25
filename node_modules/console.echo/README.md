# Console.Echo
A simple terminal string prettyfier with a readable interface.

## Install

```
    npm install console.echo
```

## Usage

```js
    let echo = require("console.echo");

    echo.blueBg.white.bold.text("Hello world!");
```

__Obs__ All the methods are NOT case sensitive. Feel free to use whatever feels right for you.

### Writing

There are two methods to print to the terminal:

+ `text()`: Simply prints to the terminal
+ `dd()`:   Prints to the terminal and exits the process (good for debugging `=)`)

The strings are formatted by the chained methods before it.
These methods accept multiple arguments which will be printed joined by a whitespace.

```js
    echo.text("hello", "world"); // prints => "hello world"
```

### Text align

If you need to print a full line use:

+ `left()`:   Prints full line with text aligned to the left
+ `right()`:  Prints full line with text aligned to the right
+ `center()`: Prints full line with text aligned to the center

A second argument can be passed which sets the length of the line.

### Blank line

If you need a full blank line use:

+ `line()`:   Prints a full blank line

A first argument can be passed which sets the length of the line.

### Colors

Choose between 16 colors:

+ black
+ red
+ green
+ yellow
+ blue
+ magenta
+ cyan
+ lgrey
+ grey
+ lred
+ lgreen
+ lyellow
+ lblue
+ lmagenta
+ lcyan
+ white

### Background

To change the background color, chain the name of the color with `Bg` at the end before the `text` method:

```js
    echo.redBg.text("Red background");

    echo.magentaBg.text("Magenta background");
```

### Font color

To change the background color, chain the color name before the `text` method.:

```js
    echo.green.text("Green text");

    echo.cyan.text("Cyan text");
```

### Text modifiers

+ bold
+ dim
+ underline
+ blink
+ inverse
+ hidden

To use text modifiers just chain them on the string before the `text` method:

```js
    echo.bold.text("Bold text");

    echo.undeline.text("Underlined text");
```

### Helpers

There are three helpers:

+ reset: Resets the style to the termal's default.
+ break: Adds a line break `\n` and jumps to the next line.
+ tab:   Adds a tab `\t`.

To use them, just chain them along:

```js
    echo.text("Line break after the text").break;

    echo.redBg.tab.text("Tab brefore text (with red background)")
```

### Chain away

You can go crazy and chain multiple strings and styles:

```js
    echo.redBg.text("The message")
        .blueBg.text("This is on the same line as 'The message'");

    echo.blueBg.red.text("A red text with blue bg!")
        .break.tab
        .lredBg.cyan.text("A cyan text with light red bg (on the next line)!");
```
