import { defaultConfiguration } from "../configurations/fieldConfiguration.json";
import { parse, compareDesc, compareAsc } from "date-fns";

export const processFileAsChunks = (
  fileContent,
  filterConfiguration = defaultConfiguration
) => {
  let splitRegex = /\n/;
  let chunks = fileContent.split(splitRegex);
  let filterDataSet = {};
  let formattedChunks = [];
  chunks.forEach((chunk) => {
    try {
      let parsedChunk = JSON.parse(chunk);
      filterDataSet = buildFiltersForChunk(
        parsedChunk,
        filterConfiguration,
        filterDataSet
      );
      formattedChunks.push(parsedChunk);
    } catch (ex) {
      return chunk;
    }
  });
  console.log(filterDataSet);
  return {
    chunkedData: formattedChunks.slice(0, formattedChunks.length - 1),
    filterDataSet,
  };
};

const buildFiltersForChunk = (
  chunk,
  filterConfiguration,
  filterDataSet = {}
) => {
  try {
    filterConfiguration.forEach(
      ({ key, alias, filterType, allowFiltering }) => {
        if (!chunk.hasOwnProperty(key) && chunk.hasOwnProperty(alias))
          key = alias;
        if (allowFiltering) {
          switch (filterType) {
            case FilterTypes.SET: {
              if (!filterDataSet[key]) {
                filterDataSet[key] = new Set();
              }
              filterDataSet[key].add(chunk[key]);
              break;
            }
            case FilterTypes.DATE: {
              let formatString = "yyyy-MM-dd HH:mm:ss,SSS"; //"2020-08-30 00:03:30,321";
              let parsedDate = parse(chunk[key], formatString, new Date());
              if (!filterDataSet[key]) {
                filterDataSet[key] = {};
                filterDataSet[key].min = parsedDate;
                filterDataSet[key].max = parsedDate;
              }
              if (compareAsc(filterDataSet[key].min, parsedDate) === 1) {
                filterDataSet[key].min = parsedDate;
              }
              if (compareDesc(filterDataSet[key].max, parsedDate) === 1) {
                filterDataSet[key].max = parsedDate;
              }
              break;
            }
          }
        }
      }
    );
  } catch (ex) {
    console.log(ex);
  }
  return filterDataSet;
};

const FilterTypes = {
  STRING: "string",
  DATE: "date",
  SET: "set",
};
