const arr = [9, 4, 2, 7, 13, 11, 13, 11, 13]

// 1. Bubble Sort
// 앞과 뒤를 비교한다.
// 0과 1을 비교, 차이가 있으면 바꾼다.
// 차이가 없으면 다음 1과 2를 비교한다.
// 전부 돌았으면 처음으로 돌아간다.
// 이것을 반복

// let changeFlag = false

// do {
//   changeFlag = false
//   for (i = 0; i < arr.length - 1; i++) {
//     if (arr[i] > arr[i + 1]) {
//       ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
//       changeFlag = true
//     }
//   }
// } while (changeFlag)

// console.log("result", arr)

// 2. Selection Sort
// 배열에서 가장 작은 값을 찾아서 제일 앞으로 보내는 정렬

// arr.forEach((_, idx) => {
//   let minVal = arr[idx]
//   let minIdx = idx
//   for (search = idx + 1; search < arr.length; search++) {
//     if (arr[search] < minVal) {
//       minVal = arr[search]
//       minIdx = search
//     }
//   }

//   if (minIdx != idx) {
//     temp = arr[minIdx]
//     arr[minIdx] = arr[idx]
//     arr[idx] = temp
//   }
// })

// console.log(arr)

// 3. Insert Sort
// 2번째 요소부터 선택하여 비교를 시작, 처음요소 부터 비교하며 선택된 요소가 작을 경우 비교한 요소의 앞에 삽입

// for (selected = 1; selected < arr.length; selected++) {
//   let current = arr[selected]
//   let compIdx = selected - 1

//   while (compIdx >= 0 && arr[compIdx] > current) {
//     arr[compIdx + 1] = arr[compIdx]
//     compIdx--
//   }

//   arr[compIdx + 1] = current
// }

// console.log(arr)

// 4.병합정렬

// function divArr(arr) {
//   if (arr.length <= 1) {
//     return arr
//   }

//   let sliceNum = Math.floor(arr.length / 2)
//   let arr1 = arr.slice(0, sliceNum)
//   let arr2 = arr.slice(sliceNum)

//   return mergeArr(divArr(arr1), divArr(arr2))
// }
// function mergeArr(arr1, arr2) {
//   let resultArr = []
//   let arr1Idx = 0
//   let arr2Idx = 0

//   while (arr1Idx < arr1.length && arr2Idx < arr2.length) {
//     if (arr1[arr1Idx] < arr2[arr2Idx]) {
//       resultArr.push(arr1[arr1Idx])
//       arr1Idx++
//     } else {
//       resultArr.push(arr2[arr2Idx])
//       arr2Idx++
//     }
//   }

//   return resultArr.concat(arr1.slice(arr1Idx)).concat(arr2.slice(arr2Idx))
// }

// const result = divArr(arr)
// console.log("result", result)

// 5.퀵 정렬
// 피벗으로 선택된 수를 기준으로 높은값, 낮은값을 걸러 좌우배열에 배치한다.
// 그리고 그 값을 다시 조합하여 결과 배열을 생성한다.

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[0]
  const arr1 = []
  const arr2 = []

  for (i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      arr1.push(arr[i])
    } else {
      arr2.push(arr[i])
    }
  }

  return [...quickSort(arr1), pivot, ...quickSort(arr2)]
}

const resultArr = quickSort(arr)
console.log("result", resultArr)
