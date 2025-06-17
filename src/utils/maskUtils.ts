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

    case 'cpf':
      // Limita a entrada a 11 dígitos e aplica a máscara de CPF (999.999.999-99)
      maskedValue = maskedValue
        .slice(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (match, p1, p2, p3, p4) => {
          let out = p1
          if (p2) out += '.' + p2
          if (p3) out += '.' + p3
          if (p4) out += '-' + p4
          return out
        })
      break

    case 'cnpj':
      // Limita a entrada a 14 dígitos e aplica a máscara de CNPJ (99.999.999/0001-99)
      maskedValue = maskedValue
        .slice(0, 14)
        .replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
          (match, p1, p2, p3, p4, p5) => {
            let out = p1
            if (p2) out += '.' + p2
            if (p3) out += '.' + p3
            if (p4) out += '/' + p4
            if (p5) out += '-' + p5
            return out
          },
        )
      break

    default:
      // Retorna o valor original se nenhuma máscara for especificada
      maskedValue = value
      break
  }

  return maskedValue
}
