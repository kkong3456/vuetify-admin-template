

//const bonbuNetIncreaseUrl='http://localhost:8000/api/bonbu-net-increase-list/';
async axiosFunction(url){
  await axios.get(url)
    .then((res)=>{
      console.log(res.data)
      return res.data
    }).catch((err)=>{
      console.log('xxx');
    })
}

