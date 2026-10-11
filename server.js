const express = require('express');
const app = express();
app.use(express.json());

const DB = {
  jadwal: "JADWAL S1 Bisnis Digital: Senin Kewirausahaan, Selasa Digital Marketing, Rabu Keuangan, Kamis E-Commerce, Jumat Metodologi. Lokasi Jl Imam Bonjol 75 Pekanbaru",
  biaya: "BIAYA: Daftar 500rb, SPP 800rb per bulan",
  alamat: "STIE DHARMA PUTRA Jl Imam Bonjol No 75 Pekanbaru",
  ryan: "RYAN HIDAYAT NIM 23.10.103.550.005"
};

function jawab(t){
  t = (t||"").toLowerCase();
  for(let k in DB){
    if(t.includes(k)) return DB[k];
  }
  return "Halo STIE DP! Ketik: JADWAL, BIAYA, ALAMAT, RYAN";
}

app.get('/', (req,res)=> res.send('STIE DP BOT ONLINE'));

app.get('/webhook', (req,res)=>{
  if(req.query['hub.verify_token'] === 'stie_dp_ryan_550005'){
    res.send(req.query['hub.challenge']);
  } else res.sendStatus(403);
});

app.post('/webhook', async (req,res)=>{
    const m = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if(m){
    const balasan = jawab(m.text?.body);
    console.log("Balas: " + balasan);
  }
  res.sendStatus(200);
});

app.listen(3000, ()=> console.log("BOT JALAN"));