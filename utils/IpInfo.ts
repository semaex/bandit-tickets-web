export class IpInfo {
    constructor(
        public ip: string,
        public country: string,
        public countryCode: string,
        public currency: string,
        public timezone: string,
        public city: string,
        public region: string,
        public latitude: number | null,
        public longitude: number | null,
        public isp: string | null,
        public proxy: boolean
    ) {}
}
