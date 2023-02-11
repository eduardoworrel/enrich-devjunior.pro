export function getAiRule(text: string) {
  const query = `Dado o seguinte conteúdo coletado do html de uma vaga de um site de vaga de emprego: 
    "${text}"\n\n
    se qualquer trecho dos dados for um indicativo de que a vaga
    não está mais disponível responda com "1", caso contrário com "0"`;

  console.log("call to chat gpt with '" + query + "'");
  return query;
}
