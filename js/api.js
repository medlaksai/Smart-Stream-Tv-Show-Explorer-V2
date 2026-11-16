const dataApi = "https://6af21e1742c6561ced390722.mockapi.io/api/v1/channels"

const response = await fetch(dataApi);
const channels = await response.json();

for (const channel of channels){
  await fetch (`${dataApi}/${channel.id}` ,{
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({ isFavorite: false , isBlackListed: false}),
  });
}
console.log("Termine !");

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

