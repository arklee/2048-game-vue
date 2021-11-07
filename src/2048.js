export function cre_num() {
  const ran = Math.random();
  if (ran < 0.9) return 1;
  else return 2;
}

export function initArray(size) {
  const array = Array.from(Array(size), () => Array.from(Array(size), () => 0))
  // const array = Array(size).fill(Array(size).fill(0))
  generate(array, size)
  generate(array, size)
  return array
}

function generate(array, size) {
  let i, j
  do {
    i = Math.floor(Math.random() * size);
    j = Math.floor(Math.random() * size);
  } while (array[i][j] !== 0)
  array[i][j] = cre_num();
}

export function mov(array, score, f, size) {
  let oldArrayString = JSON.stringify(array)
  let newArray = JSON.parse(oldArrayString)
  score = f(newArray, score, size)
  let changed
  if (JSON.stringify(newArray) === oldArrayString) {
    changed = false
  }
  else {
    changed = true
    generate(newArray, size);
  }
  return [newArray, score, changed]
}

export function down(array, score, size) {
  for (let m = 0; m < size; m++)
    for (let j = size - 1; j >= 1; j--)
      for (let i = j - 1; i >= 0; i--) {
        if (array[i][m] === 0 || array[j][m] === 0) {
          array[j][m] = array[i][m] + array[j][m]
          array[i][m] = 0
        }
        else if (array[i][m] === array[j][m]) {
          array[j][m] = array[i][m] + 1
          array[i][m] = 0
          score = score + 2 ** array[j][m]
          break
        }
        else break
      }
  return score
}

export function up(array, score, size) {
  for (let m = 0; m < size; m++)
    for (let i = 0; i < size - 1; i++)
      for (let j = i + 1; j < size; j++) {
        if (array[i][m] === 0 || array[j][m] === 0) {
          array[i][m] = array[i][m] + array[j][m]
          array[j][m] = 0
        }
        else if (array[i][m] === array[j][m]) {
          array[i][m] = array[i][m] + 1
          array[j][m] = 0
          score = score + 2 ** array[i][m]
          break
        }
        else break
      }
  return score
}

export function left(array, score, size) {
  for (let m = 0; m < size; m++)
    for (let i = 0; i < size; i++)
      for (let j = i + 1; j < size; j++) {
        if (array[m][i] === 0 || array[m][j] === 0) {
          array[m][i] = array[m][i] + array[m][j]
          array[m][j] = 0
        }
        else if (array[m][i] === array[m][j]) {
          array[m][i] = array[m][i] + 1
          array[m][j] = 0
          score = score + 2 ** array[m][i]
          break
        }
        else break
      }
  return score
}

export function right(array, score, size) {
  for (let m = 0; m < size; m++)
    for (let j = size - 1; j >= 0; j--)
      for (let i = j - 1; i >= 0; i--) {
        if (array[m][i] === 0 || array[m][j] === 0) {
          array[m][j] = array[m][i] + array[m][j]
          array[m][i] = 0
        }
        else if (array[m][i] === array[m][j]) {
          array[m][j] = array[m][i] + 1
          array[m][i] = 0
          score = score + 2 ** array[m][j]
          break
        }
        else break
      }
  return score
}

export function checkFail(array, size) {
  for (let m = 0; m < size; m++) {
    for (let n = 0; n < size; n++) {
      if (array[m][n] === 0) {
        return false
      }
    }
  }
  for (let m = 0; m < size; m++) {
    for (let n = 0; n < size - 1; n++) {
      if (array[m][n] === array[m][n + 1]) {
        return false
      }
    }
  }
  for (let m = 0; m < size - 1; m++) {
    for (let n = 0; n < size; n++) {
      if (array[m][n] === array[m + 1][n]) {
        return false
      }
    }
  }
  return true
}
