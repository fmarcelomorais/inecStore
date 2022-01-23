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

const firestore = firebase.firestore()

const storage = firebase.storage().ref()

const $nome = document.getElementById('nome')
const $app = document.getElementById('app')
const $descricao = document.getElementById('descricao')
const $arquivo = document.getElementById('arquivo')



let fileImage = {}
let nomeImagem = "";
let tipoImagem = "";

function escolherImagem(e){
    
    fileImage = e.target.files[0]
    const nomeImage = String(fileImage[0].name)
    const nomeSeparado = String(nomeImage).replace(' ','')
    const nomeSemPonto = nomeSeparado.split('.')

    nomeImagem = nomeSemPonto[0]
    tipoImagem = nomeSemPonto[1] 
    nomeImagem = fileImage.name
    
}

let file = {}
let nomeArquivo = "";
let tipoArquivo = "";

function escolherArquivo(e){
    
    file = e.target.files[0]
    const nomeImage = String(file.name)
    const nomeSeparado = String(nomeImage).replace(' ','')
    const nomeSemPonto = nomeSeparado.split('.')

    nomeImagem = nomeSemPonto[0]
    tipoArquivo = nomeSemPonto[1]
    //nomeArquivo = file.name
}

function salvarImagem(){
    storage.ref('imagens/'+nomeImagem).put(fileImage)
    .then(()=>{
        console.log('Salvo com sucesso')
    })
    .catch(erro => console.log(erro))
    console.log(nomeImagem)
}

function salvarAplicativo(){
    storage.ref('aplicativos/'+ file.name).put(file)
    .then(()=>{
        console.log('Salvo com sucesso')
    })
    .catch(erro => console.log(erro))
    console.log(file.name)

}

function mostraImagems(){
    storage.ref(`imagens/${nomeImagem}${tipoImagem}`).getDownloadURL()
    .then((url)=>{            
        const $img = document.getElementById('imagem')
        $img.setAttribute('src', url) //+= `<img src="${url}" style="height: 30%; width: 30%;" />`
    })
}

function mostraArquivos(){
    storage.ref(`aplicativos/${nomeArquivo}${tipoArquivo}`).getDownloadURL()   
    .then((snapshot) => {
        const $link = document.getElementById('link')            
        $link.innerHTML += `<a href="${snapshot}" >Baixar </a>`
    })
   
}

function salvarArquivos(){
    salvarImagem()
    salvarAplicativo()
}

function mostrarInformacoes(){
    mostraImagems()
    mostraArquivos()
}