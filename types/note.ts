type TDate = Date | null;

export interface INote {
  title: string;
  text: string;
  created_at?: Date;
  updated_at?: TDate;
}
export class Note implements INote {
  title = "";
  text = "";
  created_at = new Date();
  updated_at = null as TDate;
  constructor(data: INote) {
    this.title = data.title;
    this.text = data.text;
    this.updated_at = data.updated_at || null;
  }
}