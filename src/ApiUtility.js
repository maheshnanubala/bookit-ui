import axios from "axios"

const ApiHost = "http://localhost:4000/api"


const getHeader = () => {
  const userdetails = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + userdetails?.token;
  const headerAuthToken = { headers: { Authorization: token } }
  return headerAuthToken
}

export const ApiUtility = {
  async getMyBookingsRecords() {
    const url = `${ApiHost}/my_bookings`;
    try{
      const response = await axios.get(url, getHeader())
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  },

  async getWorkSpaceDetails() {
    const url = `${ApiHost}/workspace_details`;
    try{
      const response = await axios.get(url, getHeader())
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  },

  async getSpaceAvailability(floorId, fromDate, toDate) {
    const url = `${ApiHost}/available_workspace?floor_id=${floorId}&from_date=${fromDate}&to_date=${toDate}`;
    try{
      const response = await axios.get(url, getHeader())
      return response.data?.available_workspace
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/');
      }
    }
  },

  async bookWorkSpace(bookSpace, navigate, toast) {
    const url = `${ApiHost}/book_workspace`
    try {
      const response = await axios.post(url, bookSpace, getHeader());
      navigate(`/home`);
      toast.success("Successfully Booked");
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.message);
      }
      return err.response.data.message;
    }
  }
}