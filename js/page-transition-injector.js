var PTI = {
    options: {
        generateSheetsPerElement: true
    },
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

                console.log(generatorSheets);

                var builtSheets = PTI.generateSheets(generatorSheets, element.getAttribute('data-pti-transition-time'));

                if (builtSheets.length == 0) {
                    window.location.href = location;
                }

                builtSheets.forEach(sheet => {
                    document.getElementById('page-transition-container').appendChild(sheet);
                });
        
                setTimeout(() => {
                    window.location.href = location;
                }, PTI.options.transitionTime ? PTI.options.transitionTime : element.getAttribute('data-pti-transition-time') || 1000);
            });
        });
    },
    generateSheets: (elementSheets, transitionTime) => {

        //Generate transition sheets
        var builtSheets = [];
        var sheetCounter = 0;
        var sheetAmount = PTI.options.generateSheetsPerElement ? elementSheets.length : PTI.options.sheets.length;
        var totalTransitionTime = PTI.options.transitionTime ? PTI.options.transitionTime : transitionTime || 1000;
        var timePerSheet = totalTransitionTime / sheetAmount;

        var sheets = PTI.options.generateSheetsPerElement ? elementSheets : PTI.options.sheets;

        sheets.forEach(sheet => {
            sheetCounter++;
            let sheetDiv = document.createElement('div');
            sheetDiv.style.backgroundColor = sheet.color;
            sheetDiv.style.width = '100vw';
            sheetDiv.style.height = '100vh';
            
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

                case 'down':
                    
            
                default:
                    sheetDiv.style.animationName = "scroll-up";
                    break;
            }

            sheetDiv.style.animationDuration = timePerSheet * sheetCounter + 'ms';
            sheetDiv.style.animationDelay = timePerSheet * sheetCounter-1;
            sheetDiv.classList.add('page-transition-sheet');
            builtSheets.push(sheetDiv);
        });

        return builtSheets;
    }
}
