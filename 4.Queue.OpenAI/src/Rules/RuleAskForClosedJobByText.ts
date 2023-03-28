export function getAiRule(text : string, url: string) {
  if(url.startsWith("https://www.linkedin.com")){
    return `
      Retorne "1" caso voce identifique a frase : 
      "Não aceita mais candidaturas" em qualquer lingua
      ou "0" caso não identifique.
      "${text}"
    `
  }
  return `
    Dado o seguinte trecho de um site de vaga de emprego
    responda com 1 caso exista evidencia de vaga encerrada 
    ou não aceitando candidatura ou inscrição
    e 0 para caso esteja sem eviencia:
    "${text}"
  `
}