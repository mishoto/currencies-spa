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

const ratePairGenerator = (keys, values)=>{
  const currenciesMap = generateCurrencyMapFromLS(keys, values);
  const allKeyPairs = generateAllCurrencyPairs(keys);

  const resultMap = generateAllResultRates(allKeyPairs, currenciesMap);
  const resultArray = Array.from(resultMap, ([key, value]) => {
    return [key, parseFloat(value)];
  });
  return resultArray;
}

const filterAllPairsByCurrency = (arr, currency) => {
  return arr.filter((pair) => pair[0].includes(currency));
};

const filterSelectedWithDifference = (arr, difference)=>{
  return arr.filter((pair)=>(Math.abs(pair[1] - difference).toFixed(4)) < difference);
}

const filterRemainingPairs = (arr, difference)=>{
  return arr.filter((value)=>value[1] < difference);
}


export {
  filterSelectedWithDifference,
  generateNewUrlTargetArray,
  filterAllPairsByCurrency,
  ratePairGenerator,
  filterRemainingPairs
};
