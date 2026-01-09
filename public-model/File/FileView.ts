import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'

export class FileView {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly niceName: string,
    public readonly url: Url
  ) {}
}

