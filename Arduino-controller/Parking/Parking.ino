#include <WiFi.h>
#include <ESP32Servo.h>
#include <PubSubClient.h>
#include <WiFiClient.h>



const char* ssid = "";
const char* password = "";
const char* mqtt_server = "";


WiFiClient espClient;
PubSubClient client(espClient);


//Servo
Servo servoLeft;
Servo servoRight;
int posLeft = 90;
int posRight = 90;


//primary Sensor
int sensorIF = 34;
int sensorVal = 0;




//millis time interval
unsigned int sensorTime = 0;
#define INTERVAL_SENSOR 500
int counter = 0;


void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

//======================================== ** MQTT  ** ============================================

void callback(String topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived ==>");
  Serial.print(topic);
  String payloadTemp;

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    payloadTemp += (char)payload[i];
  }

  if (topic == "parking/active/94:b9:7e:f8:7b:6c") {
    active();
  }

  Serial.println();
}


void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect("SmartParkingProject")) {
      Serial.println("connected");

      client.subscribe("parking/active/94:b9:7e:f8:7b:6c");

    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}


//================================================================================================




//======================================== ** Servo control  ** ==================================

void active() {
  if (sensorVal == 1) {
    
    digitalWrite(2, HIGH);
    delay(1000);
    digitalWrite(2, LOW);

    for (int i = 1; i <= 80; i += 1) {
      servoLeft.write(posLeft -= 1);
      servoRight.write(posRight += 1);
      delay(15);
    }
  }
}

void inActive() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);

  for (int v = 1; v <= 80; v += 1) {
    servoLeft.write(posLeft += 1);
    servoRight.write(posRight -= 1);
    delay(15);
  }
  counter = 0;
  client.publish("parking/inActive" , "94:b9:7e:f8:7b:6c");
}

//================================================================================================



void setup() {
  Serial.begin(115200);

  servoLeft.attach(12);
  servoRight.attach(13);

  servoRight.write(90);
  servoLeft.write(90);

  pinMode(2, OUTPUT);
  pinMode(sensorIF, INPUT);

  setup_wifi();

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  
}




//1 ไม่จอ 0 เจอ
// counter  = 120  = 1นาท

// 0 ไม่จอ 4059  เจอ

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();



  if (millis() - sensorTime > INTERVAL_SENSOR) {
    sensorTime = millis();

    sensorVal = digitalRead(sensorIF);
    Serial.print("val = ");
    Serial.println(sensorVal);

    //สุดที่ 10
    Serial.print("servoLeft ==>");
    Serial.println(servoLeft.read());

    //สุดที่ 170
    Serial.print("servoRight ==>");
    Serial.println(servoRight.read());

    Serial.print("counter ==>" );
    Serial.println(counter);


    if (sensorVal == 1 && servoLeft.read() == 10 && servoRight.read() == 170) {
      counter++;
      if (counter == 30) {
        inActive();
      }
    }


    if (sensorVal == 0  && servoLeft.read() == 10 && servoRight.read() == 170) {
      Serial.println("จอด..");
      if (counter > 0) {
        counter = 0;
      }
    }


    if (sensorVal == 1  && servoLeft.read() == 90 && servoRight.read() == 90) {
      Serial.println("ว่าง");
    }

  }

}
