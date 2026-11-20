import { getData  } from "./api.js";
import { setChannels } from "./ui.js";



// let channels = [];


const loadChannels = async () => {
    const message = document.querySelector("#error-msg")
    message.textContent = "Chargement...."
    try {
       const channels =  await getData();
        setChannels(channels);
       message.textContent = ""
    } catch (error) {
       // console.error('Erreur lors de la récupération des données :' , error);
        message.textContent = "Impossible de charger les chaines"
    } 
}
 loadChannels();




