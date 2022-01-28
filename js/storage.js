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
    const $nome = document.querySelector('.nome')
    const $app = document.querySelector('.app')
    const $descricao = document.querySelector('.descricao')


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

       await db.collection('aplicativos').doc($nome.value).set({
        nomeAluno: $nome.value,
        nomeAplicativo: $app.value,
        descricao: $descricao.value,
        urlImage: urlImagem,
        urlArquivoApp: urlArquivo
    })

    document.querySelector('.nome').value = ""
    document.querySelector('.app').value = ""
    document.querySelector('.descricao').value = ""

    renderizar()
}


async function renderizar(){
    let dados = await db.collection('aplicativos')
    let info = await dados.get()
    
   
    let html = ""    
    
    info.forEach((app) =>{{            
            html +=
            `            
            <div class="card text-white bg-primary mb-3" style="height: 10%; width: 100%;">
            <div class="card-header">Aluno(a): <strong>${app.data().nomeAluno}</strong></div>
            <div class="card-body">
            <img class="card-img-top mb-2"  src="${app.data().urlImage}" style="height: 20%; width: 20%; margin: 0 auto;" alt="Imagem de capa do card">
            <p class="card-title mt-3" > Nome do Aplicativo: <strong>${app.data().nomeAplicativo}</strong></p>
            <p class="card-text">Descrição: <strong>${app.data().descricao}</strong></p>
            <hr>
            <a href="${app.data().urlArquivoApp}" class="btn btn-success mt-3">Baixar app</a>
            </div>
            </div>
            
            `
            }             
    })


        document.querySelector(".apps").innerHTML = html

}
