

export const API_URL = true ? 'https://syncfonia.replit.app/api/syncfonia' : 'http://localhost:5001/api/syncfonia';

export const DESCRIPTIONS_PROMPT = "";

export const BENEFITS_PROMPT = '\nCrear un conjunto de 3 a 5 "bulletpoints" para describir los atributos de este producto. Utiliza el character "•" para denotar un bulletpoint\n';
export const KEYWORDS_PROMPT = '\nCrea una lista de 5 palabras claves correspondientes a este producto. Proveer el resultado como usando "&&&" como bulletpoints . Formato esperado del resultado: [ keyword_1, keyword_2] \n\n'

export function choosePrompt(textType){
    const prompt_options = {
        'Descripción': '',
        'Beneficios': BENEFITS_PROMPT,
        'Palabras Clave' : KEYWORDS_PROMPT
    }

    return prompt_options[textType] || "";
}