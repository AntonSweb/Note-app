type TDate = Date | null;

export interface INote {
  title: string;
  text: string;
  is_active: Boolean;
  created_at?: Date;
  updated_at?: TDate;
}
export class Note implements INote {
  title = "";
  text = "";
  is_active = true;
  created_at = new Date();
  updated_at = null as TDate;
  constructor(data: INote) {
    this.title = data.title;
    this.text = data.text;
    this.updated_at = data.updated_at || null;
  }
}