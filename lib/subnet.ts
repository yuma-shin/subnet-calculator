import type { SubnetInput, SubnetResult } from "./types";

function ipToInt(ip: string): number {
  return ip
    .split(".")
    .map(Number)
    .reduce((acc, octet) => acc * 256 + octet, 0);
}

function intToIp(value: number): string {
  return [24, 16, 8, 0]
    .map((shift) => (value >>> shift) & 0xff)
    .join(".");
}

function classifyIp(firstOctet: number): SubnetResult["ipClass"] {
  if (firstOctet < 128) return "A";
  if (firstOctet < 192) return "B";
  if (firstOctet < 224) return "C";
  if (firstOctet < 240) return "D";
  return "E";
}

function cidrToMaskInt(cidr: number): number {
  return cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
}

export function cidrToSubnetMask(cidr: number): string {
  return intToIp(cidrToMaskInt(cidr));
}

export function calculateSubnet(input: SubnetInput): SubnetResult {
  const { ipAddress, cidr } = input;
  const ipInt = ipToInt(ipAddress);
  const firstOctet = Math.floor(ipInt / 256 ** 3) & 0xff;
  const ipClass = classifyIp(firstOctet);

  const maskInt = cidrToMaskInt(cidr);
  const subnetMask = intToIp(maskInt);
  const totalAddressCount = 2 ** (32 - cidr);

  if (cidr === 32) {
    return {
      networkAddress: ipAddress,
      broadcastAddress: ipAddress,
      firstHostAddress: ipAddress,
      lastHostAddress: ipAddress,
      totalAddressCount: 1,
      usableHostCount: 1,
      ipClass,
      subnetMask,
    };
  }

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

  if (cidr === 31) {
    return {
      networkAddress: intToIp(networkInt),
      broadcastAddress: intToIp(broadcastInt),
      firstHostAddress: intToIp(networkInt),
      lastHostAddress: intToIp(broadcastInt),
      totalAddressCount: 2,
      usableHostCount: 2,
      ipClass,
      subnetMask,
    };
  }

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHostAddress: intToIp(networkInt + 1),
    lastHostAddress: intToIp(broadcastInt - 1),
    totalAddressCount,
    usableHostCount: totalAddressCount - 2,
    ipClass,
    subnetMask,
  };
}
