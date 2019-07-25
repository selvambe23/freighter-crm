
export interface Cargo {
  type: string;
  description: string;
  volume: string | number;
}

export interface Service {
  type: string;
  value?: string | number;
}

export interface Shipment {
  id: string;
  name: string;
  cargo: Array<Cargo>;
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: Array<Service>;
  total: string | number;
  status: string;
  userId: string;
}

export enum PostType {
  POST = 'POST',
  PUT = 'PUT'
}
