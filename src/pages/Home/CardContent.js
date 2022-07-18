const CardContent = (props) => {
  const bookingDetail = (props.bookingDetails || {})
  const fromDate = new Date(bookingDetail?.from_date).toDateString()
  const toDate = new Date(bookingDetail?.to_date).toDateString()
  return(
    <span className="cardContent-span">
      {fromDate} to {toDate} <br></br> {bookingDetail.floor_name}, {bookingDetail.building_name},<br></br> {bookingDetail.city_name}
    </span>
  )
}

export default CardContent;