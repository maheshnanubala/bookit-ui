import axios from "axios"

const ApiHost = "http://localhost:4000/api"


export const ApiUtility = {
  async getMyBookingsRecords() {
    const url =  `${ApiHost}/my_bookings`;
    let userdetails = JSON.parse(localStorage.getItem('user'));
    let token = 'Bearer ' + userdetails?.token;
    try{
      const response = await axios.get(url, { headers: { Authorization: token } })
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  },
  
  async getWorkSpaceDetails() {
    const url =  `${ApiHost}/workspace_details`;
    let userdetails = JSON.parse(localStorage.getItem('user'));
    let token = 'Bearer ' + userdetails?.token;
    try{
      const response = await axios.get(url, { headers: { Authorization: token } })
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  },

  async checkAvailableWorkSpace(floorId, fromDate, toDate, start_time, end_time, buildingId, value, purpose) {
    let end = `/available_workspace?floor_id=${Number(floorId)}&from_date=${fromDate}&to_date=${toDate}&start_time=${start_time}&end_time=${end_time}&building_id=${Number(buildingId)}&user_ids=${[value]}&purpose=${purpose}`
    const endPoint =  `${ApiHost}${end}`;
    let userdetails = JSON.parse(localStorage.getItem('user'));
    let token = 'Bearer ' + userdetails?.token;
    try{
      const response = await axios.get(endPoint, { headers: { Authorization: token } })
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  }
}