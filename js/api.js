
const dataApi = "https://6af21e1742c6561ced390722.mockapi.io/api/v1/channels"


// getting data from the api 
export const getData = async () => {
 const response = await fetch(dataApi);
 if(!response.ok) throw new Error(`Erreur ${response.status}`);
 else if(response.status === 500){
  
 }
  return response.json();
}

// adding new channel 
export const createChannel = async (channel) => {
  const response = await fetch(dataApi , {
    method: "POST" , 
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(channel)
  })
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
}


// editing a channel 
export const updateChannel = async (id , changes) => {
  const response = await fetch(`${dataApi}/${id}`,{
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
}

// delete a channel 
export const deleteChannel = async (id) => {
  const response = await fetch(`${dataApi}/${id}` , {method: "DELETE"});
  if(!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
}





















/*
export async function getData(){
   try {
   const res = await fetch(dataApi)
   if(!res.ok){
    throw new Error(`HTTP Error! : ${res.status}` )

   }
   const data = await res.json()
   return data
   }
   catch(error) {
    console.error("Filled to fetch channels : " ,error)
    throw error;
   }
}

*/