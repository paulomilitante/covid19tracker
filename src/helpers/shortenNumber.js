const shortenNumber = value => {
  let newValue = value
  
  if (value >= 1000) {
      const suffixes = ['', 'K', 'M', 'B']
      const suffixNum = Math.floor((''+value).length/3.5)

      let shortValue = ''

      for (precision = 3; precision >= 1; precision--) {
          shortValue = parseFloat((suffixNum != 0 ? (value/Math.pow(1000,suffixNum)) : value).toPrecision(precision))
          const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'')
          if (dotLessShortValue.length <= 3) { break }
      }

      if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1)

      newValue = shortValue + suffixes[suffixNum]
  }
  return newValue
}

export default shortenNumber