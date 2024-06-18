// src/pusher/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      useTLS: true,
      appId: '1819840',
      key: 'fecb164e11761bd38ca1',
      secret: '8823a1df5bf75832bea0',
      cluster: 'ap2',
    });
  }

  trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}
