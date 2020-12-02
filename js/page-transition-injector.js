var PTI = {
    init: (options) => {
        var options = options || {
            direction: 'up',
            sheets: [{
                color: '#330000'
            }, {
                color: '#003300'
            }]
        }
        
        //Init transition container
        var transitionContainer = document.createElement('div');
        transitionContainer.id = 'page-transition-container';
        document.body.appendChild(transitionContainer);

        //Generate transition sheets
        var builtSheets = [];
        var sheetCounter = 0;
        var timePerSheet = 1000 / options.sheets.length;
        options.sheets.forEach(sheet => {
            sheetCounter++;
            let sheetDiv = document.createElement('div');
            sheetDiv.style.backgroundColor = sheet.color;
            sheetDiv.style.width = '100vw';
            sheetDiv.style.height = '100vh';
            
            switch (options.direction) {
                case 'up':
                    sheetDiv.style.animationName = "scroll-up";
                    break;
                
                case 'down':
                    
            
                default:
                    sheetDiv.style.animationName = "scroll-up";
                    break;
            }

            sheetDiv.style.animationDuration = timePerSheet * sheetCounter + 'ms';
            sheetDiv.classList.add('page-transition-sheet');
            builtSheets.push(sheetDiv);
        });

        //Add event listeners
        document.querySelectorAll('.page-transition').forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault();
                let location = element.getAttribute('href');

                builtSheets.forEach(sheet => {
                    document.getElementById('page-transition-container').appendChild(sheet);
                });
        
                setTimeout(() => {
                    window.location.href = location;
                }, 1000);
            });
        });
    }
}
