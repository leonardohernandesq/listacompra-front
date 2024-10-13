export interface IItem{
    _id: string;
    name: string;
    quantity: number;
    bought: boolean;
    listId: string;
    categoryId: string;
}

export interface ItemLineProps {
    data: IItem;
    isModalView?: boolean
  }