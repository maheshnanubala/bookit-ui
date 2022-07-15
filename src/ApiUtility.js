import axios from "axios"

const ApiHost = "http://localhost:4000/api"

const userdetails = JSON.parse(localStorage.getItem('user'));
const token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdmljaGFuZHJhbi50aGl5YWdhcmFqYW5AaW5kaXVtc29mdC5jb20iLCJleHAiOjE2NTgxMzA2MDksImlkIjoxLCJuYW1lIjoiUmF2aWNoYW5kcmFuIFQifQ.fAGfTXyhwsHYxq9ursqOcbPpXfvTMipu-b3ULuBxkpg'
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