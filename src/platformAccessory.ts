import { PlatformAccessory } from 'homebridge';
import { Dht22HomebridgePlatform } from './platform';
import sensor from 'node-dht-sensor';

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
    const temperatureSendsor = this.accessory.getService('Temperature Sensor') || this.accessory.addService(this.platform.Service.TemperatureSensor, 'Temperature Sensor', 'TPRTS')

    setInterval(() => {
      sensor.read(22, 4, (err: NodeJS.ErrnoException | null, temperature: number, humidity: number) => {
        if (!err) {
          humiditySensor.setCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity, humidity)
          temperatureSendsor.setCharacteristic(this.platform.Characteristic.CurrentTemperature, temperature)
        }
      })
    }, 1000);
  }
}
