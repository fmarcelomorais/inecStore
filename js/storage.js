const reference = firebase.storage()
const db = firebase.firestore()

let imagem = "";
let nomeImagem = "";
let urlImagem = "";

function carregarImagem(e){

    imagem = e.target.files[0]
    nomeImagem = imagem.name   
    console.log(nomeImagem)
}

let arquivo = "";
let nomeArquivo= "";
let urlArquivo= "";

function carregarArquivo(e){

    arquivo = e.target.files[0]
    nomeArquivo = arquivo.name   
    console.log(nomeArquivo)
}

// Salva a imagem e o arquivo no storage e pega a URL   

async function salvarNoStorage(nomeImagem, imagem, nomeArquivo, arquivo){
    await reference.ref('imagens/').child(nomeImagem).put(imagem)
    .then(() => swal("Salvo com Sucesso!", nomeImagem, "success"))
    .catch(erro => console.log(erro))
 
    await reference.ref('imagens/').child(nomeImagem).getDownloadURL()
     .then(url => {        
         console.log(url)
         urlImagem = url
         //salvarUrlImagem(nomeImagem)
        })

    await reference.ref('aplicativos/').child(nomeArquivo).put(arquivo)
     .then(() => swal("Salvo com Sucesso!", nomeArquivo, "success"))
     .catch(erro => console.log(erro))

    await reference.ref('aplicativos/').child(nomeArquivo).getDownloadURL()
    .then(url => {        
        console.log(url)
        urlArquivo = url
        //salvarUrlArquivo(nomeArquivo)
       })

       await db.collection('aplicativos').doc(document.getElementById('app').value).set({
        nomeAluno: document.getElementById('nome').value,
        nomeAplicativo: document.getElementById('app').value,
        descricao: document.getElementById('descricao').value,
        urlImage: urlImagem,
        urlArquivoApp: urlArquivo
    })


}


async function renderizar(){
    let dados = await db.collection('aplicativos')
    let info = await dados.get()
    
   
    let html = ""    
    
    info.forEach((app) =>{{            
            html +=
            `
            
            <div class="card text-white bg-primary mb-3" style="height: 10%; width: 100%;">
            <div class="card-header">${app.data().nomeAluno}</div>
            <div class="card-body">
            <img class="card-img-top mb-2" style="height: 25%; width: 25%; margin: 0 auto;" src="${app.data().urlImage}" alt="Imagem de capa do card">
            <h5 class="card-title mt-3" >${app.data().nomeAplicativo}</h5>
            <p class="card-text">${app.data().descricao}</p>
            <hr>
            <a href="${app.data().urlArquivoApp}" class="btn btn-success mt-3">Baixar app</a>
            </div>
            </div>
            
            `
            }             
    })


        document.querySelector(".apps").innerHTML = html

}
