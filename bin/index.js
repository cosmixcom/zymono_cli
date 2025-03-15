#! /usr/bin/env node
var shell = require("shelljs");

const fetch = require('cross-fetch');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function reportUser() {
  console.log('Zymono Report Tool');

  const apiKey = await askQuestion('Enter your API Key: ');
  const user = await askQuestion('Enter the user being reported: ');
  const imgURL = await askQuestion('Enter the image URL (or leave blank): ');
  const reason = await askQuestion('Enter the reason for the report: ');
  const device = await askQuestion('Enter the platform (e.g., Minecraft, Xbox, Discord): ');

  const body = JSON.stringify({ apiKey, user, imgURL, reason, device });

  try {
    const response = await fetch('https://zymono.com/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

reportUser();
