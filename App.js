import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

import { AppLoading } from 'expo';
import { AntDesign } from '@expo/vector-icons'; 

import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,TouchableHighlight ,Modal ,ScrollView, TextInput, Image } from 'react-native';

export default function App() {




  const [tarefas, setarTarefas] = useState([]);

  const [modal,setModal] = useState(false);

  const [tarefaAtual,setTarefaAtual] = useState('');


 

  useEffect(()=>{
    //alert('app carregado...');
    
    (async () => {
      try {
        let tarefasAtual = await AsyncStorageStatic.getItem('tarefas');
        if(tarefasAtual == null)
          setarTarefas([]);
        else
          setarTarefas(JSON.parse(tarefasAtual));
      } catch (error) {
        // Error saving data
      }
    })();
    
},[])



 

  function deletarTarefa(id){
      alert('A tarefa '+id+' foi deletada com sucesso!');
      //TODO: Deletar do array/estado a tarefa com id especificado!
      let newTarefas = tarefas.filter(function(val){
            return val.id != id;
      });

      setarTarefas(newTarefas);
     
      (async () => {
        try {
          await AsyncStorageStatic.setItem('tarefas', JSON.stringify(newTarefas));
          //console.log('chamado');
        } catch (error) {
          // Error saving data
        }
      })();
      
  }

  function addTarefa(){
    
    setModal(!modal);

    let id = 1;
    if(tarefas.length > 0){
        id = tarefas[tarefas.length-1].id + 1;
    }

    let tarefa = {id:id,tarefa:tarefaAtual};

    setarTarefas([...tarefas,tarefa]);

   

    (async () => {
      try {
        await AsyncStorageStatic.setItem('tarefas', JSON.stringify([...tarefas,tarefa]));
      } catch (error) {
        // Error saving data
      }
    })();
    
  }

 

  return (
  <View style={styles.body}>
        <View >
        <Text style={styles.textHeader}>Notas</Text>
        <View style={styles.nav}>
                    <Text style={styles.header}>Notas</Text>
                    
                      <TouchableOpacity style={styles.button1} title=''>
                      </TouchableOpacity >
                      <Image style={styles.icon1}source={require('./assets/search.png')}></Image>
                      
                    <TouchableOpacity title='' style={styles.button2}></TouchableOpacity>
                    </View>
                    <Image style={styles.icon2} source={require('./assets/mais.png')}></Image>
            </View>

            
    <ScrollView style={styles.scroll}>
      <StatusBar hidden />
   
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
            <TextInput multiline={true} onChangeText={text => setTarefaAtual(text)} autoFocus={true} style={styles.textbox}></TextInput>
            </ScrollView>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#3B3B3B" }}
              onPress={() => addTarefa()}
            >
               <Image style={styles.icon3} source={require('./assets/menor.png')}></Image>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

        {
        tarefas.map(function(val){
          return (
          <View style={styles.padding}>
          <View style={styles.tarefaSingle}>
            <View >
                <Text style={styles.text}>{val.tarefa}</Text>
            </View>
            
              <TouchableOpacity onPress={()=> deletarTarefa(val.id)}>
              <View style={styles.delete}>
                
                <AntDesign name="minuscircleo" size={20} color="white" />
                </View>
              </TouchableOpacity>
            
            </View>
            
            </View>);
        })
        

        }

{
                      (tarefas != '')?
                    <ScrollView style={styles.postit}><Text style={styles.anotacao}>oi</Text></ScrollView>
                    :
                    <View>
                      <Image style={styles.image} source={require('./assets/image.png')}></Image>
                      <Text style={styles.nota}>Crie sua primeira nota!</Text>
                    </View>
                    

                  }
        
        </ScrollView>
        <TouchableOpacity  style={styles.buttonAdicionar} onPress={()=>setModal(true)}><Text
         style={styles.buttonAdicionarTexto}>+
         </Text>
         </TouchableOpacity>
        </View>
       
  );
}

const styles = StyleSheet.create({
  nota:{
    color:"white",
    width:195,
    height:27,
    left:120,
    top:176,
    fontWeight:'300',
    fontSize: 20,
    lineHeight:27
  },
  image:{
    width: 350,
    height: 286,
    left:32,
    top:180
  },
  textbox:{
    color:"white",
    fontSize: 35,
    width: 300,
    height: 186,
    padding:0,
    left: 0,
    top: 90

  },
  icon3:{
    height: 24,
    width: 24,
    left: 10,
    top: 12,
    borderRadius: 0,
    tintColor:'white'

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
    top: 47,
    borderRadius: 0,
    tintColor:'white'

 
  },
  icon2:{
    height: 24,
    width: 24,
    left: 353,
    top: 25,
    borderRadius: 0,
    tintColor:'white'

  },
  delete:{
    alignItems:'center',
    height:30,
    width:50,
    justifyContent:'center',
  
    backgroundColor:"#ff4539",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  text:{
    width: 300,
    padding: 20,
    fontSize:25,
    lineHeight: 34

  },
  padding:{
    paddingBottom:25
  },
  buttonAdicionarTexto:{
    width: 48,
    height: 48,
    color:'white',
    fontSize:38,
    fontWeight:"300",
    alignContent:'center',
    textAlign:'center',

  },
  buttonAdicionar:{
    position: 'absolute',
    left:309,
    bottom:100,
    backgroundColor:"#252525",
    width:70,
    height:70,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    shadowRadius: 20,
    shadowOpacity: 100,
    shadowColor: "#000",
    alignContent:'center',
  },
  scroll:{
    
    top: 60,
  
  },
  body:{
    backgroundColor:"#252525",
    width:"100%",
    height:"100%"
  },
 
  coverView:{
    width:'100%',
    height:80,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  textHeader:{
    position: "absolute",
    width: 115,
    height: 59,
    left: 24,
    top: 47,
    fontWeight: "600",
    fontSize: 43,
    lineHeight: 59,
    color: "#FFFFFF",
    zIndex: 2

  },
  tarefaSingle:{
    flexDirection:"row",
    backgroundColor: "#ffd938",
    width:365,
    height: Text.height,
    borderRadius: 10,
    left:24,
    top: 30,
    
    
  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
    
  },
  modalView: {
    margin: 20,
    width:"90%",
    height:'80%',

    backgroundColor: "#252525",
    borderRadius: 20,
    
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    position:"absolute",
    backgroundColor: "#3B3B3B",
    borderRadius: 20,
    width:48,
    height: 48,
    left: 20,
    top:20,
   
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});
