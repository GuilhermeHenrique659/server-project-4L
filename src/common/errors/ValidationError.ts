export default class ValidationError {

    public messages: string[];

    public statusCode: number;
    
    constructor(messages: string[], statusCode = 400) {
        this.messages = messages;
        this.statusCode = statusCode
    }
}