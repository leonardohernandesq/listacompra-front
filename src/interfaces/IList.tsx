export interface IList{
    _id: string,
    name: string,
    items: Array<string>
}

export interface ListLineProps {
    data: IList;
  }