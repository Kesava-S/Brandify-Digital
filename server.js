const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Google Drive Configuration
const KEY_FILE_PATH = path.join(__dirname, 'service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const DRIVE_FOLDER_ID = '1YbIXDblvUzV1iZ8IZCN-2X1ScH6zEbpE';

// Authenticate with Google
const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

// Upload Endpoint
app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        console.log(`Uploading file: ${req.file.originalname}`);

        // Create a readable stream from the buffer
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        const fileMetadata = {
            name: `${Date.now()}_${req.file.originalname}`,
            parents: [DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType: req.file.mimetype,
            body: bufferStream,
        };

        // Upload to Drive
        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink',
        });

        console.log('File uploaded, ID:', file.data.id);

        // Make the file publicly readable (Reader role)
        await drive.permissions.create({
            fileId: file.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Return the link
        res.status(200).json({
            message: 'Upload successful',
            fileUrl: file.data.webViewLink,
            fileId: file.data.id
        });

    } catch (error) {
        console.error('Error uploading to Drive:', error);
        res.status(500).json({ error: 'Failed to upload file to Google Drive.', details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
