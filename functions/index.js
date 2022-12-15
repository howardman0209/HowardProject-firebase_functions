const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express()

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original

app.get('/',async (req, res) => {
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've successfully written the message
    let result = {
        code: 0,
        message : `Message with ID: ${writeResult.id} added.`,
        data: `${writeResult.id}`
    }

    res.write(`${JSON.stringify(result)}`)
    res.end()
    // res.status(200).json({ message: `Message with ID: ${writeResult.id} added.` });
})

exports.addMessage = functions.https.onRequest(app)