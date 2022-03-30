import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useState } from 'react';
import { appContext, ACTIONS } from '../../providers/appContextProvider';
import { compareDesc } from 'date-fns';


const DateTimeFilter = props => {

    let {values, type, filterKey} = props;

    let { min, max } = values || {};

    const { dispatch } = useContext(appContext)

    const [lowerBoundDate, setLowerBoundDate] = useState(min);
    const [upperBoundDate, setupperBoundDate] = useState(max);
    const [filterStart, setFilterStart] = useState(null);
    const [filterEnd, setFilterEnd] = useState(null);

    useEffect(() => {
        setLowerBoundDate(min);
        setupperBoundDate(max);
        setFilterStart(min);
        setFilterEnd(max);
    }, [min, max])

    const updateFilterStart = (start) => {
        if (compareDesc(start, filterEnd)) {
            setFilterStart(start);
            dispatch({
                type: ACTIONS.FILTER_ADDED,
                payload: {
                    id: filterKey,
                    value: [start, filterEnd],
                    field: filterKey,
                    type
                }
            });
        }
    };

    const updateFilterEnd = (end) => {
        if (compareDesc(filterStart, end)) {
            setFilterEnd(end);
            dispatch({
                type: ACTIONS.FILTER_ADDED,
                payload: {
                    id: filterKey,
                    value: [filterStart, end],
                    field: filterKey,
                    type
                }
            });
        }
    };

    return (
        <div>
            <DateTimePicker
                label="Min Date"
                value={filterStart}
                onChange={updateFilterStart}
                defaultValue={lowerBoundDate}
                minDateTime={lowerBoundDate}
                maxDateTime={upperBoundDate}
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                label="Max Date"
                value={filterEnd}
                onChange={updateFilterEnd}
                defaultValue={upperBoundDate}
                minDateTime={lowerBoundDate}
                maxDateTime={upperBoundDate}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
}

export default DateTimeFilter;
