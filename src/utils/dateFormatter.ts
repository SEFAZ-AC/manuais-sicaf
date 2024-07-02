import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateFormatter(date: Date) {
  return format(date, "EEEE', 'd' de 'MMMM' de 'yyyy", { locale: ptBR })
}
