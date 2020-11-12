const { readFile, writeFile } = require("fs")
const { promisify } = require("util")


const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor(){
    this.NOME_ARQUIVO = "herois.json"
  }
  
  async obterDadosArquivo(){
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8")
    return JSON.parse(arquivo.toString())
  }

  async escreverArquivos(dados){
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo()
    const id = heroi.id <= 2 ? heroi.id : parseInt(Date.now())
    const heroiComId = {
      id,
      ...heroi
    }
    const dadosFinal = [
      ...dados,
      heroiComId
    ]

    const resultado = await this.escreverArquivos(dadosFinal)

    return resultado
  }
  
  async listar(id){
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
    return dadosFiltrados
  }

  async remover(id){
    if (!id) {
      return await this.escreverArquivos([]) 
    }

    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))
    
    if (indice == -1){
      throw Error("o usuario formado não existe")
    }

    dados.splice(indice, 1)

    return this.escreverArquivos(dados)
  }

  async atualizar(id, atualizaDados){
    if (!id){
      return false
    }

    const dados = await this.obterDadosArquivo()
    
    const indice = dados.findIndex(item => parseInt(item.id) === parseInt(id))

    if (indice === -1){
      throw Error("O heroi informado não existe")
    }

    const atual = dados[indice]
    const novoHeroi = {
      ...atual,
      ...atualizaDados
    }


    dados.splice(indice, 1, novoHeroi)

    return this.escreverArquivos(dados)
  }
}

module.exports = new Database()