import express, { Express, Request, Response } from 'express';
import "dotenv/config";
import cors from 'cors';
import router from './routes/routes';
import http from "http";

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req:Request, res:Response, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req: Request, res: Response,) => {
    res.send({message:"hello world!"});
})

app.use('/api', router)

app.use((req: Request, res: Response) => {
    res.status(404).send({ message: "page not found" })

});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});