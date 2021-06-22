const convertDate = isoDate => {
  date = new Date(isoDate)
  year = date.getFullYear()
  month = date.getMonth()+1
  dt = date.getDate()

  if (dt < 10)
    dt = '0' + dt

  if (month < 10)
    month = '0' + month


  const convertedDate = `${year}-${month}-${dt}`

  return convertedDate
}

export default convertDate