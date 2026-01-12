import { IpInfo } from './IpInfo';

export async function getIpInfo(): Promise<IpInfo> {
    const url = "http://ip-api.com/json/?fields=status,message,country,countryCode,currency,timezone,city,regionName,lat,lon,isp,proxy";
    
    return fetch(url).then(res => res.json()).then((data: any) => {
        if (data.status !== 'success') {
            throw new Error(data.message || 'Error getting IP info');
        }

        return new IpInfo(
            data.query, // ip
            data.country || 'Unknown',
            data.countryCode || 'UN',
            data.currency || 'EUR',
            data.timezone || 'UTC',
            data.city || 'Unknown',
            data.regionName || 'Unknown', // mapped to region
            data.lat || null,
            data.lon || null,
            data.isp || null,
            data.proxy || false
        );
    });
};
