import conn from './connection.js'
import bcrypt from 'bcrypt';


export async function getAllVlogs() {
    try {
        const [rows] = await conn.query('SELECT * FROM vlog_posts')
        return rows
    } catch (e) {
        console.log(e)
        return e
    }
}

export async function getVlogById(id) {
    try {
        const [rows] = await conn.query('SELECT * FROM vlog_posts WHERE id = ?', [id])
        return rows[0] || null
    } catch (e) {
        console.log(e)
        return e
    }
}

export async function createVlog(title, content, picture) {
    try {
        const [result] = await conn.query('INSERT INTO vlog_posts (title, content, picture) VALUES (?, ?, ?)', [title, content, picture]);
        return { success: true, result };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
    }
}

export async function updateVlog(id, title, content, picture) {
    try {
        const [result] = await conn.query('UPDATE vlog_posts SET title = ?, content = ?, picture = ? WHERE id = ?', [title, content, picture, id]);
        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
}


export async function createUser(username, password_hash, isAdmin = 1) {
    try {
        const [result] = await conn.query('INSERT INTO users (username, password_hash, isAdmin) VALUES (?, ?, ?)', [username, password_hash, isAdmin]);
        return { success: true, id: result.insertId };
    } catch (e) {
        console.log(e);
        return { success: false, error: e };
    }
}

export async function findUserByUsername(username) {
  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function findUserById(id) {
  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteVlog(id) {
    try {
        await conn.query('DELETE FROM vlog_posts WHERE id = ?', [id])
    } catch (e) {
        console.log(e)
        return e
    }
}
