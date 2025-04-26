document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultContainer = document.querySelector('.result-container');
    const backendUrl = '/.netlify/functions/funcion-diccionario/translate';

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        resultContainer.innerHTML = ''; // Limpiamos los resultados anteriores

        if (searchTerm) {
            fetch(`${backendUrl}?word=${searchTerm}`)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.error || 'Error al obtener la traducción');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.length > 0) {
                        data.forEach(result => {
                            const resultDiv = document.createElement('div');
                            let translationText = `${result.spanish}: ${result.wayuunaiki}`;
                            if (result.genero) {
                                translationText += ` (${result.genero})`;
                            }
                            resultDiv.textContent = translationText;

                            if (result.definicion) {
                                const definitionParagraph = document.createElement('p');
                                definitionParagraph.classList.add('definition');
                                definitionParagraph.textContent = `Definición: ${result.definicion}`;
                                resultDiv.appendChild(definitionParagraph);
                            }

                            resultContainer.appendChild(resultDiv);
                        });
                    } else {
                        const noResults = document.createElement('p');
                        noResults.textContent = "No se encontraron traducciones que coincidan con tu búsqueda.";
                        resultContainer.appendChild(noResults);
                    }
                })
                .catch(error => {
                    const errorParagraph = document.createElement('p');
                    errorParagraph.textContent = `Error: ${error.message}`;
                    resultContainer.appendChild(errorParagraph);
                });
        } else {
            const noInput = document.createElement('p');
            noInput.textContent = "Por favor, ingresa una palabra.";
            resultContainer.appendChild(noInput);
        }
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});