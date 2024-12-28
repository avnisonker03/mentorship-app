import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './models/User.js';
import { errorHandler } from './middleware/error.js';
import cloudinary from './config/cloudinary.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

app.use(errorHandler);

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Auth routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash, role });
        
        const token = jwt.sign(
            { id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
        
        const token = jwt.sign(
            { id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/profile', auth, async (req, res) => {
    try {
        const { skills, bio, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { skills, bio, role },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search/Discovery Routes
app.get('/api/mentors', auth, async (req, res) => {
    try {
        const { skills } = req.query;
        const query = { role: 'mentor' };
        if (skills) {
            query.skills = { $in: skills.split(',') };
        }
        const mentors = await User.find(query).select('-password');
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Connection Routes
app.post('/api/connections/request', auth, async (req, res) => {
    try {
        const { mentorId } = req.body;
        const connection = await Connection.create({
            mentor: mentorId,
            mentee: req.userId
        });
        res.json(connection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/connections/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const connection = await Connection.findOne({
            _id: req.params.id,
            mentor: req.userId
        });
        if (!connection) {
            return res.status(404).json({ error: 'Connection not found' });
        }
        connection.status = status;
        await connection.save();
        res.json(connection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/connections', auth, async (req, res) => {
    try {
        const connections = await Connection.find({
            $or: [{ mentor: req.userId }, { mentee: req.userId }]
        }).populate('mentor mentee', '-password');
        res.json(connections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Skills Routes
app.get('/api/skills', auth, async (req, res) => {
    try {
        const skills = await User.distinct('skills');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// File upload endpoint
app.post('/api/upload', auth, upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
            folder: 'mentorship'
        });
        res.json({ url: result.secure_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Refresh token endpoint
app.post('/api/auth/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
        res.json({ accessToken });
    } catch (err) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));