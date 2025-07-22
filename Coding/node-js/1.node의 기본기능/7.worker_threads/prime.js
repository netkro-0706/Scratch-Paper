const min = 2
const max = 10_000_000
const primes = []

// 에라토스테네스의 체 알고리즘을 사용하여 소수 찾기
function generatePrimes(start, range) {
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j <= Math.sqrt(i); j++) {
      if (i % j === 0 && i !== j) {
        isPrime = false
        break
      }
    }
    if (isPrime) {
      primes.push(i)
    }
    isPrime = true
  }
}

console.time("prime")
generatePrimes(min, max)
console.timeEnd("prime")
console.log(primes.length)
