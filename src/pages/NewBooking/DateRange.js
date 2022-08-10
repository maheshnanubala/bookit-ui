import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import {InputGroup} from 'react-bootstrap';
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ])
  const [open, setOpen] = useState(false)
  const refOne = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])
  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }
  return (
    <>             
      <InputGroup >        
        <input
          value={`${format(range[0].startDate, "dd MMM")} to ${format(range[0].endDate, "dd MMM")}` }
          className="inputBox"
          disabled
        /> 
        <i className="bi-calendar-check calander-icon "  onClick={ () => setOpen(open => !open) }></i>
      </InputGroup>
      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>
    </>
  )
}

export default DateRangeComp
