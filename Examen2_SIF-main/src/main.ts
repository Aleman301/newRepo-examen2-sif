import App from './app'
import 'dotenv/config';

const port = process.env.PORT;
App.listen(Number(process.env.PORT) ?? 3001)