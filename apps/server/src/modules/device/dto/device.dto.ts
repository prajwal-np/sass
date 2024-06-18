import { CreateDevice } from './create.dto';

export class Device extends CreateDevice {
  id: number;
  user: any;
  code: string;
  status: string;
}
