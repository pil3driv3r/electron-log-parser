import { defaultConfiguration } from "../configurations/fieldConfiguration.json";
import { parse, compareDesc, compareAsc, isWithinInterval, format } from "date-fns";

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
      let result = buildFiltersForChunk(
        parsedChunk,
        filterConfiguration,
        filterDataSet,
        formattedChunks,
      );
      filterDataSet = result.filterDataSet;
      formattedChunks = result.formattedChunks;
    } catch (ex) {
      return chunk;
    }
  });
  return {
    chunkedData: formattedChunks.slice(0, formattedChunks.length - 1),
    filterDataSet,
  };
};

const buildFiltersForChunk = (
  chunk,
  filterConfiguration,
  filterDataSet = {},
  formattedChunks = []
) => {
  try {
    let clonedChunk = {...chunk};
    filterConfiguration.forEach(
      ({ key, alias, filterType, allowFiltering, format }) => {
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
              let parsedDate = parse(chunk[key], format, new Date());
              clonedChunk[key] = parsedDate;
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
        formattedChunks.push(clonedChunk);
      }
    );
  } catch (ex) {
    console.log(ex);
  }
  return {filterDataSet, formattedChunks};
};

export const applyFiltersToDataSet = (
  chunkedData,
  filters,
  filterConfiguration = defaultConfiguration
) => {
  return chunkedData.filter(chunk => {
    return filters.every(filter => 
      applyFilterToChunk(
        chunk, 
        filter, 
        filterConfiguration.find(config => config.key === filter.field)));
  });
}

const applyFilterToChunk = (
  chunk,
  filter,
  config
) => {

  const { value, field, type } = filter;
  switch (type) {
    case FilterTypes.DATE: {
      const [start, end] = value;
      return (isWithinInterval(chunk[field], {start, end}));
    }
    case FilterTypes.SET: {
      return value && value.length ? value.includes(chunk[field]) : true;
    }
    case FilterTypes.STRING: {
      return chunk[field].search(value) >= 0;
    }
    default:
      return false;
  }
}

const FilterTypes = {
  STRING: "string",
  DATE: "date",
  SET: "set",
};
