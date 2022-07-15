const CardContent = (props) => {
  const bookingDetail = (props.bookingDetails || {})
  const fromDate = new Date(bookingDetail?.from_date).toDateString()
  const toDate = new Date(bookingDetail?.to_date).toDateString()
  return(
    <span className="cardContent-span">
      Booked from {fromDate} to {toDate} on {bookingDetail.floor_name}, {bookingDetail.building_name}, {bookingDetail.location_name}, {bookingDetail.city_name}
    </span>
  )
}

export default CardContent;