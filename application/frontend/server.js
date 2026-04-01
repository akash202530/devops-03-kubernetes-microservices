const express = require('express');
const app = express();

app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html><body>
      <h1>Microservices Dashboard</h1>
      <div id="visits">Loading...</div>
      <script>
        fetch('/api/visits').then(r=>r.json()).then(d=>{
          document.getElementById('visits').innerText =
            'Visits: '+d.visits+' | Pod: '+d.hostname;
        });
      </script>
    </body></html>`);
});

app.listen(8080);