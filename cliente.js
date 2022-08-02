const mqtt = require('mqtt')

const host = 'broker.emqx.io'   //Direccion del Broker
const port = '1883'             //Puerto del mqtt (no cambiar)

const clientId = `mqtt_${Math.random().toString(16).slice(3)}` //opcional

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',           //usuario mqtt
  password: 'public',         //contrasena mqtt
  reconnectPeriod: 1000,
})

const topic = '/rfid/value';    //TOPIC

//Funcion para manejar conexion exitosa 
client.on('connect', () => {
  console.log('Connected')

  //Al conectarse se suscribe al TOPIC
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  });
  
})

//Funcion para manejar el arrivo de un mensaje segun el TOPIC
client.on('message', (topic, payload) => {
  //payload es el valor recibido a traves del TOPIC
  console.log('Received Message:');
  console.log('topic: ', topic)
  console.log('payload: ',payload.toString());
})

//Funcion para manejar una reconexion
client.on('reconnect', function () {
  console.log('Reconnecting...')
})


//Funcion para manejar una desconexion del broker
client.on('close', function () {
  console.log('Disconnected')
})

//Funcion para manejar en caso de estar offline
client.on('offline', function () {
  console.log('offline')
})

//Funcion para manejar un error en la conexion del broker
client.on('error', function (error) {
  console.log(error)
})