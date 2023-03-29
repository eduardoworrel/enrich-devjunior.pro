export function getAiRule(text : string, url: string) {
  if(url == ("br.linkedin.com") || url == ("www.linkedin.com")){
    return `
      Retorne 1 caso voce identifique a frase : 
      "This job is no longer available"
      ou 0 caso não identifique.
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