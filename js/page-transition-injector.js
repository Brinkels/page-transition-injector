var PTI = {
    options: {
        generateSheetsPerElement: true,
        transitionTime: 1000,
        direction: 'right',
        skewX: 0,
        skewY: 0
    },
    skewed: false,
    init: (options) => {
        if (typeof options != 'undefined') PTI.options = {...PTI.options, ...options};

        //Init transition container
        var transitionContainer = document.createElement('div');
        transitionContainer.id = 'page-transition-container';
        document.body.appendChild(transitionContainer);

        //Add event listeners
        document.querySelectorAll('.page-transition').forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault();
                let location = element.getAttribute('href');
                var generatorSheets = [];
                var colors = [];

                if (element.getAttribute('data-pti-colors')) {
                    var colors = element.getAttribute('data-pti-colors').split(' ');
                }

                if (element.getAttribute('data-pti-direction')) {
                    PTI.options.direction = element.getAttribute('data-pti-direction');
                }
                
                colors.forEach((color) => {
                    generatorSheets.push({
                        color: color
                    });
                })

                PTI.sheetsLeaving(generatorSheets, element);
        
                setTimeout(() => {
                    window.location.href = location;
                }, element.getAttribute('data-pti-transition-time') || PTI.options.transitionTime);
            });
        });
    },
    generateSheets: (elementSheets, transitionTime, inverted) => {

        //Generate transition sheets
        var builtSheets = [];
        var sheetCounter = 0;
        var sheetAmount = PTI.options.generateSheetsPerElement ? elementSheets.length : PTI.options.sheets.length;
        var totalTransitionTime = transitionTime || PTI.options.transitionTime;
        var timePerSheet = totalTransitionTime / sheetAmount;

        var sheets = PTI.options.generateSheetsPerElement ? elementSheets : PTI.options.sheets;

        if (inverted) sheets = sheets.slice().reverse();

        sheets.forEach(sheet => {
            sheetCounter++;
            let sheetDiv = document.createElement('div');
            sheetDiv.style.backgroundColor = sheet.color;
            sheetDiv.style.width = '100vw';
            sheetDiv.style.height = '100vh';
            sheetDiv.style.transform = 'skew(' + PTI.options.skewX + 'deg,' + PTI.options.skewY + 'deg) scale(' + Math.floor(((PTI.options.skewX/360)+1) + (PTI.options.skewY/360)+1) + ')';
            console.log('scale(' + Math.floor(((PTI.options.skewX/360)+1) + (PTI.options.skewY/360)+1) + ')');
            if (!inverted) sheetDiv.style.zIndex = sheetCounter-1 + 10;
            
            switch (PTI.options.direction) {
                case 'up':
                    sheetDiv.style.animationName = "scroll-up";
                    break;

                case 'down':
                    sheetDiv.style.animationName = "scroll-down";
                    break;

                case 'left':
                    sheetDiv.style.animationName = "scroll-left";
                    break;
                
                case 'right':
                    sheetDiv.style.animationName = "scroll-right";
                    break;                    
            
                default:
                    sheetDiv.style.animationName = "scroll-up";
                    break;
            }

            if (inverted) {
                sheetDiv.style.animationDirection = 'reverse';
                sheetDiv.style.zIndex = sheets.length + 20 - sheetCounter;
                sheetDiv.style.animationDelay = timePerSheet * sheets.length - sheetCounter;
            }
            sheetDiv.style.animationFillMode = "forwards";
            sheetDiv.style.animationDuration = timePerSheet * sheetCounter + 'ms';
            sheetDiv.classList.add('page-transition-sheet');
            console.log(timePerSheet);
            builtSheets.push(sheetDiv);
        });

        setTimeout(() => {
            document.querySelectorAll('.page-transition-sheet').forEach(element => {
                element.remove();
            })
        }, totalTransitionTime+100);

        return builtSheets;
    },
    sheetsLeaving: (sheets, element) => {
        var builtSheets = PTI.generateSheets(sheets, typeof element !== 'undefined' ? element.getAttribute('data-pti-transition-time'): PTI.options.transitionTime);
        builtSheets.forEach(sheet => {
            document.getElementById('page-transition-container').appendChild(sheet);
        });
    },
    sheetsArriving: sheets => {
        var builtSheets = PTI.generateSheets(sheets, PTI.options.transitionTime, true);
        builtSheets.forEach(sheet => {
            document.getElementById('page-transition-container').appendChild(sheet);
        });
    }

}
