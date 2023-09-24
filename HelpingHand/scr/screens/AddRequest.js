import { View, TextInput, Text} from "react-native"


export default function AddRequest(){
  return (
      <View style={{flex:1}}>
       <Text style={{
             textAlign: "center",
             fontStyle: "italic",
             fontWeight: "800",
             fontSize: 25,
             padding:10
        }}>
            Add Request
        </Text>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>Title</Text>
         <TextInput
        placeholder={'title'}
        style={{ height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        width:200}}
      />
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>Descriptions</Text>
         <TextInput
        placeholder={'title'}
        style={{ height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        width:200}}
      />
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>From</Text>
         <TextInput
        placeholder={'title'}
        style={{ height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        width:200}}
      />
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>Title</Text>
         <TextInput
        placeholder={'title'}
        style={{ height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        width:200}}
      />
        </View>

      </View>
  )

}