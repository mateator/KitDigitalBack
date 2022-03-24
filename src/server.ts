import 'dotenv/config';
import App from './app';
import AuthRoute from 'routes/auth.route';
import IndexRoute from 'routes/index.route';
import validateEnv from 'utils/validateEnv';
import SolicitudRoute from './routes/solicitud.route';
import SolicitudInteresRoute from './routes/solicitudInteres.route';
import InteresRoute from './routes/interes.route';
import DelegacionRoute from './routes/delegacion.route';
import ExcelRoute from './routes/excel.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new SolicitudRoute(),
  new SolicitudInteresRoute(),
  new InteresRoute(),
  new DelegacionRoute(),
  new ExcelRoute(),
]);

app.listen();
