export function applyMask(value: string, maskType: string): string {
  let maskedValue = value.replace(/\D/g, '') // Remove caracteres não numéricos

  switch (maskType) {
    case 'cep':
      // Limita a entrada a 8 dígitos e aplica a máscara de CEP (99999-999)
      maskedValue = maskedValue.slice(0, 8).replace(/(\d{5})(\d{1,3})/, '$1-$2')
      break

    case 'phone':
      // Limita a entrada a 11 dígitos e aplica a máscara de telefone (99 99999-9999)
      maskedValue = maskedValue
        .slice(0, 11)
        .replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')
      break

    default:
      // Retorna o valor original se nenhuma máscara for especificada
      maskedValue = value
      break
  }

  return maskedValue
}
