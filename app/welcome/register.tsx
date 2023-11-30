import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, IconButton, ProgressBar, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNum, setmobileNum] = useState("");
  const [counter, setCounter] = useState(0);
  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const items = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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
            Enter your details
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
          <View style={{ flex: 1, gap: 8 }}>
            <View style={{ padding: 8, marginTop: 8, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">First Name</Text>
                <TextInput
                  style={{ flex: 1, width: "95%" }}
                  mode="outlined"
                  label="First Name"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Last Name</Text>
                <TextInput
                  style={{ flex: 1, width: "95%" }}
                  mode="outlined"
                  label="Last Name"
                  value={lastName}
                  onChangeText={(text) => {
                    setlastName(text);
                  }}
                />
              </View>
            </View>
            <View style={{ padding: 8 }}>
              <Dropdown
                style={{
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  borderColor: isFocus ? "lightgreen" : "gray",
                }}
                maxHeight={250}
                data={items}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select your gender" : "..."}
                selectedTextStyle={{ fontSize: 14 }}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={{ padding: 8 }}>
              <Text variant="titleMedium">Enter your email</Text>

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
              <TextInput
                onChangeText={(num) => {
                  setmobileNum(num);
                }}
                value={mobileNum}
                style={{ flex: 1 }}
                mode="outlined"
                label="Mobile Number"
              />
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
                secureTextEntry
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
