Learn with Jiji - Backend
This is the server-side implementation for the Learn with Jiji assignment. 
It provides a retrieval-augmented generation (RAG) style endpoint that searches for learning resources and logs user interactions using Node.js, Express, and Supabase.
Getting Started:
- Prerequisites
a- Node.js (v14 or higher)

b- A Supabase account and project.
Installation:
git clone https://github.com/sweven-007/jiji-backend.git
cd jiji-backend
npm install express @supabase/supabase-js dotenv cors
Environment Setup:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
Run the Server: node index.js
API Endpoints:
POST /ask-jiji
Retrieves resources related to a specific query and logs the interaction.

Request Body:

JSON
{
  "query": "Resume"
}
