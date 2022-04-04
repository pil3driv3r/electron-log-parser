import React, {useState, useEffect, useContext} from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {appContext, ACTIONS } from "../../providers/appContextProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(
  value,
  selectedValues,
  theme
) {
  return {
    fontWeight:
      selectedValues.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default (props) => {
  const theme = useTheme();
  const {dispatch} = useContext(appContext);
  let {filterValues, type, filterKey} = props;
  const [selectedValues, setSelectedValues] = useState([]);
  const [listValues, setListValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    console.log(event);
    setSelectedValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    dispatch({
        type: ACTIONS.FILTER_ADDED,
        payload: {
            id: filterKey,
            value,
            field: filterKey,
            type
        }
    });
  };

  useEffect(() => {
    setListValues(Array.from(filterValues || []));    
}, [filterValues])


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{filterKey}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {listValues.map(value => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, selectedValues, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
