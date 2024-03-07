import { formatDistanceToNow } from "date-fns"

export const getCurrentDate = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()
  const currentSecond = currentDate.getSeconds()
  const TodayDT = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`

  return TodayDT
}

export const timeAgo = (timestamp: number) => {
  const createdAtMillis = timestamp * 1000
  const timeAgo = formatDistanceToNow(new Date(createdAtMillis), {
    addSuffix: true,
  })

  return timeAgo
}
