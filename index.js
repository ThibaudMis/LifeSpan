if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("serviceWorker ready");
    }).catch(error =>{console.log("error serviceWorker");});
}
<script src="./index.js"></script>