import { getData  } from "./api.js";
import { renderChannels , setChannels } from "./ui.js";



let channels = [];


const loadChannels = async () => {
    const message = document.querySelector("#error-msg")
    message.textContent = "Chargement...."
    try {
        channels =  await getData();
        setChannels(channels);
       message.textContent = ""
    } catch (error) {
       // console.error('Erreur lors de la récupération des données :' , error);
        message.textContent = "Impossible de charger les chaines"
    } 
}
 loadChannels();

 




