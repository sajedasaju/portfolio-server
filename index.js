const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()


//user: sajeda
//pass: CsR4c6cSKHe1T0ex

//middleware
app.use(cors());
app.use(express.json());









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6jq4n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {
    try {
        await client.connect();

        //ALL COLLECTION
        //1 )project collection
        const projectCollection = client.db("allProjects").collection('projects');



        //http://localhost:5000/projects
        app.get('/projects', async (req, res) => {
            const projects = await projectCollection.find().toArray()
            res.send(projects)
        })




        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query);

            res.send(project)
        })




    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From portfolio')
})

app.listen(port, () => {
    console.log(`The portfolio listening on port ${port}`)
})