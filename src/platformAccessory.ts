import { Service, PlatformAccessory } from 'homebridge';
import { Dht22HomebridgePlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class Dht22PlatformAccessory {
  constructor(
    private readonly platform: Dht22HomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    const humiditySensor = this.accessory.getService('Humidity Sensor') || this.accessory.addService(this.platform.Service.HumiditySensor, 'Humidity Sensor', 'HMDTS');
    
    humiditySensor.setCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity, 50)
  }
}
