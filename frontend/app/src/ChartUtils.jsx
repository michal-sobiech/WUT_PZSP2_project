export function getSum(records, selectedValue) {
  let groupBy = 'measureDate';

  let transformedData = {}
  for (let record of records) {
    let group = record[groupBy];
    if (!(group in transformedData)) {
      transformedData[group] = record[selectedValue];
    } else {
      transformedData[group] += record[selectedValue];
    }
  }
  return transformedData;
}

export function getAverage(records, selectedValue) {
  let groupBy = 'measureDate';

  let transformedData = {}    // { group_from_groupBy : sum_of_selectedValue }
  let recordsInGroup = {}     // { group_from_groupBy : number_of_records_with_selectedValue }
  for (let record of records) {
    let group = record[groupBy];
    if (!(group in transformedData)) {
      transformedData[group] = record[selectedValue];
      recordsInGroup[group] = 1;
    } else {
      transformedData[group] += record[selectedValue];
      recordsInGroup[group] += 1;
    }
  }
  for (let group of Object.keys(transformedData)) {
    transformedData[group] /= recordsInGroup[group];
  }
  return transformedData;
}

export function getDifference(recordsOne, recordsTwo) {
  let joinedRecords = {};
  console.log(recordsOne);
  for (let group in recordsOne){
    joinedRecords[group] = recordsOne[group];
  }
  for (let group in recordsTwo){
    if (!(group in joinedRecords)) {
      joinedRecords[group] = recordsTwo[group];
    } else {
      joinedRecords[group] -= recordsTwo[group];
    }
  }
  return joinedRecords;
}

export function getSumThenDiff(records, selectedValueOne, selectedValueTwo, groupBy) {
  return getDifference(
    getSum(records, selectedValueOne, groupBy),
    getSum(records, selectedValueTwo, groupBy)
  )
}

export function fixRecordTimes(records) {
  for (let record of records) {
    let date = new Date(Date.parse(record.measureDate));
    console.log(date);
    record.measureDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    console.log(record.measureDate);
  }
  return records;
}