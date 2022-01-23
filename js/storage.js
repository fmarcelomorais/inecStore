const reference = firebase.storage()
const db = firebase.firestore()

let imagem = "";
let nomeImagem = "";
let urlImagem = "";

function escolherImagem(e){

    imagem = e.target.files[0]
    nomeImagem = imagem.name   
    console.log(nomeImagem)
}

async function salvarImagem(nomeImagem, imagem){
    await reference.ref('imagens/').child(nomeImagem).put(imagem)
   .then(() => console.log(`${nomeImagem} Salva com sucesso`))
   .catch(erro => console.log(erro))

  await reference.ref('imagens/').child(nomeImagem).getDownloadURL()
    .then(url => {        
        console.log(url)
        urlImagem = url
        salvarUrl(nomeImagem)
       })

       //salvarImagem(nomeImagem, imagem)
   
}

async function salvarUrl(nomeImagem){
    //salvarImagem()
    
        await db.collection('imagensApp').doc(nomeImagem).set({
            nomeAluno: document.getElementById('nome').value,
            nomeAplicativo: document.getElementById('app').value,
            descricao: document.getElementById('descricao').value,
            urlImage: urlImagem
        })

}


async function testes(){
    
    let dados = await db.collection('imagensApp')
    let info = await dados.get()
    let html = ""
    
    info.forEach((x) =>{{
        console.log(x.data().urlImage)
        html +=
       ` <div class="card text-white bg-primary mb-3" style="height: 10%; width: 90%;">
                    <div class="card-header">${x.data().nomeAluno}</div>
                    <div class="card-body">
                        <img class="card-img-top" style="height: 30%; width: 30%; margin: 0 auto;" src="${x.data().urlImage}" alt="Imagem de capa do card">
                      <h5 class="card-title">${x.data().nomeAplicativo}</h5>
                      <p class="card-text">${x.data().descricao}</p>
                      <hr>
                      <a href="#" class="btn btn-success mt-3">Baixar app</a>
                    </div>
                  </div>`
                }})
                document.querySelector(".apps").innerHTML = html
}
