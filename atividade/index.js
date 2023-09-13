const { request, response } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Livros = require('./models/livros')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Rota para mostrar o formulário
app.get('/users/create', (request, response) => {
    return response.render('useradd')

})

//Rota para cadastrar as informações do formulário
app.post('/users/create', async (request, response) => {
    const { name, email, password } = request.body
    let newsletter = request.body.newsletter
    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({ name, email, password, newsletter })
    return response.redirect('/users/shows')
})

app.get('/users/shows', async (request, response) => {
    const users = await User.findAll({ raw: true })
    return response.render('showuser', { users })

})

app.get('/users/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findOne({ raw: true, where: { id: id } })

    // console.log(user)

    return response.render('viewuser', { user })

})

app.post('/users/delete/:id', async (request, response) => {
    const id = request.params.id
    await User.destroy({ raw: true, where: { id: id } })
    return response.redirect('/users/shows')
})

app.get('/users/edit/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findOne({ raw: true, where: { id: id } })


    return response.render('edituser', { user })

})

app.post('/users/update', async (request, response) => {
    const { id, name, email, password } = request.body
    let newsletter = request.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const UserData = {
        id,
        name,
        email,
        password,
        newsletter
    }

    await User.update(UserData, { where: { id: id } })

    return response.redirect('/users/shows')

})

app.get('/livro/create', (request, response) => {
    return response.render('livrosadd')
})

app.post('/livro/create', async (request, response) => {
    const { autor, titulo, preco } = request.body
    let capaDura = request.body.capaDura
    if (capaDura === 'on') {
        capaDura = true
    } else {
        capaDura = false
    }

    await Livros.create({ autor, titulo, preco, capaDura })
    return response.redirect('/')

})

app.get('/livros/shows', async (request, response) => {
    const livros = await Livros.findAll({ raw: true })
    return response.render('showlivro', { livros })
})

app.get('/livros/:id', async (request, response) => {
    const id = request.params.id
    const livro = await Livros.findOne({ raw: true, where: { id: id } })
    return response.render('viewlivro', { livro })

})

app.get('/livros/edit/:id', async(request, response) =>{
    const id = request.params.id
    const livro = await Livros.findOne({ raw: true, where: { id: id } })


    return response.render('editlivro', { livro })
})

app.post('/livro/update/:id', async(request, response)=>{
    const { id, autor, titulo, preco } = request.body
    let capaDura = request.body.capaDura

    if (capaDura === 'on') {
        capaDura = true
    } else {
        capaDura = false
    }

    const LivroData = {
        id,
        autor,
        titulo,
        preco,
        capaDura
    }

    await Livros.update(LivroData, { where: { id: id } })

    return response.redirect('/livros/shows')
})

app.post('/livros/delete/:id', async (request, response) => {
    const id = request.params.id
    await Livros.destroy({ raw: true, where: { id: id } })
    return response.redirect('/livros/shows')
})

app.get('/', async (request, response) => {
    return response.render('home')
})


conn.sync().then(() => {
    app.listen(3333, () => {
        console.log(`Servidor on`)
    })
}).catch((err) => console.log(err))