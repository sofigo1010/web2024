import express from 'express'
import cors from 'cors'
import { captureAndLogRequests } from "./logs.js";
import { getAllVlogs, createVlog, deleteVlog, getVlogById, updateVlog } from './db.js'

const app = express()
const port = 3000
app.use(express.json())

app.use(captureAndLogRequests);
app.use(cors())

function validacionVlog(req, res, next) {
  const { title, content, picture } = req.body;
  if (!title || !content || (picture && Buffer.byteLength(picture, 'base64') > 1048576)) { 
      return res.status(400).json({ error: "Missing or invalid title, content, or picture. Picture size must be under 1MB." });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Vlog API')
})

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})

app.get('/posts', async (req, res) => {
  const posts = await getAllVlogs()
  res.status(200).json(posts)
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  const post = await getVlogById(id)
  res.status(200).json(post)
})

app.post('/posts', validacionVlog, async (req, res) => {
  const { title, content, picture } = req.body;
  
  try {
    const { success, result, error } = await createVlog(title, content, picture);
    if (success && result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({ success: true, message: "Post created successfully", postId: result.insertId });
    } else {
      console.error("Failed to create post", error);
      return res.status(500).json({ success: false, message: "Failed to create post", error: error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});


app.put('/posts/:id', validacionVlog, async (req, res) => {
  const { id } = req.params;
  const { title, content, picture } = req.body;
  
  try {
    const result = await updateVlog(id, title, content, picture);
    if (result.affectedRows && result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "Post updated successfully", postId: id });
    } else {
      throw new Error(`Failed to update post with ID: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  await deleteVlog(id)
  res.status(204).send()
})

app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method)) {
      return res.status(501).json({ message: "Not Implemented" });
    }
    next();
})
  
app.use((req, res) => {
    res.status(404).json({ message: "Not Found: Endpoint does not exist" });
})