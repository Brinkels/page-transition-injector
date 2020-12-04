# Page transition injector

A library to generate page transitions painlessly.

# How to use
## Install the library in your project
1. Download this repository using either Git or the download as zip button.
2. Save /css/page-transition-injector.css and /js/page-transition-injector.js in your working directory.
3. Import them in your page's head.
5. Add the `page-transition` class to the elements you want the transition to trigger on.
4. Add a script tag at the end of your page's body.

```HTML
<script>
    PTI.init();
</script>
```


## Use the library
By default, PTI will use HTML data attributes to control its behaviour, you can change this in the configuration object (more info below), or by setting `PTI.options.generateSheetsPerElement` to `false` in your script tag (not recommended).

### HTML Data attributes
- data-pti-transition-time: Sets the amount of milliseconds to run the animation for.
- data-pti-colors: A space separated list of colors that will be used to dynamically generate transition sheets.
- data-pti-direction: the direction in which the animation will move (up, down, left or right).

### The configuration object
You can pass a configuration object to the init function when you initialise the library.

This object's properties can be the following, although they are all optional:
- direction: up, down, left or right.
- sheets: An array of sheet objects (more below).
- generateSheetsPerElement: A boolean value that toggles whether or not to listen to data attributes on HTML (If you set this to false you MUST specify at least one sheet object in the sheets property).
- transitionTime: The amount of milliseconds you want the animation to last for.

#### The sheet object
Sheets are those colored thingies that fly over your screen when you use PTI, you know, the whole reason why you're here. They are usually automatically generated when you specify data-pti-colors, but you can specify them in your options object if you prefer to have all your links use the same sheets.

Sheet objects are fairly simple, they only have one property
- color: a string with a color value, usually hexadecimal, but you can use rgb functions, just remember not to put spaces in them.

**Configuration object use example:**
```Js
    PTI.init({
        direction: 'down',
        sheets: [{
            color: '#AA0000'
        }, {
            color: '#FFFFFF'
        }],
        generateSheetsPerElement: false
    });
```
