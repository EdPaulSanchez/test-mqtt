const mqtt = require('mqtt')

const host = 'broker.emqx.io'                   //Direccion del Broker
const port = '1883'                             //Puerto del mqtt (no cambiar)
const clientId = `mqtt_${Math.random().toString(16).slice(3)}` //opcional

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',                 //usuario mqtt
  password: 'public',               //contrasena mqtt
  reconnectPeriod: 1000,
})

const topic = '/rfid/value';         //TOPIC


//Funcion para manejar conexion exitosa 
client.on('connect', () => {
  console.log('Connected');
})

//Funcion que hace un envio de una lectura RFID hacia el broker
function send_to_broker(){
client.publish(topic, 'E3565221223', { qos: 0, retain: false }, (error) => {
    if (error) {
        console.error(error)
    }
    })
}

//Ejecutar la funcion de envio cada 5 segundos
setInterval(send_to_broker,5000);