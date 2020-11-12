# Command-CRUD
Um CRUD com nodejs usando linha de comando e um arquivo json.


## Techs

  - NodeJS
  - fs
  - commander

## Comandos

 - `--cadastrar` cadastra um heroi
 
 - `--listar` lista um ou todos os herois
 
 - `--remover` remove um ou todos os herois
 
 - `--atualizar ${id}` atualiza um heroi do id passado
 
 - `--name` especifica o nome do heroi
 
 - `--poder` especifica o poder do heroi
 
 - `--id` especifica o id do heroi
 
 
 ## Exemplo de comandos
 
 - `node index.js --cadastrar --nome "Super Homem" --poder Voar` Cria um heroi com o nome de "Super Homem" e o poder "Voar"
 - `node index.js --listar` Lista todos os herois
 - `node index.js --atualizar 1 --poder Raio` Atualiza o heroi de id 1 mudando o poder dele para raio
