const Commander = require("commander") 
const Database = require("./database")
const Heroi = require("./heroi")

async function main(){
  Commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i --id [value]", "Id do Heroi")

    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar um heroi")
    .option("-r --remover [value]", "Remover um heroi pelo id")
    .option("-a --atualizar [value]", "Atualizar heroi pelo id")
    .parse(process.argv)

  const heroi = new Heroi(Commander)

  try{
    
    if (Commander.cadastrar){
      delete heroi.id
      
      const resultado = await Database.cadastrar(heroi)

      if(!resultado){
        console.error("Heroi não foi cadastrado")
        return
      }

      console.log("Heroi Cadastrado com sucesso!")
    }

    if (Commander.listar){
      const resultado = await Database.listar(heroi.id)
      console.log(resultado)
      return
    }

    if (Commander.remover){
      const resultado = await Database.remover(heroi.id)

      if(!resultado){
        console.error("Nao foi possivel remover o heroi")
        return
      }

      console.log("Heroi removido com sucesso")
    }

    if (Commander.atualizar){
      const idAtualizar = parseInt(Commander.atualizar)
      
      delete heroi.id

      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)

      const resultado = await Database.atualizar(idAtualizar, heroiAtualizar)

      if(!resultado){
        console.error("Nao foi possivel atualizar o heroi")
        return
      }

      console.log("Heroi atualizado com sucesso")
    }

  }
  catch(error){
   console.error("Deu ruim", error) 
  }
  
}

main()