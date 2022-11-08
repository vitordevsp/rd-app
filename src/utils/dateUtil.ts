import { format, formatISO, addDays, subDays, isBefore, isAfter, isEqual } from "date-fns"

export function getCurrentDate() {
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return formatISO(new Date(year, month, day, 0, 0, 0))
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

export function dateIsBefore(currentDate: string, dateToCompare: string) {
  const _isBefore = isBefore(new Date(currentDate), new Date(dateToCompare))
  return _isBefore
}

export function dateIsAfter(currentDate: string, dateToCompare: string) {
  const _isAfter = isAfter(new Date(currentDate), new Date(dateToCompare))
  return _isAfter
}

export function dateIsEqual(currentDate: string, dateToCompare: string) {
  const _isEqual = isEqual(new Date(currentDate), new Date(dateToCompare))
  return _isEqual
}
