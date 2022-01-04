import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, SafeAreaView, AsyncStorageStatic, Image, KeyboardAvoidingView,ScrollView } from "react-native";
import Position from "react-native/Libraries/Components/Touchable/Position";
import { backgroundColor, shadowColor, shadowOffset, tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function App(){

        const [estado, setarEstado] = useState('leitura');
        const [anotacao,setarAnotacao] = useState('');
        


          useEffect(()=>{
            (async ()=> {
              try{
                const anotacaoLeitura = await AsyncStorageStatic.getItem('anotacao');
                setarAnotacao(anotacaoLeitura);
              }catch(error){}
            })();
            },[])
            




          setData = async() => {
            try{
              await AsyncStorageStatic.setItem('anotacao', anotacao);
            }catch(error){

            }
          alert('Sua anotação foi salva!')
          }
        


        function atualizarTexto(){
            setarEstado('leitura');
            setData();
        }
        
        if( estado == 'leitura'){
        return(
         
          
              <KeyboardAvoidingView keyboardVerticalOffset={80}>
                  <View style={styles.body}>
                    <View style={styles.nav}>
                    <Text style={styles.header}>Notas</Text>
                    
                      <TouchableOpacity style={styles.button1} title=''>
                      </TouchableOpacity >
                      <Image style={styles.icon1}source={require('./assets/search.png')}></Image>
                      
                    <TouchableOpacity title='' style={styles.button2}></TouchableOpacity>
                    </View>
                    <Image style={styles.icon2} source={require('./assets/mais.png')}></Image>
                    <ScrollView>
                    {
                      (anotacao != '')?
                    <ScrollView style={styles.postit}><Text style={styles.anotacao}>{anotacao}</Text></ScrollView>
                    :
                    <View>
                      <Image style={styles.image} source={require('./assets/image.png')}></Image>
                      <Text style={styles.nota}>Crie sua primeira nota!</Text>
                    </View>
                    

                  }
                  </ScrollView>
                    <TouchableOpacity onPress={()=> setarEstado('atualizando')}style={styles.btnAnotacao}><Text style={styles.btnTexto}>+</Text></TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>

                  
         
            
        )
      }else if(estado == 'atualizando'){
        return(
          
         
           
                <View style={styles.body}>
                  
                
                  <TextInput  autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={styles.anotacaoTextbox} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

                  <TouchableOpacity onPress={()=>atualizarTexto()}style={styles.btnSalvar}><Text style={styles.btnTexto}>  </Text></TouchableOpacity>
                  <Image style={styles.icon3} source={require('./assets/menor.png')}></Image>
           
                </View>
          

                
      
          
      )
      }

}

      const styles = StyleSheet.create({
        postit:{
          backgroundColor: "#ffd938",
          width:365,
          height: 200,
          borderRadius: 10,
          left:24,
          top: 30

        },
        button1:{
          position: "absolute",
          width:50,
          height:50,
          left: 268,
          top: 51,
          borderRadius:15,
          backgroundColor:'#3B3B3B',
    
        },
        button2:{
          position: "absolute",
          width:50,
          height:50,
          left: 339,
          top: 51,
          borderRadius:15,
          backgroundColor:'#3B3B3B',
      
        },
        icon1:{
          height: 24,
          width: 24,
          left: 281,
          top: 6,
          borderRadius: 0,
          tintColor:'white'

       
        },
        icon2:{
          height: 24,
          width: 24,
          left: 353,
          top: -17,
          borderRadius: 0,
          tintColor:'white'
      
        },
        icon3:{
          height: 24,
          width: 24,
          left: 34,
          top: 66,
          borderRadius: 0,
          tintColor:'white'
      
        },
        
        body:{
          backgroundColor:'#252525',
          width:450,
          height:900
        },
        nota:{
          color:"white",
          width:195,
          height:27,
          left:120,
          top:226,
          fontWeight:'300',
          fontSize: 20,
          lineHeight:27
        },
          header:{
            width: 115,
            height: 59,
            left: 24,
            fontWeight:'600',
            fontSize: 43,
            color: 'white',
            top: 47
          },
        anotacao:{
         
          color:"#000000",
          fontSize:25,
          lineHeight:34,
          padding:30
          
        },
        image:{
          width: 350,
          height: 286,
          left:32,
          top:230
        },
        btnAnotacao:{
          position: 'absolute',
          left:309,
          top:750,
          backgroundColor:"#252525",
          width:70,
          height:70,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:50,
          shadowRadius: 20,
          shadowOpacity: 100,
          shadowColor: "#000"
          
        },

        btnTexto:{
          color:'white',
          fontSize: 40
        },

        btnSalvar:{
          position: 'absolute',
          left:23,
          top:53,
          backgroundColor:"#3B3B3B",
          width:48,
          height:48,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:15,
        },
        anotacaoTextbox:{
          position: "absolute",
          width: 360,
          height: 347,
          left: 27,
          top: 154,
          fontSize: 23,
          lineHeight: 31,
          color:"#fff",
          
          borderRadius: 10,
          
          
        }
    
        }
      );