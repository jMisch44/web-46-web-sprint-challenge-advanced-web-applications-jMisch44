import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
  return axiosWithAuth()
    .get(`http://localhost:5000/api/colors`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchColorService;