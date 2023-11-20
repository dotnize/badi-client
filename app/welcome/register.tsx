import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, IconButton, ProgressBar, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);

  const emailScreen = 0;
  const birthScreen = 1;
  const mobileNumScreen = 2;
  const locationScreen = 3;
  const passwordScreen = 4;

  const continueScreen = () => {
    if (counter === passwordScreen) {
      router.push("/");
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
        {counter === emailScreen && (
          <Text variant="titleLarge" style={{ padding: 12 }}>
            Enter your email
          </Text>
        )}
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
        {counter === locationScreen && (
          <Text variant="titleLarge" style={{ padding: 12 }}>
            Enter your location
          </Text>
        )}
        {counter !== birthScreen &&
          counter !== mobileNumScreen &&
          counter !== emailScreen &&
          counter !== locationScreen && (
            <Text variant="titleLarge" style={{ padding: 12 }}>
              Create your password
            </Text>
          )}
        <ProgressBar
          progress={
            counter === emailScreen
              ? 0.2
              : counter === birthScreen
                ? 0.4
                : counter === mobileNumScreen
                  ? 0.6
                  : counter === locationScreen
                    ? 0.8
                    : 1
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        {counter === emailScreen ? (
          <View style={{ flex: 1 }}>
            <View>
              <TextInput
                style={{ flex: 1 }}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
          </View>
        ) : counter === birthScreen ? (
          <View style={{ flex: 1 }}>
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
        ) : counter === locationScreen ? (
          <View style={{ flex: 1 }}>
            <View>
              <TextInput style={{ flex: 1 }} mode="outlined" label="Location" />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View>
              <TextInput
                style={{ flex: 1 }}
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={(password) => {
                  setPassword(password);
                }}
              />
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
