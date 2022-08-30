const generateAllCurrencyPairs = (arr) => {
  let start = 0;
  let end = 1;
  let dist = 1;
  let currencyPairsAsStrings = [];
  while (dist <= arr.length - 1 && end <= arr.length - 1) {
    currencyPairsAsStrings.push(arr[start] + '-' + arr[end]);
    currencyPairsAsStrings.push(arr[end] + '-' + arr[start]);
    start++;
    end++;
    if (end === arr.length) {
      start = 0;
      dist++;
      end = dist;
    }
  }
  currencyPairsAsStrings.sort();
  return currencyPairsAsStrings;
};

const calculateCurrencyRatePerPair = (currencyPairAsString, map) => {
  let rate = 0;
  let pair = currencyPairAsString.split('-');
  if (map.has(pair[0]) && map.has(pair[1])) {
    rate = map.get(pair[0]) / map.get(pair[1]);
  }
  return rate.toFixed(4);
};

const generateAllResultRates = (allCurrencyPairs, initialMap) => {
  let resultMap = new Map();
  for (let i = 0; i < allCurrencyPairs.length; i++) {
    let currentRate = calculateCurrencyRatePerPair(
      allCurrencyPairs[i],
      initialMap,
    );
    resultMap.set(allCurrencyPairs[i], currentRate);
  }
  return resultMap;
};

const generateNewUrlTargetArray = (
  currentTarget,
  currentBase,
  selectedBase,
) => {
  let set = new Set(currentTarget);
  set.add(currentBase);
  set.delete(selectedBase);
  const result = Array.from(set);
  return result;
};

const generateCurrencyMapFromLS = (keys, values) => {
  const currenciesMap = new Map();
  for (let index = 0; index < keys.length; index++) {
    currenciesMap.set(keys[index], values[index]);
  }

  return currenciesMap;
};

const ratePairGenerator = (keys, values) => {
  const currenciesMap = generateCurrencyMapFromLS(keys, values);
  const allKeyPairs = generateAllCurrencyPairs(keys);

  const resultMap = generateAllResultRates(allKeyPairs, currenciesMap);
  const resultArray = Array.from(resultMap, ([key, value]) => {
    return [key, parseFloat(value)];
  });
  return resultArray;
};

const filterAllPairsByCurrency = (arr, currency) => {
  return arr.filter((pair) => pair[0].includes(currency));
};

const calculateMaxArrayLengthWithDiff = (arr, diff) => {
  let counter = 0;
  let maxCounter = 0;
  for (let i = 0, j = 1; i < arr.length; j++) {
    let tempDiff = Math.abs(arr[i][1] - arr[j][1]).toFixed(4);
    if (tempDiff <= diff && tempDiff > 0) {
      counter++;
    }
    if (j === arr.length - 1 || tempDiff > diff) {
      j = i + 1;
      if (i + 1 === arr.length - 1) {
        break;
      }
      i++;
      maxCounter = Math.max(maxCounter, counter);
      counter = 0;
    }
  }
  return maxCounter;
};

export {
  calculateMaxArrayLengthWithDiff,
  generateNewUrlTargetArray,
  filterAllPairsByCurrency,
  ratePairGenerator,
};
