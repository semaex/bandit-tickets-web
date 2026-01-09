import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'

export class CoreFile {
  constructor(
    public readonly id: Uuid,
    public readonly path: string,
    public readonly name: string,
    public readonly niceName: string,
    public readonly url: Url,
    public readonly providerUrl: Url | null,
    public readonly mimeType: string,
    public readonly size: number,
    public readonly isPublic: boolean,
    public readonly token: string,
    public readonly createdBy: Uuid | null,
    public readonly createdAt: Date
  ) {}
}

