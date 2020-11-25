const { deepEqual,  ok} = require("assert")

const database = require("./database")

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Lanterna Verde",
  poder: "anel",
  id: 2
}

describe("Suite de manipulação", () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
  })
  
  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await database.listar(expected.id)
    
    deepEqual(resultado, expected)
  })



  it("deve cadastrar um heroi, usando arquivos", async () => {
      const expected = DEFAULT_ITEM_CADASTRAR
      const resultado = await database.cadastrar(expected)
      const [actual] = await database.listar(expected.id)

      deepEqual(actual, expected)
  })

  it("deve remover um heroi por id", async() => {
    const expected = true
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(resultado, expected)
  })

  it("deve atualizar um heroi por id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "gabriel",
      poder: "voar"
    }

    const novoDado = {
      nome: "gabriel",
      poder: "voar"
    }
    it("teste", async() => {
      console.log("teste2131321")
    })

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)

    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

    deepEqual(resultado, expected)
  })
})