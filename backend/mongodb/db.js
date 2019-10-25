// "mongodb+srv://dbprog:<password>@cluster0-yywck.mongodb.net/test?retryWrites=true&w=majority";
const password = process.env.DBUSER_PASS;

const uri = `mongodb+srv://dbprog:${password}@cluster0-yywck.mongodb.net/test?retryWrites=true&w=majority`;

export default uri;
