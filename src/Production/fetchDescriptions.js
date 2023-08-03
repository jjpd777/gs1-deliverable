import { callBackendCompletion } from "./config/utils";

export const bulletpointsPrompt = '\nCrear un conjunto de 3 a 5 "bulletpoints" para describir los atributos de este producto. Utiliza el character "•" para denotar un bulletpoint\n';
export const keywordsPrompt = '\nCrea una lista de 5 palabras claves correspondientes a este producto. Proveer el resultado como usando "&&&" como bulletpoints . Formato esperado del resultado: [ palabra clave 1 &&& palabra clave 2 &&& palabra clave 3\n\n'

export async function fetchFullDescriptions( currentProduct, inputValue, setCurrentProduct) {
    const api_syncfonia ="\n\n A continuación compartimos la información del producto:"+ JSON.stringify(currentProduct?.syncfonia);

    const prompt_fd = inputValue + api_syncfonia;
    const prompt_bp = inputValue + bulletpointsPrompt + api_syncfonia;
    const prompt_kw = inputValue + keywordsPrompt + api_syncfonia;

    try {
      const [fetchBackend, fetchBulletPoints, fetchKeyWords] = await Promise.all([
        callBackendCompletion(prompt_fd),
        callBackendCompletion(prompt_bp),
        callBackendCompletion(prompt_kw)
      ]);

      console.log(fetchBackend)


      setCurrentProduct(curr => ({ ...curr, prod_tags: fetchKeyWords.data?.res?.split('&&&') || []}));
      setCurrentProduct(curr => ({ ...curr, bulletpoints: fetchBulletPoints.data.res || "Error en generar texto" }));
      setCurrentProduct(curr => ({ ...curr, description: fetchBackend.data?.res ||  "Error en generar texto"  }));

    } catch (error) {
        console.log(prompt_bp, prompt_fd, prompt_kw)

      console.error(error);
    }
  };