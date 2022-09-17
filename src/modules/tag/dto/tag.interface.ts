export interface createTagI {
  id?: number;
  name: string;
  sortOrder: number;
  creator?: {
    uid?: string;
  };
}
