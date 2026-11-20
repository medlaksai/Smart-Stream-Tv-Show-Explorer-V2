import { deleteChannel, getData , updateChannel} from "./api.js";
const channelsContainer = document.querySelector("#channels-container")
const totalChannels = document.querySelector(".channels-total")
const filterChannel = document.getElementById("filterInput")
const categoryContainer = document.getElementById("category-container")
const msg = document.getElementById("messages")

export let channelsData = []
let selectCategory = "Tout"

export  function categoryFilter(){
    if (selectCategory === "Tout"){  return channelsData.filter(channel => channel.isBlackListed === false) };
    if (selectCategory === "BlackList") {
        return channelsData.filter(channel => channel.isBlackListed === true)

    }
     if (selectCategory === "Favorite"){ 
     return channelsData.filter(channel => channel.isFavorite === true) }
     return channelsData.filter(channels => channels.category === selectCategory);
}

categoryContainer.addEventListener("click" , (event) => {
   const btnCat =  event.target.closest("button")
   if(!btnCat) return
   selectCategory = btnCat.dataset.category;
   renderChannels(categoryFilter());
})


export function renderChannels(channels){
    channelsContainer.innerHTML = "";
    channelsContainer.innerHTML = channels.map((channel) =>
    `
        <div type="button" id="${channel.id}" data-id="${channel.id}" class="flex flex-rows shrink-0 gap-4 hover:bg-gray-700 w-full h-10 cursor-pointer hover:border hover:border-gray-700 rounded-lg p-2 ">
        ${channel.channelNumber}  <img src="${channel.logo}" alt="${channel.name}" class="channel-logo w-10 rounded">
        <p class="channel-name w-40">
        ${channel.name}
        </p>
        <button class="cursor-pointer w-5 "  data-action="favorite">${channel.isFavorite === true ? "★" : "☆"}</button>
        <button class="cursor-pointer" data-action="blackList">${channel.isBlackListed === true ? "🏴" : "🏳"}</button>
        <button class="cursor-pointer "  data-action="delete">🗑</button>
        </div> `
        )
        .join("")

       totalChannels.textContent = channels.length 
}

let currentFilter = "";
export function searchChannels(){
    const filtredChannel = channelsData.filter(channels =>
    channels.name.toLowerCase().includes(currentFilter) ||
    String(channels.channelNumber).includes(currentFilter));
     return renderChannels(filtredChannel);
 }

filterChannel.addEventListener("input" , e => {
 currentFilter = e.target.value.toLowerCase();
    searchChannels();
})



channelsContainer.addEventListener("click" , async (event) => {
    const button = event.target.closest("button");
    const btn = event.target.closest("div")
    if(!btn) return;
    const channelId = btn.id
    const selectedChannel = channelsData.find(  
        channel => channel.id === channelId    
    )
    if(!selectedChannel) return
    let action = null
    if (button) {
        action = button.dataset.action
    }
    
    if (action === "favorite") {
        const newValue = !selectedChannel.isFavorite

        try {
            await updateChannel(selectedChannel.id , { isFavorite: newValue})
            selectedChannel.isFavorite = newValue
            renderChannels(categoryFilter())
            msg.textContent = "favori a ete ajoute"
        }catch (error){
            console.log("le favori n'est pas enregistré." , error)
            msg.textContent = "le favori n'est pas enregistré."
            
        } return
    }
    if (action === "blackList"){
        const newValue = !selectedChannel.isBlackListed
        try {
            await updateChannel(selectedChannel.id , {isBlackListed: newValue})
            selectedChannel.isBlackListed = newValue
            renderChannels(categoryFilter())
            msg.textContent = "Channel est Balck Listed"
        } catch (error){
            msg.textContent = "Error de blacklist"
        }
    }
    if(action === "delete"){
        try {
            await deleteChannel(selectedChannel.id)
            channelsData = channelsData.filter(c => c.id !== selectedChannel.id)
            renderChannels(categoryFilter())
            msg.textContent = "channel a ete supprimer"
        }catch (error) {
            console.log("pas de suppression fait" , error)
            msg.textContent = "Error de supprimer cette channel"
        } return
    }
    const title = document.getElementById("channel-title")
    const videoSrc = document.querySelector(".live-image") 
    const nowPlaying = document.getElementById("playing-now")
    const titleNow = document.getElementById("playing-title")
    const periodHours = document.getElementById("playing-hours")
    

    nowPlaying.textContent = "Now Playing"
    titleNow.textContent = "Live News"
    periodHours.textContent = "12:30 PM - 13:00 PM"
    title.textContent = selectedChannel.name  
    videoSrc.src = selectedChannel.previewImage 
    title.style.color = "rgb(132, 0, 247)"
    
    channelsContainer.querySelectorAll("div").forEach(div => {
        div.classList.remove("bg-blue-800");
    });
    btn.classList.add("bg-blue-800")
})
   
export function setChannels(channels){
    channelsData = channels
    renderChannels(channels)
}


