const express = require("express")
const app = express();
const PORT = 3000;
app.use(express.json());

let data = [];


//criar novos elementos
app.post('/cadastro', (req,res) => {
    const novoRegistro = req.body;
    data.push(novoRegistro);
    res.status(201).json({message: `Registro criado com sucesso!`})
})

//Listagem de elementos
app.get('/lista', (req,res) => {
    res.status(200).json({message: 'Lista de itens',data});
})


//Listagem usando ID
app.get('/lista/:id', (req,res) => {
    const {usuarioId} = req.params;
    const usuario = data.find(usuario => usuario.id === Number(usuarioId))

    if(usuario){
        return res.status(200).json({mensagem: `Usuario ${usuarioId} encontrado: `, usuario})
    }
    res.status(401).json({message: `O usuario ID ${id} não foi encontrado ou não existe!`})
})



//editar usuario por ID
app.put('/editar/:usuarioId', (req,res) => {
    const {usuarioId} = req.params;
    const {nome,telefone} = req.body;
    const usuario = data.find(usuario => usuario.id === Number(usuarioId))
   
    if(usuario){
        data = data.map(usuario => {
            if(usuario === Number(usuarioId)){
                return {...usuario,nome,telefone}
            }
            return usuario
        })
        res.status(200).json({mensagem: `Alterado com sucesso`,data})
    }
    res.status(401).json({message: `usuario não encontrado!`})
})

app.delete('/deletar/:id', (req,res) => {
    const usuarioId = Number(req.params.id) -1;
    console.log(usuarioId)
    if(!data[usuarioId]){
        res.status(404).json({mensagem: `Registro não encontrado`})
    }else{
        data.splice(usuarioId, 1)
        res.json({message: `Item de id ${usuarioId +1} deletado com sucesso!`})
    }
})


app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`);
})