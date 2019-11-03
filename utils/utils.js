export const getDuration = function (depTime, arrTime) {
  const depTimeArr = depTime.split(':')
  const depHour = depTimeArr[0] - 0
  const depMinute = depTimeArr[1] - 0
  const arrTimeArr = arrTime.split(':')
  const arrHour = arrTimeArr[0] - 0
  const arrMinute = arrTimeArr[1] - 0
  let duraHour = arrHour - depHour
  let duraMinute = arrMinute - depMinute
  if (duraHour < 0) {
    duraHour += 24
  }
  if (duraMinute < 0) {
    duraMinute += 60
    duraHour--
  }
  return duraHour + '时' + duraMinute + '分'
}
