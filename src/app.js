import express from 'express';
import productRouter from './router/productsRouter.js';
import cartRouter from './router/cartsRouter.js';

const PORT = 8080;
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(express.static('public'));


app.use('/api', productRouter);
app.use('/api', cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
