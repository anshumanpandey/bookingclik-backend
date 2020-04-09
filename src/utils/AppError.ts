export class AppError extends Error {
    public response: { status?: number; message: string };
 
     constructor(error: { status?: number, message: string }, detail: string = undefined, ...args) {
        super(...args);
        this.response = {status: error.status || 400, message: error.message };
    }
 }