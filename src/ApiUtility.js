import axios from "axios"

const ApiHost = "http://localhost:4000/api"

const userdetails = JSON.parse(localStorage.getItem('user'));
const token = 'Bearer ' + userdetails?.token;
const headerAuthToken = { headers: { Authorization: token } }

export const ApiUtility = {
  async getMyBookingsRecords() {
    const url =  `${ApiHost}/my_bookings`;
    try{
      const response = await axios.get(url, headerAuthToken)
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  }
}