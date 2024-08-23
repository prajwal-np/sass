import { CreateDevice } from './create.dto';

export class Device extends CreateDevice {
  id: string;
  user: any;
  code: string;
  status: string;
}
