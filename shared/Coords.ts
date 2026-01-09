export class Coords {
  private readonly _latitude: number
  private readonly _longitude: number

  constructor(latitude: number, longitude: number) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90')
    }

    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180')
    }

    this._latitude = latitude
    this._longitude = longitude
  }

  static fromArray(data: { latitude: number; longitude: number }): Coords {
    return new Coords(data.latitude, data.longitude)
  }

  latitude(): number {
    return this._latitude
  }

  longitude(): number {
    return this._longitude
  }

  equals(other: Coords): boolean {
    return this._latitude === other.latitude() && this._longitude === other.longitude()
  }

  isValid(): boolean {
    return (
      this._latitude >= -90 &&
      this._latitude <= 90 &&
      this._longitude >= -180 &&
      this._longitude <= 180
    )
  }

  toArray(): { latitude: number; longitude: number } {
    return {
      latitude: this._latitude,
      longitude: this._longitude
    }
  }
}

