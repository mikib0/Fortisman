import { Button } from "react-native";
import { useNavigation } from '@react-navigation/core';

function NavButton({ screenName }){
  const navigation = useNavigation()
  return (
    <Button title={screenName} onPress={()=>{
      navigation.navigate(screenName);
    }} />
  )
}

export default NavButton