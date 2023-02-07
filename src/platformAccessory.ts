import { PlatformAccessory } from 'homebridge';
import { DhtHomebridgePlatform } from './platform';
import sensor from 'node-dht-sensor';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class DhtPlatformAccessory {
  constructor(
    private readonly platform: DhtHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
    private readonly sensorType: sensor.SensorType,
    private readonly pin: number
  ) {
    const humiditySensor = this.accessory.getService('Humidity Sensor') || this.accessory.addService(this.platform.Service.HumiditySensor, 'Humidity Sensor', 'HMDTS');
    const temperatureSensor = this.accessory.getService('Temperature Sensor') || this.accessory.addService(this.platform.Service.TemperatureSensor, 'Temperature Sensor', 'TPRTS')

    setInterval(() => {
      sensor.read(this.sensorType, this.pin, (err: NodeJS.ErrnoException | null, temperature: number, humidity: number) => {
        if (!err) {
          humiditySensor.setCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity, humidity)
          temperatureSensor.setCharacteristic(this.platform.Characteristic.CurrentTemperature, temperature)
        }
      })
    }, 1000);
  }
}
