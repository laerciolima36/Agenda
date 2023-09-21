import { fetchGet } from "./api.js";

export function getsuporte(){
    let url = "/suporte";
    fetchGet(url, chamaWhatsapp);
}

function chamaWhatsapp(whatsapp){
    window.location.href = "https://api.whatsapp.com/send?phone="+whatsapp;
}