export type ProductType = {
  name: string;
  number: string;
};

export type RobotStatusType = {
  position: {
    x: number;
    y: number;
  };
  product: ProductType;
};

export type StatusType = 'connecting'|'connected'|'disconnected';

