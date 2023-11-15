import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, IconButton, ProgressBar, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);

  const birthScreen = 0;
  const mobileNumScreen = 1;
  const locationScreen = 2;

  const continueScreen = () => {
    if (counter === locationScreen) {
      router.push("/welcome/login");
    } else {
      setCounter(counter + 1);
    }
    console.log(counter);
  };

  const backScreen = () => {
    if (counter === 0) {
      router.back();
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <View style={{ padding: 8, flex: 1, height: "100%" }}>
      <View>
        <IconButton onPress={backScreen} icon="arrow-left" />
        {counter === birthScreen && (
          <Text variant="titleLarge" style={{ padding: 12 }}>
            Select a Birthdate
          </Text>
        )}
        {counter === mobileNumScreen && (
          <Text variant="titleLarge" style={{ padding: 12 }}>
            Enter your mobile number
          </Text>
        )}
        {counter !== birthScreen && counter !== mobileNumScreen && (
          <Text variant="titleLarge" style={{ padding: 12 }}>
            Enter your location
          </Text>
        )}
        <ProgressBar
          progress={counter === birthScreen ? 0.25 : counter === mobileNumScreen ? 0.6 : 1}
        />
      </View>
      <View style={{ flex: 1 }}>
        {counter === birthScreen ? (
          <View style={{ flex: 1 }}>
            <SafeAreaProvider>
              <View style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
                <DatePickerInput
                  locale="en"
                  label="Birthdate"
                  value={inputDate}
                  onChange={(d) => setInputDate(d)}
                  inputMode="start"
                  presentationStyle="pageSheet"
                />
              </View>
            </SafeAreaProvider>{" "}
          </View>
        ) : counter === mobileNumScreen ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 8,
                alignItems: "center",
                gap: 8,
              }}
            >
              <TextInput mode="outlined" style={{ width: 56 }} disabled label="+63" />
              <TextInput style={{ flex: 1 }} mode="outlined" label="Mobile Number" />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              <TextInput style={{ flex: 1 }} mode="outlined" label="Location" />
            </View>
          </View>
        )}
        <Button onPress={continueScreen} mode="contained">
          Continue
        </Button>
      </View>
    </View>
  );
}
