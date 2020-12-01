This mannual is from: https://ant.apache.org/manual/tutorial-HelloWorldWithAnt.html

javac -sourcepath src -d build\classes src\oata\HelloWorld.java
java -cp build\classes oata.HelloWorld

echo Main-Class: oata.HelloWorld>myManifest
Once done, a file is generated with content: Main-Class: oata.HelloWorld

jar cfm build\jar\HelloWorld.jar myManifest -C build\classes . 
- hello world.jar is generated. 

java -jar build\jar\HelloWorld.jar - see hello world in console.

setant.bat

ant compile jar run

ant -f build1.xml