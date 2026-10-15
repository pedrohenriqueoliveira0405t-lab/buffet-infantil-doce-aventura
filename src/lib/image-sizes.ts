/**
 * Largura da foto no celular, para o atributo `sizes` do next/image, limitando a densidade a ~2x:
 * telas 3x recebem a versão 2x da foto (diferença invisível no celular, cerca de metade do peso,
 * então a foto aparece mais rápido no 4G). Use só no trecho de `sizes` que vale para o celular.
 *
 * Ex.: `(min-width: 768px) 50vw, ${phoneWidth("85vw")}`
 */
export const phoneWidth = (width: string) => `calc(${width} * 0.67)`;
