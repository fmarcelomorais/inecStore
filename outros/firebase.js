(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyC1SJzAsG6r22N0VtHzH2PJniwXmsH6EvY",
        authDomain: "inecstorage.firebaseapp.com",
        projectId: "inecstorage",
        storageBucket: "inecstorage.appspot.com",
        messagingSenderId: "1066584685164",
        appId: "1:1066584685164:web:9dd43b33341bdf81e57649"
      };
      firebase.initializeApp(firebaseConfig);
    })()

   /*  const db = firebase.firestore()
    const reference = firebase.storage()


function uploadImagem(){

    const imagem = document.getElementById('imagem').files[0]

    const nomeImagem = document.getElementById('nome').value
   

    reference.ref('imagens/').child(nomeImagem).getDownloadURL()
    .then(url => console.log(url))
    .catch(err => console.log(err))

}
function uploadAplicativo(){

    const arquivo = document.getElementById('arquivo').files[0]

    const nomeAplicativo = document.getElementById('app').value
   

     reference.ref('aplicativos/').child(nomeAplicativo).put(arquivo)
    .then(() => console.log("Uploado Realizado com sucesso"))
    .catch(err => console.log(err))

}


async function publicar(){
    uploadImagem()
    //uploadAplicativo()
} */