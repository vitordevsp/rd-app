import { format, formatISO, addDays, subDays } from "date-fns"

export function getCurrentDate() {
  return formatISO(new Date())
}

export function formatDateBr(dateISO: string) {
  return format(new Date(dateISO), "dd/MM/yyyy")
}

export function addDaysToDate(dateISO: string, amount: number = 1) {
  const result = addDays(new Date(dateISO), amount)
  return formatISO(result)
}

export function subDaysFromDate(dateISO: string, amount: number = 1) {
  const result = subDays(new Date(dateISO), amount)
  return formatISO(result)
}
