import { ipcMain } from "electron";
import  { createServer, IncomingMessage, Server, ServerResponse } from "http"



export class HttpListener {

    private server: Server = createServer();

    constructor(private port: number=3000){}

    public listen(): void {
        this.server.listen(this.port);
        this.server.once("listening", ()=> {
            this.server.on("request", this.requestListener.bind(this))
        })
    }

    private async requestListener(req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
        try {
            const body = await this.getRequestBodyMiddleware(req);
            ipcMain.emit('message', body);
            res.statusCode = 200;
            return res.end();
        } catch (error: any) {
            console.log(error.message);
            throw error
        }
    }

    private async getRequestBodyMiddleware(request: IncomingMessage): Promise<string> {
        return new Promise((next, reject)=> {
            let body = "";
            request.on('data', (chunk: string)=> {
                try { body += chunk }
                catch(error) { reject(error) };
            })
            request.on('end', ()=> next(body))
        })
    }
}

export const httpListener = new HttpListener();
