import _ from 'lodash';

function component() {
	const element = document.createElement('div');
  
	// Lodash, currently included via a script, is required for this line to work
	// inner - это встраивание между <div> и </div>
	// lodash - библиотека для работы с массивами.
	// npx webpack для старта сборки.
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
	return element;
  }
  
  document.body.appendChild(component());