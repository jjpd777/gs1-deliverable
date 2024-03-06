import { callBackendCompletion } from "./config/utils";
// code
export const bulletpointsPrompt = '\nCrear un conjunto de 3 a 5 "bulletpoints" para describir los atributos de este producto. Utiliza el character "•" para denotar un bulletpoint\n';
export const keywordsPrompt = '\nCrea una lista de 5 palabras claves correspondientes a este producto. Proveer el resultado como usando "&&&" como bulletpoints . Formato esperado del resultado: [ palabra clave 1 &&& palabra clave 2 &&& palabra clave 3\n\n'

export async function fetchFullDescriptions( currentProduct, inputValue, setCurrentProduct) {
    const api_syncfonia ="\n\n A continuación compartimos la información del producto:"+ JSON.stringify(currentProduct?.syncfonia);

    const prompt_fd = inputValue + api_syncfonia;
    const prompt_bp = inputValue + bulletpointsPrompt + api_syncfonia;
    const prompt_kw = inputValue + keywordsPrompt + api_syncfonia;

    try {
      const [fetchBackend ] = await Promise.all([
        callBackendCompletion(prompt_fd),
       
      ]);

      console.log(fetchBackend)


      setCurrentProduct(curr => ({ ...curr, prod_tags: []}));
      setCurrentProduct(curr => ({ ...curr, bulletpoints:  "Error en generar texto" }));
      setCurrentProduct(curr => ({ ...curr, description: fetchBackend.data?.response ||  "Error en generar texto"  }));

    } catch (error) {
      console.error(error);
    }
  };
